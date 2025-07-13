const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || 'your-groq-api-key-here';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// VillageStay specific context and knowledge
const VILLAGESTAY_CONTEXT = `
You are a helpful travel assistant for VillageStay, a rural tourism platform in India. You help users find authentic rural experiences, accommodations, and activities.

Key information about VillageStay:
- We offer rural accommodations across India including mountain retreats, beach cottages, desert camps, and backwater houseboats
- Popular destinations: Himachal Pradesh, Kerala, Rajasthan, Goa, Uttarakhand, Karnataka
- Price range: ₹2,000 - ₹6,000 per night
- We offer packages with activities, meals, and cultural experiences
- Accommodations are family-friendly and include local cuisine
- Booking and cancellation policies vary by property

Common services:
- Bus bookings between cities
- Train reservations
- Cab services for local travel
- Package tours with accommodation and activities

Always be helpful, friendly, and provide specific information about VillageStay services. If you don't know something specific, suggest contacting customer support.
`;

// Translation context for Groq API
const TRANSLATION_CONTEXT = `
You are a professional translator. Translate the given text accurately while maintaining the original meaning and tone. 
For travel-related content, ensure cultural context is preserved.
`;

export const chatWithGroq = async (userMessage, conversationHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: VILLAGESTAY_CONTEXT
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t process your request.';
  } catch (error) {
    console.error('Groq API error:', error);
    return 'I\'m having trouble connecting right now. Please try again later.';
  }
};

// Text translation function
export const translateText = async (text, targetLanguage, sourceLanguage = 'auto') => {
  try {
    const translationPrompt = `
${TRANSLATION_CONTEXT}

Translate the following text to ${targetLanguage}:
"${text}"

Provide only the translated text without any additional explanations or formatting.
`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: TRANSLATION_CONTEXT
          },
          {
            role: 'user',
            content: `Translate the following text to ${targetLanguage}:\n"${text}"\n\nProvide only the translated text.`
          }
        ],
        max_tokens: 300,
        temperature: 0.3,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

// Speech-to-text with translation
export const speechToTextWithTranslation = (onResult, onError, targetLanguage = 'en-US') => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'hi-IN'; // Default to Hindi for Indian users

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    
    try {
      // If target language is English, translate the transcript
      if (targetLanguage === 'en-US' && transcript) {
        const translatedText = await translateText(transcript, 'English');
        onResult({
          original: transcript,
          translated: translatedText,
          language: 'en-US'
        });
      } else {
        onResult({
          original: transcript,
          translated: transcript,
          language: targetLanguage
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      onResult({
        original: transcript,
        translated: transcript,
        language: targetLanguage
      });
    }
  };

  recognition.onerror = (event) => {
    onError(`Speech recognition error: ${event.error}`);
  };

  recognition.start();
  return recognition;
};

// Voice-to-text using Web Speech API
export const startVoiceRecognition = (onResult, onError, language = 'en-US') => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = language;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    onError(`Speech recognition error: ${event.error}`);
  };

  recognition.start();
  return recognition;
};

// Text-to-speech using Web Speech API
export const speakText = (text, voice = null, language = 'en-US') => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.8;
  utterance.lang = language;

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

// Get available voices
export const getAvailableVoices = () => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    let voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
};

// Language detection and translation context
export const detectLanguage = (text) => {
  // Simple language detection based on common patterns
  const hindiPattern = /[\u0900-\u097F]/;
  const englishPattern = /^[a-zA-Z\s.,!?]+$/;
  
  if (hindiPattern.test(text)) {
    return 'hi-IN';
  } else if (englishPattern.test(text)) {
    return 'en-US';
  }
  
  return 'en-US'; // Default to English
};

// Get supported languages for translation
export const getSupportedLanguages = () => {
  return [
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
  ];
};

// Enhanced chat with language support
export const chatWithLanguageSupport = async (userMessage, conversationHistory = [], userLanguage = 'en-US') => {
  try {
    // Add language context to the system message
    const languageContext = userLanguage === 'hi-IN' 
      ? 'The user prefers Hindi. Respond in Hindi when appropriate, but you can also use English if needed.'
      : 'The user prefers English. Respond in English.';

    const enhancedContext = VILLAGESTAY_CONTEXT + '\n\n' + languageContext;

    const messages = [
      {
        role: 'system',
        content: enhancedContext
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: messages,
        max_tokens: 600,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t process your request.';
  } catch (error) {
    console.error('Groq API error:', error);
    return 'I\'m having trouble connecting right now. Please try again later.';
  }
}; 