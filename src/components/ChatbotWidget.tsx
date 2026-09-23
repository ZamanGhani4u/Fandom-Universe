import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Compass, Trash2, ArrowUpRight } from 'lucide-react';
import { ChatMessage, CategoryId } from '../data/types.ts';
import { INITIAL_BOT_MESSAGE, getBotResponse } from '../data/chatbotKnowledge.ts';

interface ChatbotWidgetProps {
  onNavigate: (view: string, categoryId?: CategoryId) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Rule-based processing with natural slight delay
    setTimeout(() => {
      const botReply = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: botReply.quickReplies,
        navigationLink: botReply.navigationLink,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
          aria-label="Open FandomVerse AI Assistant"
        >
          <Bot className="w-7 h-7 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
          </span>
          <span className="sr-only">Open Chatbot</span>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[540px] max-h-[85vh] bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5 font-display">
                  <span>VerseBot</span>
                  <span className="text-[10px] bg-rose-500/10 text-rose-400 font-mono px-1.5 py-0.5 rounded border border-rose-500/20">
                    AI Guide
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">Rule-Based Fandom Knowledge</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-rose-600 text-white rounded-tr-none'
                      : 'bg-neutral-800/90 text-neutral-200 border border-neutral-700/60 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Navigation Link if available */}
                  {msg.navigationLink && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-700/60">
                      <button
                        onClick={() => {
                          onNavigate(
                            msg.navigationLink!.page,
                            msg.navigationLink!.tab as CategoryId | undefined
                          );
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-950 text-rose-400 hover:text-rose-300 font-medium rounded-lg border border-neutral-700 transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>{msg.navigationLink.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>

                {/* Quick replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(reply)}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 text-[11px] transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-neutral-400 bg-neutral-800/70 border border-neutral-700/50 w-fit px-3 py-2 rounded-2xl rounded-tl-none">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about anime, merch, trailers, events..."
                className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-rose-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white rounded-xl transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
