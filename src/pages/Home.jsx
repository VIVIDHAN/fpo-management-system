import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, ArrowRight, ShieldCheck, Users, TrendingUp, Smartphone, Database, Check, ChevronRight } from 'lucide-react';
import './Home.css'; // Keep any custom styles if still needed, but heavily rely on Tailwind now

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

  const features = [
    {
      icon: <Users size={32} className="text-green-600" />,
      title: "Member Management",
      desc: "Digitally onboard farmers, track land holding, manage share capital, and keep KYC records centralized."
    },
    {
      icon: <Database size={32} className="text-blue-600" />,
      title: "Intelligent Warehousing",
      desc: "Track storage facilities, available capacity, and current stock in real-time with automated alerts."
    },
    {
      icon: <TrendingUp size={32} className="text-green-600" />,
      title: "Market Linkage",
      desc: "Aggregate produce and sell seamlessly to APMC, e-NAM, and private buyers with payment tracking."
    },
    {
      icon: <ShieldCheck size={32} className="text-blue-600" />,
      title: "Audit & Compliance",
      desc: "Generate instantaneous compliance reports. Role-Based Access Control and JWT security built-in."
    },
    {
      icon: <Smartphone size={32} className="text-green-600" />,
      title: "Mobile Ready",
      desc: "Fully responsive progressive web app allows collection agents to operate directly from the field."
    },
    {
      icon: <Check size={32} className="text-blue-600" />,
      title: "Financial Tracking",
      desc: "Automated dividend calculation and real-time transaction reconciliation for absolute transparency."
    }
  ];

  return (
    <div className="bg-white overflow-hidden text-gray-800 font-sans">
      
      {/* 4. NAVBAR - Modern Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-2 cursor-pointer transition duration-300 hover:scale-105" onClick={() => window.scrollTo(0,0)}>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <Leaf size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">AgriCoop</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-green-600 transition font-medium">Solutions</a>
              <a href="#features" className="text-gray-500 hover:text-green-600 transition font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-500 hover:text-green-600 transition font-medium">How it Works</a>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex items-center gap-2 font-medium" onClick={() => navigate('/dashboard')}>
                  Dashboard <ArrowRight size={16} />
                </button>
              ) : (
                <>
                  <button className="text-gray-600 font-medium hover:text-green-600 transition hidden sm:block" onClick={() => navigate('/login')}>Sign In</button>
                  <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 font-medium" onClick={() => navigate('/register')}>Get Started</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION - Premium Depth */}
      <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-100 bg-white shadow-sm mb-6 text-sm font-medium text-green-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                AgriCoop 2.0 is now live
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
                Digitally Transform Your <br />
                <span className="text-green-600">Farmer Producer</span>{" "}
                <span className="text-blue-600">Organization</span>
              </h1>
              
              <p className="mt-4 text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
                Manage members, finance, warehouse, procurement, sales,
                and analytics — all from one unified, enterprise-grade platform.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <button 
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-0.5"
                  onClick={handleCTA}
                >
                  Request Demo
                </button>
                <button 
                  className="px-6 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-300 hover:-translate-y-0.5"
                  onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}
                >
                  Explore Features
                </button>
              </div>
            </div>

            {/* Right Mockup (Glassmorphism UI) */}
            <div className="relative animate-fade-up delay-200 perspective">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/50 transform rotate-y-[-5deg] rotate-x-[5deg] transition duration-500 hover:rotate-0">
                
                {/* Mock Toolbar */}
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                {/* Dashboard Metrics Mockup */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-green-800 text-sm font-semibold mb-1">Total Farmers</p>
                    <p className="text-2xl font-bold text-green-600">10,245</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-blue-800 text-sm font-semibold mb-1">Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">₹25.4 Cr</p>
                  </div>
                </div>

                {/* List Mockup */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">Procurement #{i}04</div>
                          <div className="text-xs text-gray-500">2 mins ago</div>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Completed
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              
              {/* Decorative Blur Orbs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            </div>
            
          </div>
        </div>
      </div>

      {/* 2. TRUST SECTION */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 uppercase tracking-widest text-sm font-semibold">
            Trusted by leading agricultural cooperatives
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-8 opacity-60 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100">
            <h3 className="text-xl font-bold font-serif text-gray-800">AgriCorp</h3>
            <h3 className="text-xl font-bold font-sans text-gray-800">KisanMandi</h3>
            <h3 className="text-xl font-bold text-gray-800">MahaFPO</h3>
            <h3 className="text-xl font-bold italic text-gray-800">GreenProduce</h3>
            <h3 className="text-xl font-bold text-gray-800">BharatFarm</h3>
          </div>
        </div>
      </div>

      {/* 8. HOW IT WORKS SECTION (New) */}
      <div id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Built for Real-World Operations</h2>
            <p className="text-lg text-gray-500">From onboarding farmers to tracking daily procurement and final sales, we streamline every step.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-green-600 group-hover:text-white">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Register FPO</h3>
              <p className="text-gray-500">Set up your organization, configure branches, and securely onboard your member farmers with digital KYC.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-blue-600 group-hover:text-white">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Operations</h3>
              <p className="text-gray-500">Log daily harvest procurement, track warehouse inventory, and manage finances in one unified dashboard.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-green-600 group-hover:text-white">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track Growth</h3>
              <p className="text-gray-500">Utilize real-time analytics to monitor sales, distribute dividends, and prove compliance to regulators instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURES SECTION - Modern Grid */}
      <div id="features" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Everything you need to scale</h2>
            <p className="text-lg text-gray-500">A modular architecture designed specifically for the unique challenges of modern FPOs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-transparent transition duration-300 hover:-translate-y-1 group">
                <div className="p-3 bg-gray-50 rounded-xl inline-block mb-6 group-hover:bg-green-50 transition duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{f.desc}</p>
                <div className="flex items-center text-green-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer">
                  Learn more <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-20 relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to empower your farmers?</h2>
          <p className="text-xl text-green-100 mb-10">Join hundreds of successful FPOs managing their operations on AgriCoop today.</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105" onClick={() => navigate('/register')}>
              Start your free trial
            </button>
            <button className="px-8 py-4 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf size={24} className="text-green-500" />
                <h2 className="text-2xl font-bold">AgriCoop</h2>
              </div>
              <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
                The complete operating system for modern Farmer Producer Organizations. Built for scale, security, and simplicity.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-gray-100">Product</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Integrations</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-gray-100">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-gray-100">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Terms</a></li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} AgriCoop Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
