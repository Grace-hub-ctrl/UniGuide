
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  openChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, openChat }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
    { id: 'scholarships', icon: 'fa-graduation-cap', label: 'Scholarships' },
    { id: 'colleges', icon: 'fa-university', label: 'College Lab' },
    { id: 'essay', icon: 'fa-pen-nib', label: 'Essay Coach' },
    { id: 'opportunities', icon: 'fa-briefcase', label: 'Summer Ops' },
  ];

  return (
    <aside className="w-72 gradient-bg text-white flex flex-col hidden md:flex shrink-0 border-r border-white/5 relative z-40 shadow-2xl">
      <div className="p-10">
        <div className="flex items-center space-x-4 mb-14">
          <div className="bg-white rounded-2xl p-3 shadow-xl shadow-indigo-800/20 group">
            <i className="fa-solid fa-rocket text-indigo-600 text-2xl group-hover:scale-110 transition-transform"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">UniGuide</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-1">Intelligence</p>
          </div>
        </div>
        
        <nav className="space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                currentView === item.id 
                  ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-900/20 font-black' 
                  : 'hover:bg-white/10 font-bold opacity-70 hover:opacity-100'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg transition-transform group-hover:scale-110`}></i>
              <span className="tracking-tight">{item.label}</span>
              {currentView === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-400"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-10 pb-12">
        <div className="bg-white/10 rounded-3xl p-6 text-sm border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <p className="font-black text-xs uppercase tracking-widest opacity-80">Online Support</p>
          </div>
          <p className="font-bold mb-5 leading-relaxed">Ask your AI counselor about anything 24/7.</p>
          <button 
            onClick={openChat}
            className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Chat Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
