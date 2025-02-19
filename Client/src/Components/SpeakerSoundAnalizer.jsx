import { useEffect, useRef, useState } from "react";

const AudioWaveVisualizer = () => {
  const [file, setFile] = useState(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 240;

    const audio = audioRef.current;
    audio.crossOrigin = "anonymous";
    audio.src = URL.createObjectURL(file);
    audio.load();
    audio.play();

    const setupAudio = async () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      try {
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (error) {
        console.warn("Audio source already connected, skipping:", error);
      }

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      audioContextRef.current = audioContext;
    };

    setupAudio().then(() => {
      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#02fdff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#02fdff";

        let sliceWidth = canvas.width / dataArrayRef.current.length;
        let x = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
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
      draw();
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [file]);

  return (
    <div className="flex flex-col overflow-hidden items-center justify-center w-80 h-60 bg-black border-2 border-[#02fdff] p-2 rounded-md shadow-lg neon-glow">
      <label className="text-cyan-400 font-mono mb-2 cursor-pointer hover:text-cyan-300 transition">
        Upload Audio:
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>
      <audio ref={audioRef} controls className="hidden" />
      <canvas ref={canvasRef} className="mt-4 w-full h-full bg-black rounded-lg" />
    </div>
  );
};

export default AudioWaveVisualizer;