import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    // make same for mobile view.(375px)
    <div className="flex min-h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white shadow-md hidden md:block">
        <Sidebar />
      </aside> */}

      {/* Main Content */}
      <div className="w-full flex flex-col relative">
        <Header />
        {/* Child routes will be rendered here */}
        <main className="flex-1">
          <Toaster position="top-center" reverseOrder={false} />
          <Outlet />
        </main>
        <Footer />
        {/* Floating AI Chat Assistant */}
        <ChatWidget />
      </div>
    </div>
  );
};

export default MainLayout;
