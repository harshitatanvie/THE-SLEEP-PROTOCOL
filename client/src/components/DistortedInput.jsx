import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DistortedInput = ({ label, value, onChange, placeholder, type = "text" }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (value.length > 0 && Math.random() > 0.95) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }
  }, [value]);

  return (
    <div className="mb-8 w-full group">
      <label className={`block text-horror-red text-xs uppercase mb-2 tracking-widest opacity-70 group-hover:opacity-100 transition-opacity ${glitch ? 'glitch' : ''}`}>
        {glitch ? "CORRUPTION DETECTED" : label}
      </label>
      <motion.div
        animate={glitch ? { x: [-2, 2, -2, 0], filter: ['invert(1)', 'invert(0)'] } : {}}
        whileHover={{ skewX: -2, scale: 1.01 }}
        className="relative overflow-hidden"
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-horror-grey border-b border-horror-red/30 p-4 outline-none text-white focus:border-horror-red transition-colors placeholder:text-white/10 ${glitch ? 'font-mono tracking-tighter' : ''}`}
        />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-horror-red transition-all duration-500 group-hover:w-full"></div>
      </motion.div>
    </div>
  );
};

export default DistortedInput;
