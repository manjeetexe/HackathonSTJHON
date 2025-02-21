import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FuturisticChat = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to send messages to backend
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "Typing...", sender: "ai", temp: true } // Temporary AI response
    ]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // Replace the "Typing..." message with the actual AI response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.temp ? { text: data.response, sender: "ai" } : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.temp ? { text: "Error: Unable to fetch response", sender: "ai" } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          disabled={loading} // Disable button when loading
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default FuturisticChat;