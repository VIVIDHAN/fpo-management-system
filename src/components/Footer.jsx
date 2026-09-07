import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 px-6 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="text-emerald-500" />
          <span className="font-semibold text-slate-200">AgriCoop FPO Management System</span>
          <span className="text-slate-600">|</span>
          <span>© 2024 Agricultural Cooperative & FPO Platform. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-slate-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">NABARD Compliance</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Support & Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
