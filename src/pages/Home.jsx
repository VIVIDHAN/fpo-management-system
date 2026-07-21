import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, ArrowRight, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="p-4 glass-panel sticky top-0 z-50 mx-4 mt-4" style={{ zIndex: 50, position: 'sticky' }}>
        <div className="container d-flex justify-between align-center">
          <div className="d-flex align-center gap-2">
            <div className="p-2 bg-primary-light text-primary rounded-md">
              <Sprout size={24} />
            </div>
            <h1 className="text-xl font-bold text-primary">AgriCoop FPO</h1>
          </div>
          <div className="d-flex gap-2">
            {user ? (
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5 mt-8 text-center animate-fade-in-up">
        <div className="inline-block p-3 bg-primary-light text-primary rounded-full mb-6">
          <span className="font-medium px-4">Empowering Farmer Producer Organisations</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ lineHeight: 1.2 }}>
          Modernize Your <br/>
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Agricultural Cooperative
          </span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          A comprehensive digital platform to manage members, collective procurement, warehousing, sales, and analytics with role-based security.
        </p>
        <div className="d-flex justify-center gap-4">
          <button className="btn btn-primary px-8 py-3" onClick={handleCTA}>
            {user ? 'Enter Portal' : 'Get Started'} <ArrowRight size={20} />
          </button>
          {!user && (
            <button className="btn btn-secondary px-8 py-3" onClick={() => navigate('/register')}>
              Join as Farmer
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card text-center p-8 animate-fade-in-up delay-100">
            <div className="d-flex justify-center mb-4">
              <div className="p-4 bg-primary-light text-primary rounded-full shadow-glow">
                <Users size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Member Management</h3>
            <p className="text-muted">Digitally onboard farmers, track land holding, manage share capital and dividends with ease.</p>
          </div>

          <div className="glass-card text-center p-8 animate-fade-in-up delay-200">
            <div className="d-flex justify-center mb-4">
              <div className="p-4 bg-secondary-light text-secondary rounded-full shadow-glow">
                <TrendingUp size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Market Linkage</h3>
            <p className="text-muted">Aggregate produce, track grades, and sell seamlessly to APMC, e-NAM, and private buyers.</p>
          </div>

          <div className="glass-card text-center p-8 animate-fade-in-up delay-300">
            <div className="d-flex justify-center mb-4">
              <div className="p-4 bg-accent-light text-accent rounded-full shadow-glow">
                <ShieldCheck size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Compliant</h3>
            <p className="text-muted">Role-Based Access Control, JWT security, and compliance reporting tailored for FPOs.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="glass-panel p-6 mt-8 text-center">
        <div className="container">
          <p className="text-muted font-medium">© {new Date().getFullYear()} Agricultural Cooperative and Farmer Producer Organisation Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
