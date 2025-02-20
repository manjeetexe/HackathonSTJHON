import { useState } from "react";
import Button from "./Button";

const AudioAnalyze = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false; // Stops after one sentence
    recognition.interimResults = false; // Only final results
    recognition.lang = "en-US"; // Set language

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log("Recognized Speech:", speechResult);
      onVoiceInput(speechResult); // Send text to chatbox
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Stopped listening.");
    };

    recognition.start();
  };

  return (
    <div onClick={startListening}>
      <Button Button={isListening ? "Listening..." : "Speak"} />
    </div>
  );
};

export default AudioAnalyze;