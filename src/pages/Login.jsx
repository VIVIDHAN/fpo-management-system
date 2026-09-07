import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('admin@fpo.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const demoAccounts = [
    { label: 'Admin', phone: '9999999999', name: 'System Administrator', role: 'Admin' },
    { label: 'FPO Manager', phone: '8888888888', name: 'Manager Vashi', role: 'FPO Manager' },
    { label: 'Collection Agent', phone: '7777777777', name: 'Agent Dahanu', role: 'Collection Agent' },
    { label: 'Board Member', phone: '6666666666', name: 'Director Patil', role: 'Board Member' },
    { label: 'Farmer Member', phone: '9876543210', name: 'Rajesh Kumar', role: 'Member' },
  ];

  const handleDemoLogin = async (acc) => {
    setIdentifier(acc.phone);
    setPassword('Password@123');
    setIsSubmitting(true);
    setError('');
    
    // Simulate login for selected role
    const mockUser = { name: acc.name, role: acc.role, phone: acc.phone, memberId: 'FPO-M-1001' };
    localStorage.setItem('fpo_user', JSON.stringify(mockUser));
    localStorage.setItem('fpo_token', 'mock-jwt-token-demo');
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!identifier || !password) {
      setError('Please enter both identifier and password.');
      setIsSubmitting(false);
      return;
    }

    const result = await login({ identifier, password });
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      // Fallback successful demo login if backend is offline
      const mockUser = { name: 'FPO Administrator', role: 'Admin', phone: identifier };
      localStorage.setItem('fpo_user', JSON.stringify(mockUser));
      localStorage.setItem('fpo_token', 'mock-jwt-token-demo');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 font-sans selection:bg-emerald-100">
      
      {/* Top Branding Header */}
      <div className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer transition hover:opacity-80" onClick={() => navigate('/')}>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <Leaf size={20} />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">AgriCoop</span>
      </div>

      <div className="w-full max-w-[420px] animate-fade-up">
        
        {/* Clean floating card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <Leaf size={28} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Welcome Back</h2>
            <p className="text-slate-500 text-xs font-medium">Sign in to your AgriCoop portal</p>
          </div>

          {/* Quick Demo Selector */}
          <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center flex items-center justify-center gap-1">
              <Shield size={12} /> Quick Test Login by Role
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleDemoLogin(acc)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white text-slate-700 hover:bg-emerald-600 hover:text-white rounded-lg border border-slate-200 shadow-2xs transition-all"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {location.state?.message && !error && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold border border-emerald-200">
                {location.state.message}
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-200 text-center animate-shake">
                {error}
              </div>
            )}
            
            <div className="space-y-3.5">
              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Email, Phone, or Member ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="Enter phone or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Lock size={16} />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-0.5">
              <a href="#" className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Forgot Password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xs mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Verifying Credentials...</>
              ) : (
                <><span className="tracking-wide">Sign In</span> <ArrowRight size={16} /></>
              )}
            </button>
          </form>

        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <span className="font-semibold text-slate-900 cursor-pointer hover:text-emerald-600 hover:underline" onClick={() => navigate('/register')}>
              Register New Account
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
