
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { GroundingChunk, Scholarship } from '../types';

const ScholarshipFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string, sources: GroundingChunk[] } | null>(null);

  const popularScholarships: Scholarship[] = [
    { id: 'p1', name: 'Rhodes Scholarship', amount: 'Full Funding', deadline: 'Oct 2024', provider: 'Rhodes Trust', link: 'https://www.rhodeshouse.ox.ac.uk/', description: 'The oldest and perhaps most prestigious international scholarship program in the world, enabling outstanding young people from around the world to study at the University of Oxford.' },
    { id: 'p2', name: 'Fulbright Program', amount: 'Varies (Full)', deadline: 'Oct 2024', provider: 'U.S. Dept of State', link: 'https://us.fulbrightonline.org/', description: 'A flagship international educational exchange program sponsored by the U.S. government.' },
    { id: 'p3', name: 'National Merit Scholarship', amount: '$2,500+', deadline: 'Oct 2024', provider: 'NMSC', link: 'https://www.nationalmerit.org/', description: 'Academic competition for recognition and scholarships that began in 1955.' },
    { id: 'p4', name: 'Jack Kent Cooke Scholarship', amount: 'Up to $55,000/yr', deadline: 'Nov 2024', provider: 'JKC Foundation', link: 'https://www.jkcf.org/', description: 'Supports high-achieving high school seniors with financial need.' },
    { id: 'p5', name: 'Elks Most Valuable Student', amount: 'Up to $50,000', deadline: 'Nov 2024', provider: 'Elks National Foundation', link: 'https://www.elks.org/scholars/', description: 'Awards 500 four-year scholarships based on academic record, leadership, and financial need.' }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await getGeminiResponse(`Find the latest scholarships for: ${query}. Include amount, eligibility, and deadline.`);
      setResults(response);
    } catch (error) {
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center space-y-4">
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Smart Scholarship Discovery</h3>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Use our AI engine to find funding tailored to your unique profile or explore world-renowned opportunities below.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for? (e.g., Medical scholarships for first-gen students)"
          className="w-full pl-14 pr-32 py-6 bg-white rounded-3xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 shadow-lg shadow-indigo-100/20 transition-all text-xl outline-none text-black"
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
        >
          {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Search AI'}
        </button>
      </form>

      {results ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl animate-in zoom-in-95 duration-300">
          <div className="p-8">
            <div className="flex items-center space-x-2 text-indigo-600 mb-6 bg-indigo-50 w-fit px-4 py-1.5 rounded-full">
              <i className="fa-solid fa-robot text-sm"></i>
              <span className="font-bold uppercase tracking-wider text-xs">AI Personalized Matches</span>
            </div>
            <div className="prose prose-slate max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed text-lg">
              {results.text}
            </div>
          </div>
          
          {results.sources.length > 0 && (
            <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest">Official Sources</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.web?.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all group"
                  >
                    <div className="truncate pr-4">
                      <p className="text-sm font-bold text-slate-900 truncate">{source.web?.title || 'Scholarship Source'}</p>
                      <p className="text-xs text-slate-500 truncate">{source.web?.uri}</p>
                    </div>
                    <i className="fa-solid fa-external-link text-slate-300 group-hover:text-indigo-600 text-xs"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold text-slate-900">Top 5 Global Scholarships</h4>
            <div className="h-1 flex-1 mx-6 bg-slate-100 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularScholarships.map(s => (
              <div key={s.id} className="bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">
                    {s.amount}
                  </div>
                  <i className="fa-solid fa-star text-slate-200 group-hover:text-amber-400 transition-colors"></i>
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-2">{s.name}</h5>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{s.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs font-bold text-slate-400">
                    <i className="fa-regular fa-calendar-days mr-1"></i> {s.deadline}
                  </span>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold text-sm hover:underline">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ScholarshipFinder;
