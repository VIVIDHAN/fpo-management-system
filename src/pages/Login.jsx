import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf } from 'lucide-react';

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
    <div className="d-flex justify-center align-center h-full min-h-screen">
      <div className="w-full max-w-md px-4 animate-fade-in-up">
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <div className="d-flex justify-center align-center mb-3">
              <div className="p-3 bg-primary-light text-primary rounded-full shadow-glow">
                <Leaf size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold">FPO Portal Login</h1>
            <p className="text-muted mt-2">Access your cooperative management system</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 mb-4 bg-danger-light text-danger rounded-md text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email or Member ID</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. admin@fpo.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            <p>Don't have an account? <span className="text-primary cursor-pointer font-medium" onClick={() => navigate('/register')}>Register here</span></p>
            <div className="mt-4 pt-4 border-t" style={{borderTop: '1px solid var(--border-color)'}}>
              <p className="text-xs">Mock Accounts (Password: Password@123)</p>
              <p className="text-xs">admin@fpo.com | manager@fpo.com | member@fpo.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
