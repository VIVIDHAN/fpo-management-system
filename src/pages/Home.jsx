import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, ArrowRight, ShieldCheck, Users, TrendingUp, Smartphone, Database, Bell } from 'lucide-react';
import heroMockup from '../assets/hero.png'; // Will use an implicit image or standard <div> fallback if missing

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
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-color transition-all" style={{ zIndex: 100 }}>
        <div className="container py-4 d-flex justify-between align-center">
          <div className="d-flex align-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Leaf size={24} />
            </div>
            <h1 className="text-xl font-bold text-main">AgriCoop</h1>
          </div>
          
          <div className="hidden md:d-flex gap-8 align-center text-sm font-medium text-muted">
            <a href="#features" className="hover:text-primary transition-fast">Solutions</a>
            <a href="#features" className="hover:text-primary transition-fast">Features</a>
            <a href="#" className="hover:text-primary transition-fast">Resources</a>
            <a href="#" className="hover:text-primary transition-fast">Pricing</a>
          </div>

          <div className="d-flex gap-3 align-center">
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

      {/* Hero Section - 2 Column Layout */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute top-0 w-full h-full" style={{ zIndex: -1, background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0) 70%)' }}></div>
        
        <div className="container grid lg:grid-cols-2 gap-12 align-center">
          
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
            <div className="relative rounded-2xl shadow-2xl border border-color bg-white overflow-hidden" style={{ aspectRatio: '16/10', transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }}>
              {/* Mock Dashboard UI building blocks to simulate an image if heroMockup fails */}
              <div className="w-full h-10 bg-slate-50 border-b border-color d-flex align-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="col-span-1 flex-column gap-4">
                  <div className="h-24 bg-slate-100 rounded-lg"></div>
                  <div className="h-24 bg-slate-100 rounded-lg"></div>
                  <div className="h-48 bg-slate-100 rounded-lg"></div>
                </div>
                <div className="col-span-2 flex-column gap-4">
                  <div className="h-32 bg-primary/10 border border-primary/20 rounded-lg"></div>
                  <div className="h-64 bg-slate-50 border border-color rounded-lg"></div>
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
      <div className="border-y border-color bg-slate-50 py-10">
        <div className="container text-center">
          <p className="text-sm font-medium text-muted uppercase tracking-widest mb-6">Trusted by leading agricultural cooperatives</p>
          <div className="d-flex justify-center flex-wrap gap-12 opacity-60 grayscale hover:grayscale-0 transition-normal">
             <h3 className="text-xl font-bold font-serif">AgriCorp</h3>
             <h3 className="text-xl font-bold font-sans">KisanMandi</h3>
             <h3 className="text-xl font-bold">MahaFPO</h3>
             <h3 className="text-xl font-bold italic">GreenProduce</h3>
             <h3 className="text-xl font-bold">BharatFarm</h3>
          </div>
        </div>
      </div>

      {/* Expanded Features Section */}
      <div id="features" className="py-24 bg-main">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-subheading">A modular architecture designed specifically for the unique challenges of Farmer Producer Organizations.</p>
          </div>

          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 align-center mb-24">
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
            <div className="bg-slate-100 rounded-3xl p-8 relative animate-fade-up delay-200">
              <div className="bg-white rounded-xl shadow-lg p-6">
                 {/* Mock UI */}
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
                     <div className="badge badge-success text-xs">Verified</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="grid md:grid-cols-2 gap-16 align-center mb-24">
            <div className="order-2 md:order-1 bg-slate-100 rounded-3xl p-8 relative animate-fade-up delay-200">
               <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="font-bold mb-4 pb-4 border-b">Warehouse Capacity</div>
                 <div className="flex-column gap-4">
                   <div>
                     <div className="d-flex justify-between text-xs mb-1"><span>Pune Hub</span><span>85% Full</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-amber-500 h-2 rounded-full" style={{width: '85%'}}></div></div>
                   </div>
                   <div>
                     <div className="d-flex justify-between text-xs mb-1"><span>Nagpur Storage</span><span>40% Full</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-primary h-2 rounded-full" style={{width: '40%'}}></div></div>
                   </div>
                 </div>
              </div>
            </div>
            <div className="order-1 md:order-2 animate-fade-up">
              <div className="p-4 bg-secondary/10 text-secondary rounded-2xl inline-block mb-6">
                <Database size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Intelligent Warehousing</h3>
              <p className="text-subheading mb-6">Track storage facilities, available capacity, and current stock in real-time. Prevent spoilage with automated alerts and expiry tracking for sensitive commodities.</p>
              <button className="btn btn-outline" style={{color: 'var(--secondary)', borderColor: 'var(--secondary)'}}>Explore Warehouse <ArrowRight size={16}/></button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Three Column Mini Features */}
      <div className="bg-slate-50 py-24 border-y border-color">
        <div className="container">
           <div className="grid md:grid-cols-3 gap-8">
              
              <div className="saas-card group">
                <div className="card-icon p-4 bg-primary/10 text-primary rounded-xl inline-block mb-6">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Linkage</h3>
                <p className="text-muted mb-6">Aggregate produce and sell seamlessly to APMC, e-NAM, and private buyers with payment tracking.</p>
                <div className="d-flex align-center text-primary font-medium cursor-pointer">
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

              <div className="saas-card group">
                <div className="card-icon p-4 bg-amber-500/10 text-amber-500 rounded-xl inline-block mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Audit & Compliance</h3>
                <p className="text-muted mb-6">Generate instantaneous compliance reports. Role-Based Access Control and JWT security built-in.</p>
                <div className="d-flex align-center text-amber-600 font-medium cursor-pointer">
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

              <div className="saas-card group">
                <div className="card-icon p-4 bg-blue-500/10 text-blue-500 rounded-xl inline-block mb-6">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile Ready</h3>
                <p className="text-muted mb-6">Fully responsive progressive web app allows collection agents to operate directly from the field.</p>
                <div className="d-flex align-center text-blue-600 font-medium cursor-pointer">
                  Learn more <ArrowRight size={16} className="ml-2 card-arrow" />
                </div>
              </div>

           </div>
        </div>
      </div>

      {/* Massive CTA Section */}
      <div className="py-24 relative overflow-hidden bg-main">
        <div className="absolute top-0 left-0 w-full h-full bg-primary" style={{ opacity: 0.03 }}></div>
        <div className="container text-center relative z-10 animate-fade-up">
          <h2 className="text-5xl font-bold mb-6">Ready to empower your farmers?</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">Join hundreds of successful FPOs managing their operations on AgriCoop.</p>
          <div className="d-flex justify-center gap-4">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/register')}>Start your free trial</button>
            <button className="btn btn-secondary btn-large">Contact Sales</button>
          </div>
        </div>
      </div>

      {/* Rich SaaS Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            <div className="col-span-2">
              <div className="d-flex align-center gap-2 mb-6">
                <Leaf size={24} className="text-primary" />
                <h2 className="text-2xl font-bold text-white">AgriCoop</h2>
              </div>
              <p className="text-sm text-slate-400 max-w-xs mb-6">
                The complete operating system for modern Farmer Producer Organizations. Built for scale, security, and simplicity.
              </p>
              <div className="d-flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-fast cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-fast cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-fast cursor-pointer"></div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="flex-column gap-4 text-sm">
                <li><a href="#" className="hover:text-white transition-fast">Features</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="flex-column gap-4 text-sm">
                <li><a href="#" className="hover:text-white transition-fast">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Community</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="flex-column gap-4 text-sm">
                <li><a href="#" className="hover:text-white transition-fast">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-fast">Terms of Service</a></li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-slate-800 d-flex flex-column md:flex-row justify-between align-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} AgriCoop Technologies Inc. All rights reserved.</p>
            <div className="d-flex gap-6 mt-4 md:mt-0">
               <span>Status: All systems operational</span>
               <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Reusable Icon Component */}
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
