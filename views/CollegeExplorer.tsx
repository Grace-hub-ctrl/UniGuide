
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { GroundingChunk } from '../types';

const CollegeExplorer: React.FC = () => {
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ text: string, sources: GroundingChunk[] } | null>(null);

  const topColleges = [
    { name: 'Massachusetts Institute of Technology (MIT)', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400&h=250&auto=format&fit=crop', stats: 'acceptance: 4%', location: 'Cambridge, MA' },
    { name: 'Stanford University', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=400&h=250&auto=format&fit=crop', stats: 'acceptance: 3.9%', location: 'Stanford, CA' },
    { name: 'Harvard University', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&h=250&auto=format&fit=crop', stats: 'acceptance: 3.2%', location: 'Cambridge, MA' },
    { name: 'University of Cambridge', img: 'https://images.unsplash.com/photo-1512411513222-263721344440?q=80&w=400&h=250&auto=format&fit=crop', stats: 'acceptance: 21%', location: 'Cambridge, UK' },
    { name: 'Princeton University', img: 'https://images.unsplash.com/photo-1582211516243-77626388904f?q=80&w=400&h=250&auto=format&fit=crop', stats: 'acceptance: 5.8%', location: 'Princeton, NJ' }
  ];

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim()) return;

    setLoading(true);
    try {
      const prompt = `Provide a comprehensive overview of ${collegeName}. Include key facts like location, ranking, average SAT/ACT scores, top majors, student life, and application deadlines. Focus on why a student might want to go here.`;
      const response = await getGeminiResponse(prompt);
      setData(response);
    } catch (error) {
      alert("Research failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center">
        <h3 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">World-Class College Insights</h3>
        <p className="text-slate-500 text-lg">Detailed research powered by live data for your future academic home.</p>
      </div>

      <form onSubmit={handleResearch} className="flex gap-4 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            placeholder="Search for any institution..."
            className="w-full px-6 py-5 bg-white rounded-3xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 shadow-lg shadow-indigo-100/10 transition-all outline-none text-black text-lg"
          />
          <i className="fa-solid fa-university absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-indigo-200"
        >
          {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
          Explore Now
        </button>
      </form>

      {data ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl animate-in fade-in duration-500">
          <div className="p-10">
             <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h4 className="font-extrabold text-slate-900 text-2xl">Academic Profile</h4>
              </div>
              <button onClick={() => setData(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">
                <i className="fa-solid fa-times mr-1"></i> Clear
              </button>
            </div>
            <div className="prose prose-slate max-w-none text-slate-800 whitespace-pre-wrap leading-loose text-lg font-medium">
              {data.text}
            </div>
          </div>
          
          {data.sources.length > 0 && (
            <div className="bg-slate-50 p-10 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Validated Research Links</h4>
              <div className="flex flex-wrap gap-4">
                {data.sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.web?.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all font-bold shadow-sm"
                  >
                    <i className="fa-solid fa-book-open mr-2 opacity-50"></i>
                    {s.web?.title || 'Institution Portal'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <h4 className="text-2xl font-bold text-slate-900">Featured Universities</h4>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {topColleges.map((c, i) => (
              <div 
                key={i} 
                onClick={() => setCollegeName(c.name)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-32 bg-slate-200 overflow-hidden relative">
                  <img src={c.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={c.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-widest">{c.location}</div>
                </div>
                <div className="p-5">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{c.name}</h5>
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Rank #1-10</span>
                    <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{c.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeExplorer;
