import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [identifier, setIdentifier] = useState('admin@fpo.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

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
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 font-sans selection:bg-green-100">
      
      {/* Top Branding (Optional, usually Apple centers everything in the card) */}
      <div className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer transition hover:opacity-70" onClick={() => navigate('/')}>
        <Leaf size={24} className="text-green-600" />
        <span className="text-xl font-semibold tracking-tight text-gray-900">AgriCoop</span>
      </div>

      <div className="w-full max-w-[400px] animate-fade-up">
        
        {/* Apple-style floating card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Leaf size={32} />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your AgriCoop account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {location.state?.message && !error && (
              <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">
                {location.state.message}
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center animate-shake">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {/* Input Group 1 */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                  placeholder="Email or Member ID"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              
              {/* Input Group 2 */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-1">
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">Forgot Password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-black text-white font-medium rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> Verifying...</>
              ) : (
                <><span className="tracking-wide">Continue</span> <ArrowRight size={18} /></>
              )}
            </button>
          </form>

        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <span className="font-semibold text-gray-900 cursor-pointer hover:underline" onClick={() => navigate('/register')}>
              Request Access
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
