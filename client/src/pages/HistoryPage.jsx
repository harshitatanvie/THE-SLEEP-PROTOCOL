import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';

const HistoryPage = () => {
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        
      const API = import.meta.env.VITE_API_URL;

      const response = await axios.get(`${API}/api/nightmare/history`);
        setDreams(response.data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-horror-black p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <GlitchText text="ARCHIVED TRAUMAS" className="text-4xl text-white" />
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] uppercase tracking-widest text-horror-red hover:underline"
          >
            Return to Void
          </button>
        </div>

        <div className="grid gap-6">
          {dreams.map((dream, i) => (
            <motion.div 
              key={dream._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-horror-grey/50 border-l-2 border-horror-red p-6 hover:bg-horror-grey transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-horror-red text-xs uppercase tracking-tighter mb-1">Fear Pattern</h3>
                  <p className="text-white text-sm font-bold uppercase">{dream.fear}</p>
                </div>
                <span className="text-[10px] text-white/20 font-mono">
                  {new Date(dream.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-white/60 text-xs line-clamp-2 group-hover:line-clamp-none transition-all duration-500 italic">
                "{dream.generatedStory}"
              </p>
            </motion.div>
          ))}

          {dreams.length === 0 && (
            <p className="text-white/20 text-center font-mono italic">No echoes found in the archive...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
