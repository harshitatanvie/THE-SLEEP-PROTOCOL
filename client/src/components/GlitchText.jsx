import React from 'react';

const GlitchText = ({ text, className = "" }) => {
  return (
    <div className={`glitch font-bold tracking-widest ${className}`} data-text={text}>
      {text}
    </div>
  );
};

export default GlitchText;
