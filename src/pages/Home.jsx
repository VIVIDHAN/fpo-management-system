import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, ArrowRight, ShieldCheck, Users, TrendingUp, Smartphone, Database, Bell } from 'lucide-react';
import heroMockup from '../assets/hero.png';
import './Home.css'; // Import Semantic CSS

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
    <div className="bg-main overflow-hidden">
      
      {/* SaaS Navigation Bar */}
      <nav className="navbar">
        <div className="container py-4 d-flex justify-between align-center">
          <div className="d-flex align-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Leaf size={24} />
            </div>
            <h1 className="text-xl font-bold text-main">AgriCoop</h1>
          </div>
          
          <div className="nav-links">
            <a href="#features">Solutions</a>
            <a href="#features">Features</a>
            <a href="#">Resources</a>
            <a href="#">Pricing</a>
          </div>

          <div className="nav-actions">
            {user ? (
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                Dashboard <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button className="btn text-main font-medium hidden sm:d-flex hover:text-primary" onClick={() => navigate('/login')}>Sign In</button>
                <button className="btn btn-primary" onClick={() => navigate('/register')}>Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Subtle mesh background */}
        <div className="absolute top-0 w-full h-full" style={{ zIndex: -1, background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0) 70%)' }}></div>
        
        <div className="container hero-grid">
          
          <div className="animate-fade-up">
            <div className="inline-flex align-center gap-2 px-3 py-1.5 rounded-full border border-color bg-white shadow-sm mb-6 text-sm font-medium text-primary">
              <span className="relative d-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AgriCoop 2.0 is now live
            </div>
            
            <h1 className="text-heading mb-6">
              Digitally Transform Your <br/>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Farmer Producer Organization
              </span>
            </h1>
            
            <p className="text-subheading mb-8 max-w-xl">
              Manage members, finance, warehouse, procurement, sales, and analytics from one unified, enterprise-grade platform.
            </p>
            
            <div className="d-flex flex-wrap gap-4 mb-10">
              <button className="btn btn-primary btn-large" onClick={handleCTA}>
                Request Demo
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}>
                Explore Features
              </button>
            </div>
            
            {/* Mini Trust Stats in Hero */}
            <div className="d-flex align-center gap-6 pt-6 border-t border-color">
              <div>
                <p className="text-2xl font-bold text-main">10,000+</p>
                <p className="text-sm text-muted">Active Farmers</p>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
              <div>
                <p className="text-2xl font-bold text-main">₹25 Cr</p>
                <p className="text-sm text-muted">Transactions</p>
              </div>
            </div>
          </div>

          {/* Right Side Illustration / Mockup */}
          <div className="relative animate-fade-up delay-200">
            <div className="hero-mockup">
              {/* Mock Dashboard UI */}
              <div className="mock-toolbar">
                <div className="mock-dot mock-red"></div>
                <div className="mock-dot mock-yellow"></div>
                <div className="mock-dot mock-green"></div>
              </div>
              <div className="mock-content">
                <div className="flex-column gap-4">
                  <div className="mock-block" style={{ height: '80px' }}></div>
                  <div className="mock-block" style={{ height: '80px' }}></div>
                  <div className="mock-block" style={{ height: '160px' }}></div>
                </div>
                <div className="flex-column gap-4">
                  <div className="mock-block-primary" style={{ height: '100px' }}></div>
                  <div className="mock-block" style={{ height: '220px' }}></div>
                </div>
              </div>
              {/* Fallback image cover */}
              <img src="/hero.png" onError={(e) => e.target.style.display = 'none'} className="absolute top-0 left-0 w-full h-full object-cover" alt="Dashboard Preview" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" style={{ zIndex: -1 }}></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" style={{ zIndex: -1 }}></div>
          </div>
          
        </div>
      </div>

      {/* Trusted By Logos */}
      <div className="trusted-section">
        <div className="container text-center">
          <p className="text-sm font-medium text-muted uppercase tracking-widest mb-6">Trusted by leading agricultural cooperatives</p>
          <div className="trusted-logos">
             <h3 className="text-xl font-bold font-serif">AgriCorp</h3>
             <h3 className="text-xl font-bold font-sans">KisanMandi</h3>
             <h3 className="text-xl font-bold">MahaFPO</h3>
             <h3 className="text-xl font-bold italic">GreenProduce</h3>
             <h3 className="text-xl font-bold">BharatFarm</h3>
          </div>
        </div>
      </div>

      {/* Expanded Features Section */}
      <div id="features" className="features-wrapper">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-subheading">A modular architecture designed specifically for the unique challenges of Farmer Producer Organizations.</p>
          </div>

          {/* Feature 1 */}
          <div className="feature-row">
            <div className="animate-fade-up">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl inline-block mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Member Management</h3>
              <p className="text-subheading mb-6">Digitally onboard farmers, track land holding, manage share capital, and distribute dividends instantly. Keep all farmer KYC records centralized and secure.</p>
              <ul className="flex-column gap-3 mb-8">
                <li className="d-flex align-center gap-3"><Check className="text-primary"/> Comprehensive digital KYC</li>
                <li className="d-flex align-center gap-3"><Check className="text-primary"/> Land holding verification</li>
                <li className="d-flex align-center gap-3"><Check className="text-primary"/> Automated dividend calculation</li>
              </ul>
              <button className="btn btn-outline">Learn more about Members <ArrowRight size={16}/></button>
            </div>
            <div className="feature-mockup-box animate-fade-up delay-200">
              <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="d-flex justify-between mb-4 pb-4 border-b">
                   <div className="font-bold">Recent Members</div>
                   <div className="text-primary text-sm">+ Add New</div>
                 </div>
                 {[1,2,3].map(i => (
                   <div key={i} className="d-flex justify-between align-center py-3">
                     <div className="d-flex align-center gap-3">
                       <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                       <div><div className="font-medium text-sm">Farmer {i}</div><div className="text-xs text-muted">2.{i} Acres</div></div>
                     </div>
                     <div className="badge badge-success text-xs" style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '99px' }}>Verified</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-row" style={{ direction: 'rtl' }}>
            <div className="feature-mockup-box animate-fade-up delay-200" style={{ direction: 'ltr' }}>
               <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="font-bold mb-4 pb-4 border-b">Warehouse Capacity</div>
                 <div className="flex-column gap-4">
                   <div>
                     <div className="d-flex justify-between text-xs mb-1"><span>Pune Hub</span><span>85% Full</span></div>
                     <div className="w-full h-2 rounded-full" style={{ background: '#f1f5f9' }}><div className="h-2 rounded-full" style={{width: '85%', background: '#f59e0b'}}></div></div>
                   </div>
                   <div>
                     <div className="d-flex justify-between text-xs mb-1"><span>Nagpur Storage</span><span>40% Full</span></div>
                     <div className="w-full h-2 rounded-full" style={{ background: '#f1f5f9' }}><div className="h-2 rounded-full" style={{width: '40%', background: '#10b981'}}></div></div>
                   </div>
                 </div>
              </div>
            </div>
            <div className="animate-fade-up" style={{ direction: 'ltr' }}>
              <div className="p-4 bg-secondary/10 text-secondary rounded-2xl inline-block mb-6" style={{ background: 'rgba(37, 99, 235, 0.1)' }}>
                <Database size={32} color="#2563eb" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Intelligent Warehousing</h3>
              <p className="text-subheading mb-6">Track storage facilities, available capacity, and current stock in real-time. Prevent spoilage with automated alerts and expiry tracking for sensitive commodities.</p>
              <button className="btn btn-outline" style={{color: '#2563eb', border: '1px solid #2563eb'}}>Explore Warehouse <ArrowRight size={16}/></button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Three Column Mini Features */}
      <div className="bg-slate-50 py-24 border-y border-color">
        <div className="container">
           <div className="feature-mini-grid">
              
              <div className="saas-card group">
                <div className="card-icon p-4 rounded-xl inline-block mb-6" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Linkage</h3>
                <p className="text-muted mb-6">Aggregate produce and sell seamlessly to APMC, e-NAM, and private buyers with payment tracking.</p>
                <div className="d-flex align-center font-medium cursor-pointer" style={{ color: '#10b981' }}>
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

              <div className="saas-card group">
                <div className="card-icon p-4 rounded-xl inline-block mb-6" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Audit & Compliance</h3>
                <p className="text-muted mb-6">Generate instantaneous compliance reports. Role-Based Access Control and JWT security built-in.</p>
                <div className="d-flex align-center font-medium cursor-pointer" style={{ color: '#d97706' }}>
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

              <div className="saas-card group">
                <div className="card-icon p-4 rounded-xl inline-block mb-6" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile Ready</h3>
                <p className="text-muted mb-6">Fully responsive progressive web app allows collection agents to operate directly from the field.</p>
                <div className="d-flex align-center font-medium cursor-pointer" style={{ color: '#2563eb' }}>
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

           </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'var(--primary)', opacity: 0.03 }}></div>
        <div className="container relative z-10 animate-fade-up">
          <h2 className="text-5xl font-bold mb-6">Ready to empower your farmers?</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">Join hundreds of successful FPOs managing their operations on AgriCoop.</p>
          <div className="d-flex justify-center gap-4">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/register')}>Start your free trial</button>
            <button className="btn btn-secondary btn-large">Contact Sales</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            
            <div style={{ gridColumn: 'span 2' }}>
              <div className="d-flex align-center gap-2 mb-6">
                <Leaf size={24} color="#10b981" />
                <h2 className="text-2xl font-bold text-white">AgriCoop</h2>
              </div>
              <p className="text-sm max-w-xs mb-6" style={{ color: '#94a3b8' }}>
                The complete operating system for modern Farmer Producer Organizations. Built for scale, security, and simplicity.
              </p>
              <div className="d-flex gap-4">
                <div className="w-8 h-8 rounded-full cursor-pointer" style={{ background: '#1e293b' }}></div>
                <div className="w-8 h-8 rounded-full cursor-pointer" style={{ background: '#1e293b' }}></div>
                <div className="w-8 h-8 rounded-full cursor-pointer" style={{ background: '#1e293b' }}></div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="footer-links">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 d-flex flex-column md:flex-row justify-between align-center text-sm" style={{ borderTop: '1px solid #1e293b', color: '#64748b' }}>
            <p>© {new Date().getFullYear()} AgriCoop Technologies Inc. All rights reserved.</p>
            <div className="d-flex gap-6 mt-4 md:mt-0">
               <span>Status: All systems operational</span>
               <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

// Reusable Check Icon
const Check = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Home;
