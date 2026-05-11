import React, { useState, useEffect } from 'react';

const TerminalLog = () => {
  const [logs, setLogs] = useState(["[ SYSTEM_INITIALIZED ]"]);
  const creepyMessages = [
    "Analyzing eye movement...",
    "Pupil dilation detected.",
    "Breath rate: Shallow.",
    "Heart rate increasing.",
    "Target is focused.",
    "Synchronization: 84%",
    "Mapping childhood fears...",
    "User location: Locked.",
    "Don't look behind you.",
    "They are listening.",
    "The void is watching back.",
    "Connection stable. Target calm.",
  ];

  useEffect(() => {
    const addLog = () => {
      const msg = creepyMessages[Math.floor(Math.random() * creepyMessages.length)];
      setLogs(prev => [...prev.slice(-5), `> ${msg}`]);
    };

    const interval = setInterval(addLog, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 font-mono text-[9px] text-horror-red/40 pointer-events-none z-50 space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="animate-pulse">{log}</div>
      ))}
    </div>
  );
};

export default TerminalLog;
