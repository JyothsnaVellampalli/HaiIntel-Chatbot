import React, { useState, useEffect, useRef, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { useDebounce, useFormatTime, generateSessionId, useVirtualScroll } from '../utils/chatUtils';

// Lazy load internal chat components
const ChatWindow = lazy(() => Promise.resolve({ 
  default: memo(({ 
    isOpen, 
    sessionId,
    onClose
  }) => {
    // All chat functionality moved here
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Debounce messages for localStorage saves (300ms delay)
    const debouncedMessages = useDebounce(messages, 300);

    // Virtual scrolling for large message lists (currently disabled for small lists)
    const {
      handleScroll,
      scrollElementRef
    } = useVirtualScroll(messages, 100, 240);

    // Message animation with intersection observer (temporarily disabled)
    // const { registerMessage } = useMessageAnimation();

    // Handle outside click to close chat
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          isOpen &&
          chatContainerRef.current &&
          !chatContainerRef.current.contains(event.target)
        ) {
          onClose(event);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);

    // Memoized function to set default message
    const setDefaultMessage = useCallback(() => {
      const welcomeMessage = {
        id: Date.now(),
        text: "Hello! I'm your HaiIntel assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
        isComplete: true
      };
      setMessages([welcomeMessage]);
    }, []);

    // Load messages when chat opens
    useEffect(() => {
      if (isOpen && sessionId && !messagesLoaded) {
        const savedMessages = localStorage.getItem(`haiintel_chat_${sessionId}`);
        
        if (savedMessages) {
          try {
            const parsedMessages = JSON.parse(savedMessages);
            
            if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
              // Convert timestamp strings back to Date objects
              const messagesWithDates = parsedMessages.map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
              }));
              setMessages(messagesWithDates);
              setMessagesLoaded(true);
            } else {
              setDefaultMessage();
              setMessagesLoaded(true);
            }
          } catch (error) {
            console.error('Error parsing saved messages:', error);
            setDefaultMessage();
            setMessagesLoaded(true);
          }
        } else {
          setDefaultMessage();
          setMessagesLoaded(true);
        }
      }
    }, [isOpen, sessionId, setDefaultMessage, messagesLoaded]);

    // Reset messages loaded flag when chat closes
    useEffect(() => {
      if (!isOpen) {
        setMessagesLoaded(false);
      }
    }, [isOpen]);

    // Debounced localStorage save for messages (performance optimization)
    useEffect(() => {
      if (sessionId && debouncedMessages.length > 0) {
        try {
          localStorage.setItem(`haiintel_chat_${sessionId}`, JSON.stringify(debouncedMessages));
          console.log('Chat messages saved to localStorage (debounced):', debouncedMessages.length, 'messages');
        } catch (error) {
          console.error('Error saving chat messages:', error);
        }
      }
    }, [debouncedMessages, sessionId]);

    // Memoized scroll function for virtual scrolling
    const scrollToBottom = useCallback(() => {
      if (scrollElementRef.current) {
        // For virtual scrolling, scroll to the bottom of the container
        scrollElementRef.current.scrollTop = scrollElementRef.current.scrollHeight;
      } else if (messagesEndRef.current) {
        // Fallback to normal scrolling
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [scrollElementRef]);

    useEffect(() => {
      scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // Memoized streaming text effect
    const streamText = useCallback((text, messageId) => {
      const words = text.split(' ');
      let currentText = '';
      
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += (index === 0 ? '' : ' ') + word;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === messageId 
                ? { ...msg, text: currentText, isComplete: index === words.length - 1 }
                : msg
            )
          );
        }, index * 100); // 100ms delay between words
      });
    }, []);

    // Memoized bot responses
    const botResponses = useMemo(() => [
      "Hi! I'm here to help you learn about HaiIntel. We build AI tools that solve real business problems. What would you like to know about our products or services?",
      "Hello! HaiIntel creates smart AI solutions for companies. We help with things like updating old software, finding new customers, and improving customer support. How can I assist you today?",
      "Welcome! We make AI that actually works for businesses. Instead of just selling software, we focus on getting you real results. What specific challenge are you trying to solve?",
      "Hi there! HaiIntel specializes in practical AI solutions. We have tools for code modernization, lead generation, customer onboarding, and support automation. What interests you most?",
      "Hello! Think of us as your AI partner. We don't just provide tools - we help you achieve specific goals like faster customer service, better lead quality, or modernizing legacy systems. What can I help you with?"
    ], []);

    const handleSendMessage = useCallback((e) => {
      e.preventDefault();
      if (inputValue.trim() === '') return;

      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        isBot: false,
        timestamp: new Date(),
        isComplete: true
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate bot response with typing and streaming
      setTimeout(() => {
        setIsTyping(false);
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMessageId = Date.now() + 1;
        
        const botMessage = {
          id: botMessageId,
          text: '',
          isBot: true,
          timestamp: new Date(),
          isComplete: false
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Start streaming text
        setTimeout(() => {
          streamText(randomResponse, botMessageId);
        }, 300);
        
      }, 1500); // 1.5s typing delay
    }, [inputValue, botResponses, streamText]);

    // Memoized time formatter using hook from utils
    const formatTime = useFormatTime();

    // Memoized clear conversation function
    const clearConversation = useCallback(() => {
      if (sessionId) {
        localStorage.removeItem(`haiintel_chat_${sessionId}`);
        // Reset to default welcome message
        const welcomeMessage = {
          id: Date.now(),
          text: "Hello! I'm your HaiIntel assistant. How can I help you today?",
          isBot: true,
          timestamp: new Date(),
          isComplete: true
        };
        setMessages([welcomeMessage]);
      }
    }, [sessionId]);

    // Typing indicator component
    const TypingIndicator = memo(() => (
      <div className="flex justify-start mb-4">
        <div className="bg-white/10 text-white max-w-xs px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex space-x-1 items-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-white/60 ml-2">AI is typing...</span>
          </div>
        </div>
      </div>
    ));

    if (!isOpen) return null;

    return (
      <div className="fixed bottom-24 right-6 w-80 h-96 z-40 animate-in slide-in-from-bottom-5 duration-300">
        <div 
          ref={chatContainerRef}
          className="w-full h-full rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          style={{ backgroundColor: '#000000f2' }}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">HaiIntel Assistant</h3>
                <p className="text-white/60 text-xs">
                  {messages.length > 1 ? `${messages.length - 1} messages stored` : 'Online'}
                </p>
              </div>
            </div>
            
            {/* Clear conversation button */}
            {messages.length > 1 && (
              <button
                onClick={clearConversation}
                className="text-white/60 hover:text-white transition-colors p-1 rounded"
                title="Clear conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {/* Messages Container */}
          <div 
            ref={scrollElementRef}
            className="flex-1 overflow-y-auto p-4"
            onScroll={handleScroll}
          >
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item flex ${message.isBot ? 'justify-start' : 'justify-end'} items-end space-x-2`}
                >
                  {message.isBot && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, hsl(220 40% 18%), hsl(214 84% 56%))'
                      }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className={`max-w-xs ${message.isBot ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 text-sm shadow-lg ${
                        message.isBot
                          ? 'bg-white/10 text-white rounded-2xl rounded-bl-md backdrop-blur-sm border border-white/10'
                          : 'text-white rounded-2xl rounded-br-md'
                      }`}
                      style={!message.isBot ? {
                        background: 'linear-gradient(135deg, hsl(214 84% 56%), hsl(220 40% 18%))'
                      } : {}}
                    >
                      <p className="leading-relaxed">
                        {message.text}
                        {message.isBot && !message.isComplete && (
                          <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse"></span>
                        )}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.isBot ? 'text-white/50' : 'text-white/70'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>

                  {!message.isBot && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 order-2"
                      style={{ 
                        background: 'linear-gradient(135deg, hsl(38 92% 50%), hsl(45 86% 62%))'
                      }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-white/10 text-white placeholder-white/60 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  })
}));

const FloatingChat = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  
  const chatButtonRef = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    // Get or create session ID
    let currentSessionId = localStorage.getItem('haiintel_chatSessionId');
    if (!currentSessionId) {
      currentSessionId = generateSessionId();
      localStorage.setItem('haiintel_chatSessionId', currentSessionId);
      console.log('Created new chat session:', currentSessionId);
    } else {
      console.log('Restored chat session:', currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  // Handle close chat from outside click
  const handleCloseChat = useCallback((event) => {
    // Don't close if clicking on the chat button
    if (chatButtonRef.current && chatButtonRef.current.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Chat Icon/Launcher - Always visible for immediate interaction */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          ref={chatButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/20"
          style={{ backgroundColor: '#000000f2' }}
        >
          {isOpen ? (
            // Close icon
            <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Chat icon
            <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Lazy loaded chat window - Only loads internal components when opened */}
      <Suspense fallback={
        isOpen ? (
          <div className="fixed bottom-24 right-6 w-80 h-96 z-40 animate-in slide-in-from-bottom-5 duration-300">
            <div className="w-full h-full rounded-xl shadow-2xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: '#000000f2' }}>
              <div className="text-white text-sm">Loading chat...</div>
            </div>
          </div>
        ) : null
      }>
        <ChatWindow
          isOpen={isOpen}
          sessionId={sessionId}
          onClose={handleCloseChat}
        />
      </Suspense>
    </>
  );
});

FloatingChat.displayName = 'FloatingChat';

export default FloatingChat;