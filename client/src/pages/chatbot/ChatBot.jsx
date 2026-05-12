import {
  Bot,
  MoreHorizontal,
  Paperclip,
  Send,
  User,
  X,
  MessageCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Hi Protik! Welcome back. Ajke ki lagbe apnar? Fresh fruits naki vegetables? 🌿",
    sender: "bot",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "Apnar message পেয়েছি! আমরা শীঘ্রই সাহায্য করব। 🙏",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{
              type: "tween",
              ease: [0.4, 0, 0.2, 1],
              duration: 0.38,
            }}
            onClick={() => setIsOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#1B3022] text-white flex flex-col items-center gap-2 py-4 px-3 rounded-l-lg shadow-xl hover:bg-[#243d2c] transition-colors group"
          >
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <MessageCircle size={22} />
            </div>
            <span
              className="text-[14px] font-medium tracking-wide text-white/80 group-hover:text-white transition-colors"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Chat with us
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{
                type: "tween",
                ease: [0.4, 0, 0.4, 0],
                duration: 0.4,
              }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
            >
              {/* Header */}
              <div className="px-4 py-3 bg-[#1B3022] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                      <Bot size={22} />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1B3022] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm leading-tight">
                      Grocery Support
                    </h3>
                    <p className="text-[11px] text-green-400 font-medium">
                      Active Now
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="hover:bg-white/10 p-2 rounded-full transition-all text-white/70 hover:text-white">
                    <MoreHorizontal size={18} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/10 p-2 rounded-full transition-all text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#f3f5f0]">
                {messages.map((msg) =>
                  msg.sender === "bot" ? (
                    <div key={msg.id} className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1B3022] flex items-center justify-center text-white shrink-0">
                        <Bot size={15} />
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[82%] border border-black/5">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.88, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      className="flex items-end justify-end gap-2"
                    >
                      <div className="bg-[#1B3022] text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[82%]">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                        <User size={15} />
                      </div>
                    </div>
                  ),
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1B3022] flex items-center justify-center text-white shrink-0">
                      <Bot size={15} />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-black/5 flex gap-1 items-center">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          initial={{ opacity: 0.4 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: dot * 0.2,
                            repeatType: "reverse",
                          }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="text-[#1B3022] p-1.5 hover:bg-[#1B3022]/10 rounded-full transition-all">
                    <Paperclip size={19} />
                  </button>
                  <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 border border-transparent focus-within:border-[#1B3022]/30 transition-all">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none focus:outline-none text-[14px] w-full text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="bg-[#1B3022] text-white p-2.5 rounded-full hover:bg-[#243d2c] active:scale-95 transition-all"
                  >
                    <Send size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
