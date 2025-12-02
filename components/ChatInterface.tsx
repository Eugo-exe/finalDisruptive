import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';

interface ChatInterfaceProps {
  onBack: () => void;
  isTabMode?: boolean; // Prop to adjust layout if used inside a tab
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack, isTabMode = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "สวัสดีเจ้าค่ะ! 🙏 หนูชื่อ 'น้องน้ำฝน' (Namfon) ยินดีต้อนรับสู่แดนสยาม\n\nวันนี้อยากให้หนูแนะนำที่เที่ยว หรือเล่าเรื่องอะไรให้ฟัง ถามมาได้เลยนะเจ้าคะ 🌧️",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]); // Scroll when loading state changes too

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    // h-full to fill the tab content area
    <div className="flex flex-col h-full bg-thai-midnight relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-thai-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-thai-rain rounded-full opacity-10 blur-[100px] pointer-events-none"></div>

      {/* Header - Only show if NOT in Tab Mode, OR show simplified header */}
      <div className="flex items-center p-4 border-b border-thai-gold/20 bg-thai-midnight/95 backdrop-blur-xl z-20 shadow-md">
        {!isTabMode && (
          <button 
            onClick={onBack}
            className="p-2 mr-2 rounded-full hover:bg-thai-gold/10 text-thai-gold transition-colors active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-thai-gold/50 p-0.5 bg-gradient-to-b from-thai-rain/20 to-thai-midnight relative shadow-[0_0_10px_rgba(76,161,175,0.3)] animate-float">
            <div className="w-full h-full rounded-full bg-thai-midnight flex items-center justify-center text-lg relative z-10 overflow-hidden">
              <span className="transform translate-y-0.5">🌧️</span>
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-thai-gold tracking-wide leading-none">น้องน้ำฝน</h2>
            <p className="text-[10px] text-thai-rain/80 mt-1 font-serif italic">AI Guide ผู้ช่วยนำเที่ยว</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 z-10 custom-scrollbar scroll-smooth pb-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-thai-gold to-[#B8860B] text-thai-midnight border-transparent rounded-br-sm font-medium' 
                  : 'bg-white/5 border-thai-gold/20 text-thai-silk rounded-bl-sm backdrop-blur-md'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{msg.text}</p>
              <span className={`text-[9px] block mt-1 text-right opacity-60 font-mono ${msg.role === 'user' ? 'text-black' : 'text-thai-gold'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 border border-thai-gold/20 p-3 rounded-2xl rounded-bl-sm flex gap-2 items-center">
              <span className="text-[10px] text-thai-gold/70 mr-1">กำลังพิมพ์...</span>
              <div className="w-1 h-1 bg-thai-rain rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-thai-rain rounded-full animate-bounce delay-100"></div>
              <div className="w-1 h-1 bg-thai-rain rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-thai-gold/20 backdrop-blur-xl z-20 bg-thai-midnight/95">
        <div className="flex gap-2 relative items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="พิมพ์คุยกับน้อง..."
            className="flex-1 bg-white/5 border border-thai-gold/30 rounded-full px-4 py-2.5 text-sm text-thai-silk placeholder-gray-500 focus:outline-none focus:border-thai-gold focus:ring-1 focus:ring-thai-gold/50 transition-all font-sans"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="bg-thai-gold text-thai-midnight w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-thai-crimson transition-colors shadow-[0_0_10px_rgba(212,175,55,0.4)] flex-shrink-0 active:scale-90 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;