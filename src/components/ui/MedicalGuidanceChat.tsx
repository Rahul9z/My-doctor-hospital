"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, AlertTriangle, Activity } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export function MedicalGuidanceChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello. I am the AI Medical Assistant. Please describe your symptoms or the situation, and I will provide immediate first-aid guidance. If this is a life-threatening emergency, stop typing and call 1-800-EMERGENCY immediately." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/medical-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages })
      });
      
      const data = await response.json();
      
      // Basic markdown formatting (bolding)
      let formattedReply = data.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Fix newlines
      formattedReply = formattedReply.replace(/\n/g, '<br />');

      setMessages(prev => [...prev, { role: "ai", content: formattedReply }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Connection error. If this is an emergency, please call 1-800-EMERGENCY immediately." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    // Let state update before sending
    setTimeout(() => {
      const formEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent;
      handleSend(formEvent);
    }, 100);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden flex flex-col h-[600px] w-full">
      {/* Header */}
      <div className="bg-red-600 p-5 flex items-center gap-4 text-white shrink-0">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Activity className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-xl">AI Medical Assistant</h3>
          <p className="text-red-100 text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span> Live Guidance
          </p>
        </div>
      </div>

      {/* Persistent Disclaimer */}
      <div className="bg-red-50 p-3 flex items-start gap-3 border-b border-red-100 shrink-0">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <p className="text-xs text-red-800 font-medium">
          <strong>EMERGENCY WARNING:</strong> This AI provides preliminary information only. It cannot diagnose or treat conditions. For severe pain, bleeding, or breathing issues, call 1-800-EMERGENCY immediately.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50 flex flex-col gap-5">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-red-100 text-red-600'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div 
              className={`p-4 rounded-2xl text-[15px] shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 self-start max-w-[85%]">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-red-600" />
              <span className="text-sm text-slate-500 font-medium">Analyzing symptoms...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 pb-2 pt-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        <button onClick={() => handleSuggestedPrompt("What to do for a mild burn?")} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors whitespace-nowrap">
          Mild Burn
        </button>
        <button onClick={() => handleSuggestedPrompt("How to treat a sprained ankle?")} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors whitespace-nowrap">
          Sprained Ankle
        </button>
        <button onClick={() => handleSuggestedPrompt("Signs of an allergic reaction?")} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors whitespace-nowrap">
          Allergic Reaction
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the situation or symptoms..."
            className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-slate-700"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-3 p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
