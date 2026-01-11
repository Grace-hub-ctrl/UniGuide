
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { GroundingChunk } from '../types';

const Opportunities: React.FC = () => {
  const [type, setType] = useState<'internship' | 'camp' | 'research'>('internship');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string, sources: GroundingChunk[] } | null>(null);

  const premierOpps = [
    { name: 'NASA Internship Programs', type: 'Internship', target: 'HS/College', link: 'https://intern.nasa.gov/' },
    { name: 'MIT Research Science Institute (RSI)', type: 'Research', target: 'Rising Seniors', link: 'https://www.cee.org/programs/research-science-institute' },
    { name: 'Google STEP Internship', type: 'Internship', target: 'Freshmen/Sophomores', link: 'https://buildyourfuture.withgoogle.com/programs/step' },
    { name: 'Bank of America Student Leaders', type: 'Leadership', target: 'HS Juniors/Seniors', link: 'https://about.bankofamerica.com/en/making-an-impact/student-leaders' },
    { name: 'Stanford Pre-Collegiate Summer', type: 'Academic Camp', target: 'Grades 8-12', link: 'https://spcs.stanford.edu/programs' }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `Find high school student ${type} opportunities in or near ${location || 'the United States'}. Include details on what they are, dates, and how to apply. Use search grounding for real-time accuracy and highlight prestige.`;
      const response = await getGeminiResponse(prompt);
      setResults(response);
    } catch (error) {
      alert("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-indigo-100/30 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-40"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-slate-900 mb-2 text-center">Elite Summer Experiences</h3>
          <p className="text-slate-500 text-center mb-10">Secure your competitive edge with world-renowned internships and academic programs.</p>
          
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-3 ml-2">Experience Category</label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all appearance-none text-black font-semibold"
                  >
                    <option value="internship">💼 Corporate Internships</option>
                    <option value="camp">⛺ Prestigious Summer Camps</option>
                    <option value="research">🔬 Scientific Research</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-3 ml-2">Preferred Location</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State or 'Online'"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black font-semibold placeholder:text-slate-300"
                  />
                  <i className="fa-solid fa-location-dot absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                </div>
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]"
            >
              {loading ? <i className="fa-solid fa-satellite-dish fa-spin mr-3"></i> : null}
              {loading ? 'Scanning Global Database...' : 'Find Top Opportunities'}
            </button>
          </form>
        </div>
      </div>

      {results ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-500">
          <div className="p-10">
            <div className="flex items-center space-x-3 mb-6">
               <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <i className="fa-solid fa-check"></i>
               </div>
               <h4 className="font-black text-slate-900 text-2xl tracking-tight">Curated Selection</h4>
            </div>
            <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed text-lg font-medium">
              {results.text}
            </div>
          </div>
          {results.sources.length > 0 && (
            <div className="bg-slate-50 px-10 py-8 border-t border-slate-100">
              <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">Priority Application Portals</p>
              <div className="flex flex-wrap gap-4">
                {results.sources.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.web?.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-indigo-600 hover:border-indigo-500 hover:shadow-lg transition-all"
                  >
                    <span>{s.web?.title || 'Apply Now'}</span>
                    <i className="fa-solid fa-arrow-right-long text-xs opacity-50"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
           <div className="flex items-center space-x-4">
            <h4 className="text-2xl font-black text-slate-900">Premier Summer Opportunities</h4>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premierOpps.map((opp, idx) => (
              <a 
                key={idx} 
                href={opp.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{opp.type}</span>
                    <i className="fa-solid fa-medal text-amber-400 opacity-20 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <h5 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-tight">{opp.name}</h5>
                  <p className="text-slate-400 text-sm font-medium">Target: {opp.target}</p>
                </div>
                <div className="mt-8 flex items-center text-indigo-600 font-black text-xs uppercase tracking-widest">
                  View Program <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
