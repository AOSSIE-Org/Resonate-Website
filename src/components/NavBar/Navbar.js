import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleVoiceCommand = useCallback((command) => {
    const scrollMap = {
      'features': '.features',
      'show features': '.features',
      'show me features': '.features',
      'tech stack': '.tech-stack-container',
      'technology': '.tech-stack-container',
      'stack': '.tech-stack-container',
      'about': '.about',
      'details': '.about',
      'who are you': '.about',
      'download': '.download-app-section',
      'get app': '.download-app-section',
      'install': '.download-app-section',
      'top': 'body',
      'home': 'body',
      'scroll up': 'body'
    };

    for (const key in scrollMap) {
      if (command.includes(key)) {
        const target = document.querySelector(scrollMap[key]);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
          return true;
        }
      }
    }
    return false;
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log("🎤 Voice recognition activated. Listening for commands...");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const fullTranscript = (finalTranscript + interimTranscript).toLowerCase().trim();
      console.log("🎤 Hearing:", fullTranscript);

      // Trigger scroll as soon as a keyword matches
      const recognized = handleVoiceCommand(fullTranscript);
      if (recognized) {
        console.log("✅ Command Recognized! Stopping microphone.");
        recognition.stop();
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech Recognition Error:", event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please enable microphone permissions in your browser settings.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("🎤 Voice recognition session ended.");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [handleVoiceCommand]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Voice Recognition is not supported or initialized.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>
        <div className="navbar-links">
          <button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleVoice}
            aria-label="Voice Navigation"
            title="Voice Search"
          >
            {isListening ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
          </button>
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FaGithub size={20} />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="download-btn">Download Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
