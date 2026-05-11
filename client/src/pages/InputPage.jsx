import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DistortedInput from '../components/DistortedInput';
import GlitchText from '../components/GlitchText';

const InputPage = () => {
  const [formData, setFormData] = useState({ fear: '', memory: '', thought: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API}/api/nightmare/history`);
      navigate('/nightmare', { state: { dream: response.data } });
    } catch (error) {
      console.error('Submission failed', error);
      alert('The void refused your input. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-horror-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-horror-vhs/40 backdrop-blur-sm p-10 border border-white/5 relative"
      >
        <GlitchText text="PROVIDE ESSENCE" className="text-3xl mb-8 text-horror-red" />
        
        <form onSubmit={handleSubmit}>
          <DistortedInput 
            label="Primary Phobia" 
            placeholder="What crawls under your skin?"
            value={formData.fear}
            onChange={(e) => setFormData({...formData, fear: e.target.value})}
          />
          <DistortedInput 
            label="Forgotten Memory" 
            placeholder="A place you should never have left"
            value={formData.memory}
            onChange={(e) => setFormData({...formData, memory: e.target.value})}
          />
          <DistortedInput 
            label="Invasive Thought" 
            placeholder="The whisper you can't silence"
            value={formData.thought}
            onChange={(e) => setFormData({...formData, thought: e.target.value})}
          />

          <button 
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-4 uppercase tracking-[0.3em] text-sm border border-horror-red/50 hover:bg-horror-red hover:text-white transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'WEAVING NIGHTMARE...' : 'SUBMIT TO VOID'}
          </button>
        </form>

        {loading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
            <div className="w-12 h-12 border-2 border-horror-red border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-horror-red text-[10px] animate-pulse">EXTRACTING CONSCIOUSNESS...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InputPage;
