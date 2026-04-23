import { useState } from "react";
import api from "../api/api.js";

export default function useChatBot() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessage(userText) {
    if (!userText.trim()) return;

    // add user message
    const userMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/chatbot/ask", { messages: updatedMessages });
      const assistantMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError("Failed to get response. Try again.", err);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setError(null);
  }

  return { messages, loading, error, sendMessage, clearChat };
}
