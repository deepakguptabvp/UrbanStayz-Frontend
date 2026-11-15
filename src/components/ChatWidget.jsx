import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Building,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage, getChatbotSuggestions } from "../services/propertyApi";
import pgData from "../data/pgData";

const DEFAULT_SUGGESTIONS = [
  "Find PG under ₹10,000",
  "How to schedule a free visit?",
  "What amenities are included?",
  "Is there any brokerage or deposit?",
  "Accommodations in Delhi & Noida",
];

const INITIAL_MESSAGE = {
  id: "welcome-1",
  role: "model",
  text: "Hello! 👋 I am Riya, your dedicated Assistant.\n\nFeel free to inquire about verified PGs & hostels, schedule a complimentary property visit, or explore pricing, amenities, and policies. How may I assist you today?",
  time: "Just now",
  suggestedProperties: [],
};

/**
 * Intelligent Client-Side Assistant Engine
 * Automatically steps in if the backend server is offline or unreachable
 */
const getClientAssistantResponse = (userText) => {
  const lower = (userText || "").toLowerCase();

  // Normalize text: handle "15k" -> "15000", "30k" -> "30000"
  const normalized = lower.replace(/(\d+)\s*k\b/gi, (match, p1) => `${p1}000`);

  // Detect Price Ranges and Budgets
  let minBudget = null;
  let maxBudget = null;

  // 1. Explicit range like "between 15000 - 30000", "15000 to 30000", "15000 and 30000", "15000-30000"
  const rangeMatch = normalized.match(/(\d{4,6})\s*(?:-|to|and)\s*(\d{4,6})/i);
  if (rangeMatch) {
    const val1 = parseInt(rangeMatch[1], 10);
    const val2 = parseInt(rangeMatch[2], 10);
    minBudget = Math.min(val1, val2);
    maxBudget = Math.max(val1, val2);
  } else {
    // 2. Minimum budget keywords: "above 15000", "more than 15000", "min 15000", "from 15000"
    const aboveMatch = normalized.match(/(?:above|more than|greater than|min|minimum|over|from)\s*(\d{4,6})/i);
    if (aboveMatch) {
      minBudget = parseInt(aboveMatch[1], 10);
    }

    // 3. Maximum budget keywords: "under 10000", "below 10000", "upto 10000", "max 10000", "less than 10000"
    const underMatch = normalized.match(/(?:under|below|less than|max|maximum|within|upto|up to)\s*(\d{4,6})/i);
    if (underMatch) {
      maxBudget = parseInt(underMatch[1], 10);
    }

    // 4. Standalone number without keywords: default to maxBudget
    if (minBudget === null && maxBudget === null) {
      const singleNum = normalized.match(/\b(\d{4,6})\b/);
      if (singleNum) {
        maxBudget = parseInt(singleNum[1], 10);
      }
    }
  }

  // Filter properties based on budget
  let matchedProps = [];
  const hasBudgetQuery = minBudget !== null || maxBudget !== null;

  if (minBudget !== null && maxBudget !== null) {
    matchedProps = pgData.filter((p) => p.price >= minBudget && p.price <= maxBudget);
  } else if (minBudget !== null) {
    matchedProps = pgData.filter((p) => p.price >= minBudget);
  } else if (maxBudget !== null) {
    matchedProps = pgData.filter((p) => p.price <= maxBudget);
  } else if (
    lower.includes("pg") ||
    lower.includes("hostel") ||
    lower.includes("room") ||
    lower.includes("stay") ||
    lower.includes("delhi") ||
    lower.includes("noida") ||
    lower.includes("bangalore") ||
    lower.includes("recommend") ||
    lower.includes("suggest")
  ) {
    matchedProps = [...pgData];
  }

  // Check city filter if user mentioned a specific city
  const cityNames = ["bangalore", "delhi", "noida", "pune", "mumbai", "hyderabad"];
  const mentionedCity = cityNames.find((c) => lower.includes(c));
  if (mentionedCity && matchedProps.length > 0) {
    const cityFiltered = matchedProps.filter((p) =>
      (p.location || "").toLowerCase().includes(mentionedCity)
    );
    if (cityFiltered.length > 0) {
      matchedProps = cityFiltered;
    }
  }

  // Sort by price ascending
  matchedProps.sort((a, b) => a.price - b.price);

  // Map to lightweight cards format
  const formattedCards = matchedProps.slice(0, 3).map((p) => ({
    _id: p.id,
    name: p.name,
    price: p.price,
    city: p.location,
    type: p.type,
    rating: p.rating,
    image: p.imageUrl,
  }));

  // Handle Budget and Price Queries
  if (
    hasBudgetQuery ||
    lower.includes("price") ||
    lower.includes("rent") ||
    lower.includes("budget") ||
    lower.includes("cost") ||
    lower.includes("under") ||
    lower.includes("between")
  ) {
    // Range query: between min and max
    if (minBudget !== null && maxBudget !== null) {
      if (formattedCards.length > 0) {
        const listSummary = formattedCards
          .map((p) => `• **${p.name}** in ${p.city} — ₹${p.price.toLocaleString()}/month`)
          .join("\n");

        return {
          reply: `Here are verified accommodations in the **₹${minBudget.toLocaleString()} – ₹${maxBudget.toLocaleString()}/month** range:\n\n${listSummary}\n\nYou can click any card below to explore full details and schedule a free visit!`,
          suggestedProperties: formattedCards,
        };
      } else {
        return {
          reply: `We currently do not have verified listings strictly between **₹${minBudget.toLocaleString()} and ₹${maxBudget.toLocaleString()}/month**. Please explore our **All Listings** page to view all available accommodations across price brackets!`,
          suggestedProperties: [],
        };
      }
    }

    // Min budget query: above min
    if (minBudget !== null) {
      if (formattedCards.length > 0) {
        const listSummary = formattedCards
          .map((p) => `• **${p.name}** in ${p.city} — ₹${p.price.toLocaleString()}/month`)
          .join("\n");

        return {
          reply: `Here are verified premium stays starting from **₹${minBudget.toLocaleString()}/month**:\n\n${listSummary}\n\nClick on any listing below to review amenities!`,
          suggestedProperties: formattedCards,
        };
      }
    }

    // Max budget query: under max
    if (maxBudget !== null) {
      if (formattedCards.length > 0) {
        const listSummary = formattedCards
          .map((p) => `• **${p.name}** in ${p.city} — ₹${p.price.toLocaleString()}/month`)
          .join("\n");

        return {
          reply: `Here are verified accommodations under **₹${maxBudget.toLocaleString()}/month**:\n\n${listSummary}\n\nAll verified stays include Wi-Fi, food options, and 24/7 security.`,
          suggestedProperties: formattedCards,
        };
      } else {
        return {
          reply: `We currently do not have stays below ₹${maxBudget.toLocaleString()}/month in this selection. Our most affordable verified stays start around ₹5,000 – ₹6,500/month on the **All Listings** page.`,
          suggestedProperties: [],
        };
      }
    }

    return {
      reply: `Our verified rental accommodations range from ₹5,000 to ₹35,000 per month across Single, Double, and Triple sharing options. Please specify your target budget (e.g., *"between 15000 - 30000"* or *"under 10000"*) so I can find the best fit!`,
      suggestedProperties: formattedCards,
    };
  }

  // Visit scheduling inquiries
  if (
    lower.includes("visit") ||
    lower.includes("schedule") ||
    lower.includes("tour") ||
    lower.includes("view") ||
    lower.includes("see")
  ) {
    return {
      reply:
        "You can schedule a complimentary in-person visit on any property page by clicking the **'Schedule a Free Visit'** button! " +
        "Simply choose your preferred date and time slot, and our property manager will personally welcome and guide you. It is 100% free of charge.",
      suggestedProperties: matchedProps.slice(0, 2),
    };
  }

  // Deposit and Brokerage inquiries
  if (
    lower.includes("deposit") ||
    lower.includes("security") ||
    lower.includes("brokerage") ||
    lower.includes("fee") ||
    lower.includes("commission")
  ) {
    return {
      reply:
        "UrbanStayz operates with **Zero Brokerage**—you never pay any agent commissions! " +
        "The security deposit is standardly equivalent to 1 month of refundable rent, returned safely upon move-out. There are no hidden fees.",
      suggestedProperties: [],
    };
  }

  // Amenities inquiries
  if (
    lower.includes("amenities") ||
    lower.includes("facility") ||
    lower.includes("wifi") ||
    lower.includes("food") ||
    lower.includes("meal") ||
    lower.includes("laundry") ||
    lower.includes("kitchen")
  ) {
    return {
      reply:
        "All verified UrbanStayz accommodations come equipped with premium amenities, including:\n" +
        "• **3 Nutritious Meals Daily:** Hygienic and balanced home-style food\n" +
        "• **High-Speed Wi-Fi & Power Backup:** Uninterrupted connection for work and studies\n" +
        "• **Housekeeping & Laundry:** Regular room sanitation and automated washing\n" +
        "• **24/7 Security:** CCTV monitoring, biometric access, and secure entry\n" +
        "• **Air Conditioning & Geysers:** Modern climate control and attached bathrooms",
      suggestedProperties: matchedProps.slice(0, 2),
    };
  }

  // Location inquiries
  if (
    lower.includes("delhi") ||
    lower.includes("noida") ||
    lower.includes("gurgaon") ||
    lower.includes("bangalore") ||
    lower.includes("location") ||
    lower.includes("where")
  ) {
    return {
      reply:
        "UrbanStayz offers verified accommodations in Delhi NCR (including Noida and Gurgaon), Bangalore, and top academic/IT hubs. " +
        "You can head over to our **All Listings** page and filter by city to explore stays conveniently located near your campus or office!",
      suggestedProperties: matchedProps,
    };
  }

  // Contact and Support inquiries
  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("call") ||
    lower.includes("email") ||
    lower.includes("support") ||
    lower.includes("help")
  ) {
    return {
      reply:
        "Our customer support team is always ready to assist you:\n" +
        "• **Email:** support@urbanstayz.com\n" +
        "• **Phone:** +91 98765 43210\n" +
        "• Or submit an inquiry directly through our **Contact Us** page!",
      suggestedProperties: [],
    };
  }

  // General default response
  return {
    reply:
      "Hello! I am Riya, your dedicated UrbanStayz Assistant. How may I assist you today?\n" +
      "You can ask me about available PGs, rent prices, zero-brokerage policies, amenities, or how to schedule a free visit!",
    suggestedProperties: matchedProps.slice(0, 2),
  };
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  // Load starter suggestions from backend if available
  useEffect(() => {
    getChatbotSuggestions()
      .then((res) => {
        if (res.data?.data?.suggestions?.length > 0) {
          setSuggestions(res.data.data.suggestions);
        }
      })
      .catch(() => {
        // Fallback to default suggestions silently
      });
  }, []);

  const handleSend = async (messageText) => {
    const textToSend = (messageText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Append user message immediately
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    // Build history for context (last 6 turns)
    const historyPayload = messages
      .filter((m) => m.id !== "welcome-1")
      .slice(-6)
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

    try {
      const response = await sendChatMessage(textToSend, historyPayload);
      const resData = response.data?.data;

      const botMsg = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: resData?.reply || "How may I assist you further with your stay search?",
        suggestedProperties: resData?.suggestedProperties || [],
        poweredBy: resData?.poweredBy || "Riya - UrbanStayz",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Backend offline or unreachable, using client assistant fallback:", err.message);
      // Resilient Client-Side Fallback: Never leave user stranded with an error!
      const fallback = getClientAssistantResponse(textToSend);
      const botMsg = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: fallback.reply,
        suggestedProperties: fallback.suggestedProperties,
        poweredBy: "Riya - UrbanStayz",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Helper to format text with bold, bullet points and newlines cleanly
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold parser for **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={idx}>
          {formattedLine}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col">
        {/* Tooltip / Hint on initial load */}
        <AnimatePresence>
          {!isOpen && hasUnread && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-3 bg-white text-gray-800 text-xs font-medium py-2 px-3.5 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2 cursor-pointer hover:shadow-2xl transition"
              onClick={() => setIsOpen(true)}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-[#132350]">Need assistance with stays?</span>
              <span className="text-gray-400 text-[10px]">Ask Riya</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative cursor-pointer ${
            isOpen
              ? "bg-gray-800 text-white"
              : "bg-gradient-to-r from-[#132350] via-[#1a316c] to-[#0f766e] text-white shadow-blue-900/40"
          }`}
          aria-label="Toggle Riya - UrbanStayz Assistant"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <div className="w-full h-full rounded-full overflow-hidden p-0.5 border-2 border-white/40 shadow-inner bg-gradient-to-tr from-[#132350] to-[#0f766e]">
                <img
                  src="/bot-avatar.png"
                  alt="Riya"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </span>
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#132350] via-[#1e3a7c] to-[#0f766e] p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md bg-white/10 backdrop-blur-md">
                    <img
                      src="/bot-avatar.png"
                      alt="Riya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#132350] rounded-full shadow-xs"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm tracking-wide">Riya</h3>
                    <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Support
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-100/80 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Online • Instant Assistance
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-gray-50/70 to-white">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                          isUser
                            ? "bg-[#132350] text-white"
                            : "border border-blue-200/60 bg-blue-50"
                        }`}
                      >
                        {isUser ? (
                          <User className="w-3.5 h-3.5" />
                        ) : (
                          <img
                            src="/bot-avatar.png"
                            alt="Riya"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xs ${
                          isUser
                            ? "bg-gradient-to-r from-[#132350] to-[#1e3a7c] text-white rounded-tr-xs"
                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-xs shadow-sm"
                        }`}
                      >
                        {renderFormattedText(msg.text)}

                        {/* Suggested Properties Mini Cards */}
                        {msg.suggestedProperties && msg.suggestedProperties.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-2">
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <Building className="w-3 h-3 text-[#132350]" />
                              Recommended Stays
                            </p>
                            {msg.suggestedProperties.map((prop) => (
                              <Link
                                key={prop._id}
                                to={`/property/${prop._id}`}
                                onClick={() => setIsOpen(false)}
                                className="block p-2 rounded-xl bg-gray-50 hover:bg-blue-50/60 border border-gray-200 hover:border-blue-300 transition group cursor-pointer"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#132350] truncate">
                                      {prop.name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                      <span className="flex items-center gap-0.5">
                                        <MapPin className="w-2.5 h-2.5 text-gray-400" />
                                        {prop.city}
                                      </span>
                                      <span>•</span>
                                      <span className="text-emerald-700 font-semibold">{prop.type}</span>
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-xs font-bold text-[#132350]">
                                      ₹{prop.price?.toLocaleString()}
                                      <span className="text-[9px] text-gray-500 font-normal">/mo</span>
                                    </div>
                                    <span className="inline-flex items-center text-[10px] font-medium text-blue-600 group-hover:underline">
                                      View <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-9">{msg.time}</span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-gray-500 py-1">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-blue-200/60 bg-blue-50 shadow-xs">
                    <img
                      src="/bot-avatar.png"
                      alt="Riya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="text-[11px] text-gray-400 ml-1 font-medium">Riya is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills (Scrollable) */}
            <div className="px-3 py-2 bg-gray-50/80 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white text-gray-700 border border-gray-200 hover:border-[#132350] hover:text-[#132350] hover:bg-blue-50 transition cursor-pointer disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Footer Input Form */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about PGs, rent, visit scheduling..."
                    disabled={isLoading}
                    className="w-full text-xs sm:text-sm pl-3.5 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#132350] focus:ring-2 focus:ring-blue-100 outline-none transition disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="h-10 w-10 rounded-xl bg-[#132350] hover:bg-[#1a316c] text-white flex items-center justify-center transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-1.5 text-center">
                <p className="text-[10px] text-gray-400">
                  UrbanStayz Assistant • 24/7 Live Support
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
