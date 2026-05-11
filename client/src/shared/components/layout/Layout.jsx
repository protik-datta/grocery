import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ChatBot from "../../../pages/chatbot/ChatBot";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <ChatBot />

      <Footer />
    </div>
  );
};

export default Layout;
