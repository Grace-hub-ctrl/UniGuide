
import React, { useState } from 'react';
import { analyzeEssay } from '../services/geminiService';

const EssayHelper: React.FC = () => {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (essay.length < 100) {
      alert("Please paste a longer essay (min 100 chars).");
      return;
    }
    setLoading(true);
    try {
      const result = await analyzeEssay(essay);
      setFeedback(result || "No feedback received.");
    } catch (error) {
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-slate-800">Your Draft</h3>
          <span className="text-sm text-slate-400 font-medium">{essay.split(/\s+/).filter(x => x).length} words</span>
        </div>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Paste your Common App essay or supplemental draft here..."
          className="w-full h-[600px] p-8 bg-white rounded-3xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 shadow-sm transition-all outline-none resize-none text-slate-700 leading-relaxed font-serif text-lg"
        ></textarea>
        <button
          onClick={handleAnalyze}
          disabled={loading || essay.length < 100}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <><i className="fa-solid fa-brain fa-spin"></i> <span>AI is thinking...</span></>
          ) : (
            <><i className="fa-solid fa-sparkles"></i> <span>Get AI Feedback</span></>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800">Reviewer's Feedback</h3>
        {feedback ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-[600px] overflow-y-auto shadow-sm prose prose-indigo max-w-none">
            <div className="flex items-center space-x-2 text-indigo-600 mb-6 sticky top-0 bg-white pb-4">
              <i className="fa-solid fa-comment-dots"></i>
              <span className="font-bold uppercase tracking-wider text-xs">Admissions Consultant Analysis</span>
            </div>
            <div className="text-slate-700 whitespace-pre-wrap leading-loose italic">
              {feedback}
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-[600px] flex flex-col items-center justify-center text-center p-12 text-slate-400">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <i className="fa-solid fa-pen-fancy text-3xl"></i>
            </div>
            <p className="font-bold text-slate-500 mb-2">No Draft Analyzed Yet</p>
            <p className="text-sm">Paste your essay on the left and click "Get AI Feedback" to receive deep insights from Gemini 3 Pro.</p>
          </div>
        )}
        <div className="bg-amber-50 rounded-2xl p-4 flex items-start space-x-3 text-amber-800">
          <i className="fa-solid fa-circle-info mt-1"></i>
          <p className="text-xs leading-relaxed">
            <strong>Note:</strong> This tool uses generative AI to provide feedback. Use it for inspiration and guidance, but ensure your voice remains authentically yours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EssayHelper;
