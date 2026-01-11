
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ScholarshipFinder from './views/ScholarshipFinder';
import CollegeExplorer from './views/CollegeExplorer';
import EssayHelper from './views/EssayHelper';
import Opportunities from './views/Opportunities';
import Auth from './views/Auth';
import { AppView, Message } from './types';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your ScholarPath AI counselor. How can I help you today with your college application journey?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: Message = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await getGeminiResponse(chatInput, chatMessages);
      const assistantMsg: Message = { role: 'assistant', content: response.text, sources: response.sources };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setView={setCurrentView} />;
      case 'scholarships': return <ScholarshipFinder />;
      case 'colleges': return <CollegeExplorer />;
      case 'essay': return <EssayHelper />;
      case 'opportunities': return <Opportunities />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        openChat={() => setIsChatOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
              {currentView === 'essay' ? 'Admissions Coach' : currentView.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 pl-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all group"
              >
                <span className="text-sm font-black text-slate-900">Student Profile</span>
                <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
                  S
                </div>
              </button>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                   <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-50">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-black">S</div>
                      <div>
                        <p className="font-black text-slate-900">Alex Student</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Premium Student</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <button className="w-full flex items-center space-x-3 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors">
                        <i className="fa-solid fa-user-gear w-5"></i>
                        <span>Account Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors">
                        <i className="fa-solid fa-chart-line w-5"></i>
                        <span>Application Progress</span>
                      </button>
                      <button 
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full flex items-center space-x-3 text-rose-500 hover:text-rose-600 font-bold text-sm pt-4 border-t border-slate-50 transition-colors"
                      >
                        <i className="fa-solid fa-right-from-bracket w-5"></i>
                        <span>Sign Out</span>
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {renderView()}
        </div>
      </main>

      {/* Chat Counselor Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-8 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg h-full max-h-[800px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-500">
            <div className="bg-indigo-600 p-8 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <i className="fa-solid fa-robot text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-xl tracking-tight">AI Counselor</h4>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Active Insight</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="h-10 w-10 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.content}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Sources</p>
                        <div className="space-y-1">
                          {msg.sources.map((s, si) => (
                            <a key={si} href={s.web?.uri} target="_blank" className="block text-[10px] hover:underline truncate opacity-70">
                              {s.web?.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gemini is thinking</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask your counselor anything..."
                  className="w-full pl-6 pr-16 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none transition-all text-black font-semibold"
                />
                <button 
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="absolute right-2 top-2 h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-30 transition-all shadow-lg shadow-indigo-100"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
