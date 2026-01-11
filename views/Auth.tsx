
import React, { useState } from 'react';

interface AuthProps {
  onAuthenticate: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthenticate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate();
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-bg overflow-hidden relative">
      {/* Background blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden z-10 animate-in zoom-in-95 duration-700">
        
        {/* Left Side: Branding/Visual */}
        <div className="hidden md:flex md:w-1/2 gradient-bg p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-white rounded-2xl p-3 shadow-2xl">
                <i className="fa-solid fa-rocket text-indigo-600 text-3xl"></i>
              </div>
              <h1 className="text-3xl font-black tracking-tight">UniGuide</h1>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6">Your future starts with one smart application.</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">Join thousands of students using Gemini-powered intelligence to secure scholarships and get into their dream universities.</p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-white bg-indigo-400 flex items-center justify-center text-[10px] font-black">
                +1k
              </div>
            </div>
            <p className="text-sm font-bold text-white/80">Trusted by students worldwide</p>
          </div>
          
          {/* Abstract design elements */}
          <i className="fa-solid fa-graduation-cap absolute right-[-50px] bottom-[-50px] text-white/5 text-[300px] rotate-[-20deg]"></i>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-slate-500 font-medium">Please enter your details to {isLogin ? 'sign in' : 'register'}.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-black font-semibold"
                  />
                  <i className="fa-solid fa-user absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hello@university.edu"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-black font-semibold"
                />
                <i className="fa-solid fa-envelope absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase transition-colors">Forgot Password?</button>}
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-black font-semibold"
                />
                <i className="fa-solid fa-lock absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> : null}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="my-10 flex items-center">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center space-x-3 px-6 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="h-5 w-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-3 px-6 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 active:scale-[0.98]">
              <i className="fa-brands fa-apple text-xl"></i>
              <span>Apple</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-bold text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:underline"
            >
              {isLogin ? 'Sign up for free' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
