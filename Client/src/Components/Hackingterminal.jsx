import { useEffect, useState } from "react";

const HackerTerminal = () => {
  const [logs, setLogs] = useState([]);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()";

  useEffect(() => {
    const interval = setInterval(() => {
      const randomString = Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join(" ");
      setLogs((prevLogs) => [...prevLogs.slice(-15), randomString]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-[#02fdff] text-md font-mono p-4 h-60 w-80 overflow-hidden border  rounded-md">
      <div className="h-full overflow-y-auto flex flex-col-reverse">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default HackerTerminal;
