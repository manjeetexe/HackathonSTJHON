import { useEffect, useRef, useState } from "react";

const AudioVisualizer = ({ isSpeaking }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setupAudio = async () => {
      try {
        if (isSpeaking) {
          stopAudio(); // Stop audio if AI is speaking
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!isMounted) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
        audioContextRef.current = audioContext;
        mediaStreamRef.current = stream;
        setIsWorking(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 320;
        canvas.height = 240;

        const draw = () => {
          if (!analyserRef.current) return;
          animationRef.current = requestAnimationFrame(draw);
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#111";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArrayRef.current[i];
            ctx.fillStyle = `rgb(2, 253, 255)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          }
        };
        draw();
      } catch (error) {
        console.error("Microphone access error:", error);
        setIsWorking(false);
      }
    };

    const stopAudio = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      setIsWorking(false);
    };

    setupAudio();

    return () => {
      isMounted = false;
      stopAudio();
    };
  }, [isSpeaking]); // Re-run when isSpeaking changes

  return (
    <div className="flex justify-center relative items-center bg-black p-4 h-60 w-80 border rounded-md border-[#02fdff]">
      <p className="absolute top-4 text-[#02fdff] left-5">
        {isWorking ? "Listening..." : isSpeaking ? "AI Speaking" : "Mic Access Denied"}
      </p>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AudioVisualizer;