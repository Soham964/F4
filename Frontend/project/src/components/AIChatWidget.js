import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Languages,
  Translate,
  Globe
} from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your VillageStay travel assistant. I can help you find the perfect rural accommodation, suggest activities, or answer any questions about your trip. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userLanguage, setUserLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('en-US');
  const [supportedLanguages, setSupportedLanguages] = useState([
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'Bengali', flag: '🇧🇩' },
    { code: 'te-IN', name: 'Telugu', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'Marathi', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
    { code: 'gu-IN', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'kn-IN', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ml-IN', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'pa-IN', name: 'Punjabi', flag: '🇮🇳' }
  ]);
  const [translationText, setTranslationText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = async () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        let voices = window.speechSynthesis.getVoices();
        
        if (voices.length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);
            
            // Set default voice (prefer Indian English if available)
            const indianVoice = voices.find(voice => 
              voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
            );
            setSelectedVoice(indianVoice || voices[0]);
          };
        } else {
          setAvailableVoices(voices);
          
          // Set default voice (prefer Indian English if available)
          const indianVoice = voices.find(voice => 
            voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
          );
          setSelectedVoice(indianVoice || voices[0]);
        }
      }
    };
    
    loadVoices();
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // Start listening
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsListening(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = userLanguage;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
        // Auto-send after voice input
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      };

      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleSpeechToTextWithTranslation = () => {
    // Simplified version - just use regular voice input for now
    handleVoiceInput();
  };

  const handleTextTranslation = async () => {
    if (!translationText.trim()) return;

    setIsTranslating(true);
    try {
      // Simplified translation - just echo back for now
      setTranslatedText(`[Translated to ${targetLanguage}]: ${translationText}`);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || currentMessage.trim();
    if (!textToSend) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Simplified AI response for now
      const aiResponse = `Thank you for your message: "${textToSend}". I'm a simplified version of the VillageStay assistant. In the full version, I would help you with rural tourism bookings, travel advice, and more. Please contact our support team for real assistance.`;
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Auto-speak response if voice is enabled
      if (voiceEnabled && selectedVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.voice = selectedVoice;
        utterance.lang = userLanguage;
        window.speechSynthesis.speak(utterance);
        // Reset speaking state after a delay
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div
          className={`fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 ${
            isMinimized ? 'h-16' : 'h-96'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-500 text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold">VillageStay Assistant</h3>
                <p className="text-xs text-primary-100">
                  {isListening ? 'Listening...' : isTyping ? 'Typing...' : 'Online now'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTranslation}
                className="p-1 hover:bg-primary-600 rounded"
                title="Translation"
              >
                <Translate className="w-4 h-4" />
              </button>
              <button
                onClick={toggleSettings}
                className="p-1 hover:bg-primary-600 rounded"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-primary-600 rounded"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={closeChat}
                className="p-1 hover:bg-primary-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Translation Panel */}
              {showTranslation && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="mr-2">🌐</span>
                    Translation
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm block mb-1">Target Language</label>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                      >
                        {supportedLanguages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Text to Translate</label>
                      <textarea
                        value={translationText}
                        onChange={(e) => setTranslationText(e.target.value)}
                        placeholder="Enter text to translate..."
                        className="w-full p-2 border rounded text-sm h-20 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleTextTranslation}
                      disabled={!translationText.trim() || isTranslating}
                      className="w-full p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isTranslating ? 'Translating...' : 'Translate'}
                    </button>
                    {translatedText && (
                      <div className="p-2 bg-white border rounded">
                        <label className="text-sm block mb-1 font-semibold">Translation:</label>
                        <p className="text-sm">{translatedText}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Panel */}
              {showSettings && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h4 className="font-semibold mb-3">Voice Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Voice Output</span>
                      <button
                        onClick={toggleVoice}
                        className={`p-2 rounded ${voiceEnabled ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                      >
                        {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                    </div>
                    {voiceEnabled && availableVoices.length > 0 && (
                      <div>
                        <label className="text-sm block mb-1">Voice</label>
                        <select
                          value={selectedVoice?.name || ''}
                          onChange={(e) => {
                            const voice = availableVoices.find(v => v.name === e.target.value);
                            setSelectedVoice(voice);
                          }}
                          className="w-full p-2 border rounded text-sm"
                        >
                          {availableVoices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64 custom-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-lg ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    title="Voice Input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleSpeechToTextWithTranslation}
                    className={`p-2 rounded-lg ${
                      isListening 
                        ? 'bg-blue-500 text-white animate-pulse' 
                        : 'bg-blue-200 text-blue-600 hover:bg-blue-300'
                    }`}
                    title="Speech to Text with Translation"
                  >
                    <Languages className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!currentMessage.trim()}
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {isListening && (
                  <div className="text-center text-xs text-red-500 mt-2">
                    Listening... Speak now
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AIChatWidget;