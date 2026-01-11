
import React from 'react';
import { AppView, Scholarship } from '../types';

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const featuredScholarships: Scholarship[] = [
    {
      id: '1',
      name: 'Coca-Cola Scholars Program',
      amount: '$20,000',
      deadline: 'Oct 31, 2024',
      provider: 'Coca-Cola Foundation',
      link: 'https://www.coca-colascholarsfoundation.org/',
      description: 'Achievement-based scholarship awarded to graduating high school seniors.'
    },
    {
      id: '2',
      name: 'The Gates Scholarship',
      amount: 'Full Cost of Attendance',
      deadline: 'Sept 15, 2024',
      provider: 'Bill & Melinda Gates Foundation',
      link: 'https://www.thegatesscholarship.org/',
      description: 'Selective scholarship for outstanding minority high school seniors.'
    },
    {
      id: '3',
      name: 'Equitable Excellence Scholarship',
      amount: 'Up to $25,000',
      deadline: 'Dec 18, 2024',
      provider: 'Equitable Foundation',
      link: 'https://equitable.com/foundation/equitable-excellence-scholarship',
      description: 'Supports students who demonstrate courage, strength and wisdom.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <i className="fa-solid fa-calendar-check text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Next Deadline</p>
            <p className="text-lg font-bold text-slate-800">Sept 15 (Gates)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <i className="fa-solid fa-dollar-sign text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Potential Aid</p>
            <p className="text-lg font-bold text-slate-800">$145,000+</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <i className="fa-solid fa-school text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Colleges Tracked</p>
            <p className="text-lg font-bold text-slate-800">8 Institutions</p>
          </div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Most Popular Scholarships</h3>
          <button onClick={() => setView('scholarships')} className="text-indigo-600 font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredScholarships.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase">
                    {s.amount}
                  </span>
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <i className="fa-regular fa-bookmark"></i>
                  </button>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{s.name}</h4>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{s.description}</p>
                <div className="flex items-center text-xs text-slate-400 font-medium space-x-3">
                  <span><i className="fa-regular fa-calendar mr-1"></i> {s.deadline}</span>
                  <span><i className="fa-solid fa-building mr-1"></i> {s.provider}</span>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
                  Apply Now <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-3">AI College Advisor</h3>
          <p className="text-indigo-100 mb-6">Ask anything about admissions, SAT/ACT prep, financial aid, or essay brainstorming. Powered by Gemini 3.</p>
          <div className="flex space-x-3">
            <button onClick={() => setView('colleges')} className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Find My Dream College
            </button>
            <button onClick={() => setView('essay')} className="bg-indigo-500 text-white border border-indigo-400 px-6 py-2 rounded-xl font-bold hover:bg-indigo-400 transition-colors">
              Review My Essay
            </button>
          </div>
        </div>
        <i className="fa-solid fa-robot absolute right-[-20px] bottom-[-20px] text-white opacity-10 text-[200px] rotate-[-15deg]"></i>
      </section>
    </div>
  );
};

export default Dashboard;
