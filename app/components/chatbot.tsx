'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  BookOpen,
  Users,
  Globe,
  Shield,
  TrendingUp,
  HelpCircle,
  Loader2,
  Trash2,
  RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AgroChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm AgroChain AI Assistant. How can I help you learn about our agricultural revolution today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions: QuickQuestion[] = [
    { id: 'q1', text: 'What is AgroChain?', icon: BookOpen },
    { id: 'q2', text: 'How does it help farmers?', icon: Users },
    { id: 'q3', text: 'What technology do you use?', icon: Sparkles },
    { id: 'q4', text: 'Is it available globally?', icon: Globe },
    { id: 'q5', text: 'How secure is the data?', icon: Shield },
    { id: 'q6', text: 'What are the benefits?', icon: TrendingUp },
  ];

  // Predefined responses
  const botResponses: Record<string, string> = {
    'hello': "Hello! 👋 I'm AgroChain AI, here to help you understand how we're transforming agriculture with AI and blockchain.",
    'hi': "Hi there! 🌱 Welcome to AgroChain. How can I assist you today?",
    'what is agrochain': "AgroChain is Africa's first AI + Blockchain Agricultural Trust Layer. We create transparency in agricultural supply chains, empowering farmers with digital tools, fair pricing, and verified quality tracking from farm to market.",
    'how does it work': "AgroChain works in 5 simple steps:\n1. Farmers register and create digital profiles\n2. Harvests are logged with QR codes\n3. Produce movement is tracked\n4. Buyers verify quality via scanning\n5. Farmers build digital reputation for financial services",
    'farmers': "We empower farmers by:\n• Providing digital identity and profiles\n• Ensuring fair pricing through transparency\n• Offering access to financial services\n• Building trust with quality verification\n• Connecting directly to global markets",
    'technology': "We use cutting-edge technology:\n• AI for predictive analytics and quality assessment\n• Blockchain for immutable records and transparency\n• Mobile-first platform for rural accessibility\n• IoT for real-time tracking and monitoring",
    'security': "Data security is our priority:\n• Bank-grade encryption\n• Blockchain-verified records\n• GDPR compliance\n• Farmer data ownership\n• Secure transactions",
    'benefits': "Key benefits include:\n• 30-50% better prices for farmers\n• Complete supply chain transparency\n• Verified product quality\n• Reduced food waste\n• Access to global markets\n• Financial inclusion for farmers",
    'pricing': "AgroChain offers flexible pricing:\n• Free basic accounts for small farmers\n• Premium features for cooperatives\n• Enterprise solutions for large buyers\n• Volume-based pricing for exporters",
    'countries': "Currently operating in Kenya, Ethiopia, and Rwanda with plans to expand across Africa. We support global buyers from Europe, Middle East, and Asia.",
    'contact': "You can reach us at:\n• Email: contact@agrochain.com\n• Phone: +254 700 000 000\n• Nairobi, Kenya headquarters\n• Social: @agrochain on all platforms",
    'pilot': "Our pilot program is currently helping 5,000+ farmers. Key achievements:\n• 95% price improvement\n• Zero rejected shipments\n• 100% transparency rate\n• 24/7 platform availability",
    'thanks': "You're welcome! 😊 Let me know if you have any other questions about AgroChain.",
    'thank you': "My pleasure! 🌾 I'm here anytime you need information about agricultural innovation.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return response;
      }
    }

    // Check for similar patterns
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return botResponses['pricing'];
    }
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('country')) {
      return botResponses['countries'];
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return botResponses['contact'];
    }
    if (lowerMessage.includes('thank')) {
      return botResponses['thanks'];
    }

    // Default response for unknown queries
    return "I understand you're asking about: \"" + userMessage + "\"\n\nI can help you with information about AgroChain's services, technology, benefits for farmers, pricing, locations, and more. Could you please rephrase your question or choose from the quick questions below?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm AgroChain AI Assistant. How can I help you learn about our agricultural revolution today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open AgroChain Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
          AI
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed left-6 bottom-24 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-lime-500 rounded-t-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AgroChain AI</h3>
              <p className="text-emerald-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                Online • Ready to help
              </p>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Clear Chat Button */}
            {messages.length > 1 && (
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors group/clear"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4 text-white group-hover/clear:scale-110 transition-transform" />
              </button>
            )}
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50/50 chatbot-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 rounded-br-none'
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}
              >
                <div 
                  className={`whitespace-pre-line text-sm ${
                    message.sender === 'user' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-emerald-100' : 'text-gray-600'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3">
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                  <span className="text-sm text-gray-900">AgroChain AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-gray-900">
                <HelpCircle className="w-3 h-3" />
                <span className="font-medium">Quick questions:</span>
              </div>
              
              {/* Clear Chat Option - Mobile */}
              {messages.length > 1 && (
                <button
                  onClick={clearChat}
                  className="md:hidden flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question) => {
                const Icon = question.icon;
                return (
                  <button
                    key={question.id}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="text-left p-2 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-xs text-gray-900 hover:text-emerald-700 flex items-center gap-2"
                  >
                    <Icon className="w-3 h-3 flex-shrink-0 text-gray-600" />
                    <span className="truncate">{question.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about AgroChain..."
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-0 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-gray-50 text-gray-900 placeholder-gray-500"
                disabled={isTyping}
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Note with Clear Option */}
        <div className="border-t border-gray-200 p-3 bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            AI assistant • Responses may vary
          </p>
          
          {/* Clear Chat Option - Desktop */}
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="hidden md:flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
              aria-label="Clear chat"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}