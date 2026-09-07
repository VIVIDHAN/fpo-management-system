import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Bell, User, AlertCircle, Shield, ChevronDown, Check } from 'lucide-react';

const Header = ({ title = "Dashboard" }) => {
  const { user } = useAuth();
  const [showAlerts, setShowAlerts] = useState(false);

  const notifications = [
    { id: 1, type: 'warning', title: 'Warehouse Capacity Alert', message: 'Wada Facility reached 97.5% capacity.', time: '10m ago' },
    { id: 2, type: 'danger', title: 'Pending Settlement', message: '3 procurement payments are awaiting approval.', time: '1h ago' },
    { id: 3, type: 'info', title: 'NABARD Report Ready', message: 'Quarterly compliance draft generated.', time: '3h ago' },
  ];

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'FPO Manager': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Board Member': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Collection Agent': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Member': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between shadow-xs">
      
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
        <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user?.role)}`}>
          <Shield size={12} className="mr-1" /> {user?.role || 'Guest'}
        </span>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search records, farmers, commodities..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Notifications Popover */}
        <div className="relative">
          <button 
            onClick={() => setShowAlerts(!showAlerts)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
            title="System Alerts"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showAlerts && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 animate-fade-in z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">System Alerts</h4>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors flex gap-3 items-start">
                    <AlertCircle size={16} className={`shrink-0 mt-0.5 ${n.type === 'danger' ? 'text-rose-500' : n.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-200"></div>

        {/* Profile Pill */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.name || 'User'}</p>
            <p className="text-[10px] text-slate-400 font-medium">{user?.phone || user?.email || 'Authenticated'}</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
