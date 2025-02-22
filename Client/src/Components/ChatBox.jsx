import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FuturisticChat = ({ messages, setMessages, sendMessage }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);  

  return (
    <div className="w-80 h-120 bg-black/80 rounded-md border border-[#02fdff] p-2 text-[#02fdff] shadow-lg flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === "user"
                ? "ml-auto bg-[#02fdff] text-black"
                : "bg-gray-900 text-[#02fdff]"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {/* Empty div for auto-scroll */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box & Send Button */}
      <div className="border-t border-[#02fdff] pt-2 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border border-cyan-500 p-2 rounded-sm text-[#02fdff] outline-none"
        />
        <button
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
          className="ml-2 p-2 bg-[#02fdff] text-black rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FuturisticChat;