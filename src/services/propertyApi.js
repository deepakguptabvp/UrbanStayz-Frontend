import axios from "axios";

// Read API URL from environment variable on Vercel or fallback to localhost
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically if stored in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("urbanstayz_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= PROPERTY APIS =================
export const getAllProperties = (params = {}) =>
  API.get("/properties", { params });

export const getFeaturedProperties = () => API.get("/properties/featured");

export const getCityStats = () => API.get("/properties/stats/cities");

export const getPropertyById = (id) => API.get(`/properties/${id}`);

export const createProperty = (data) => API.post("/properties", data);

export const updateProperty = (id, data) =>
  API.put(`/properties/${id}`, data);

export const deleteProperty = (id) => API.delete(`/properties/${id}`);

// ================= AUTH APIS =================
export const signupUser = (data) => API.post("/auth/signup", data);

export const sendOtp = (phone) => API.post("/auth/send-otp", { phone });

export const verifyOtp = (phone, otp) =>
  API.post("/auth/verify-otp", { phone, otp });

export const loginUser = (data) => API.post("/auth/login", data);

export const getMe = () => API.get("/auth/me");

// ================= CONTACT APIS =================
export const submitContactMessage = (data) => API.post("/contact", data);

// ================= BOOKING APIS =================
export const createBooking = (data) => API.post("/bookings", data);

export const getMyBookings = () => API.get("/bookings/my");

export default API;
