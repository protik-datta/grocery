import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import Container from './Container';

const NotFound = () => {
  useEffect(() => {
    // Page scroll lock
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <main className="fixed inset-0 w-full h-full bg-[#F8F9F8] font-outfit flex flex-col overflow-hidden touch-none">
      {/* Top accent bar */}
      <div className="w-full h-1.5 bg-[#1B3022] shrink-0" />

      <Container className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* Animated 404 Header */}
          <div className="relative mb-6">
            <h1 className="text-[120px] md:text-[160px] font-bold text-[#1B3022]/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Ghost size={60} className="text-[#1B3022] animate-bounce" />
            </div>
          </div>

          {/* Message */}
          <h2 className="text-[#1B3022] text-2xl md:text-3xl font-semibold mb-3">
            Oops! Page not found
          </h2>
          <p className="text-gray-500 text-[15px] max-w-md mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, our groceries are still here!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
            <Link
              to="/"
              className="flex-1 w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white text-[14px] font-medium py-3.5 rounded-xl hover:opacity-90 transition-all active:scale-95"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 w-full flex items-center justify-center gap-2 bg-white border border-[#1B3022]/15 text-[#1B3022] text-[14px] font-medium py-3.5 rounded-xl hover:bg-[#1B3022]/5 transition-colors"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          {/* Footer Decoration */}
          <div className="mt-16 flex items-center gap-2 text-[#1B3022]/20">
            <div className="w-12 h-px bg-current" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Instacart BD
            </span>
            <div className="w-12 h-px bg-current" />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
