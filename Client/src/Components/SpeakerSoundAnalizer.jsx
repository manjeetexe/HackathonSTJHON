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
      if (!isSpeaking) {
        stopAudio();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!isMounted) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        const bufferLength = analyser.fftSize;
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

        const drawWaveform = () => {
          if (!analyserRef.current) return;
          animationRef.current = requestAnimationFrame(drawWaveform);
          analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#111";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.beginPath();
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#02fdff";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#02fdff";

          let sliceWidth = canvas.width / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            let v = dataArrayRef.current[i] / 128.0;
            let y = (v * canvas.height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.stroke();
        };

        drawWaveform();
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

      // Clear canvas when stopping
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
      stopAudio();
    };
  }, [isSpeaking]); // Runs when isSpeaking changes

  return (
    <div className="flex justify-center relative items-center bg-black p-4 h-60 w-80 border rounded-md border-[#02fdff]">
  <p className="absolute top-4 text-[#02fdff] left-5">
    {isSpeaking ? (isWorking ? "AI Speaking..." : "Mic Access Denied") : "Idle"}
  </p>
  
  {/* Show the line only when isSpeaking is false */}
  {!isSpeaking && (
    <div className="w-full absolute top-1/2 border-t border-[#02fdff] h-1"></div>
  )}

  <canvas ref={canvasRef} className="w-full h-full" />
</div>
  );
};

export default AudioVisualizer;