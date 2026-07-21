import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [identifier, setIdentifier] = useState('admin@fpo.com');
  const [password, setPassword] = useState('Password@123');
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
    <div className="d-flex min-h-screen">
      {/* Left Illustration Side - Hidden on small screens */}
      <div className="hidden md:d-flex flex-column justify-center flex-1 p-12 relative overflow-hidden bg-auth">
        <div className="absolute" style={{ top: '40px', left: '40px' }}>
          <div className="d-flex align-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Leaf size={32} className="text-primary" />
            <span className="text-2xl font-bold">AgriCoop</span>
          </div>
        </div>
        
        <div className="z-10 max-w-lg mx-auto animate-fade-up">
          <h1 className="text-heading mb-6">Manage your cooperative seamlessly.</h1>
          <p className="text-subheading mb-8">Access the modern dashboard to oversee farmers, procurement, warehousing, and analytics all in one place.</p>
          
          <div className="d-flex gap-4">
            <div className="d-flex align-center gap-2">
              <div className="p-2 bg-white rounded-full shadow-sm text-primary"><Check size={20} /></div>
              <span className="font-medium">Secure Access</span>
            </div>
            <div className="d-flex align-center gap-2">
              <div className="p-2 bg-white rounded-full shadow-sm text-primary"><Check size={20} /></div>
              <span className="font-medium">Real-time Data</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background circles */}
        <div className="absolute rounded-full bg-primary" style={{ opacity: 0.05, width: '600px', height: '600px', bottom: '-100px', left: '-100px' }}></div>
        <div className="absolute rounded-full" style={{ background: 'var(--secondary)', opacity: 0.03, width: '400px', height: '400px', top: '-50px', right: '-50px' }}></div>
      </div>

      {/* Right Login Form Side */}
      <div className="flex-1 d-flex justify-center align-center p-8 bg-main">
        <div className="w-full animate-fade-up" style={{ maxWidth: '450px' }}>
          
          <div className="md:hidden d-flex justify-center mb-8">
             <Leaf size={40} className="text-primary" />
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-muted">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email or Member ID</label>
              <div className="input-with-icon">
                <Mail size={20} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. admin@fpo.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group mb-8">
              <div className="d-flex justify-between align-center mb-2">
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" className="text-small text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <div className="input-with-icon">
                <Lock size={20} />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-large w-full justify-center" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Sign In'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center text-small text-muted">
            <p>Don't have an account? <span className="text-primary cursor-pointer font-medium hover:underline" onClick={() => navigate('/register')}>Request Access</span></p>
            
            <div className="mt-8 pt-6 border-t border-color text-xs">
              <p className="font-medium text-main mb-2">Test Accounts (Password: Password@123)</p>
              <p>Admin: <span className="text-primary">admin@fpo.com</span></p>
              <p>Manager: <span className="text-primary">manager@fpo.com</span></p>
              <p>Member: <span className="text-primary">member@fpo.com</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Quick helper for the Check icon used above
const Check = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Login;
