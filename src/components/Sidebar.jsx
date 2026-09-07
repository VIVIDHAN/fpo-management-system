import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ShoppingBag, 
  TrendingUp, 
  Warehouse as WarehouseIcon, 
  DollarSign, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Leaf 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const role = user?.role;
    
    // Default overview available for all authenticated users
    const items = [
      { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> }
    ];

    // Member Self-Service Passbook
    items.push({ path: '/dashboard/member-portal', label: 'Digital Passbook', icon: <BookOpen size={18} /> });

    // Members Directory
    if (['Admin', 'FPO Manager', 'Board Member', 'Collection Agent', 'Member'].includes(role)) {
      items.push({ path: '/dashboard/members', label: 'Member Directory', icon: <Users size={18} /> });
    }

    // Procurement
    if (['Admin', 'FPO Manager', 'Collection Agent', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/procurement', label: 'Procurement', icon: <ShoppingBag size={18} /> });
    }

    // Sales Orders & Warehouse
    if (['Admin', 'FPO Manager', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/sales', label: 'Sales Orders', icon: <TrendingUp size={18} /> });
      items.push({ path: '/dashboard/warehouse', label: 'Warehouse', icon: <WarehouseIcon size={18} /> });
      items.push({ path: '/dashboard/finance', label: 'Finance & Dividends', icon: <DollarSign size={18} /> });
      items.push({ path: '/dashboard/analytics', label: 'Analytics & Reports', icon: <BarChart3 size={18} /> });
      items.push({ path: '/dashboard/compliance', label: 'Compliance & Audit', icon: <ShieldCheck size={18} /> });
    }

    items.push({ path: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> });

    return items;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200/80 flex flex-col pt-6 pb-5 px-3 shadow-xs">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shadow-xs border border-emerald-100">
          <Leaf size={22} />
        </div>
        <div>
          <h2 className="text-lg text-slate-900 font-bold tracking-tight">AgriCoop</h2>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{user?.role || 'Guest'}</p>
        </div>
      </div>
      
      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Navigation</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.icon}
            <span className="tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* User Footer Profile */}
      <div className="pt-4 mt-auto border-t border-slate-100">
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-2.5">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
               {user?.name ? user.name.charAt(0) : 'U'}
             </div>
             <div className="truncate max-w-[120px]">
               <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'User'}</p>
               <p className="text-[10px] text-slate-400 font-medium truncate">{user?.role || 'Member'}</p>
             </div>
          </div>
        </div>
        <button 
          onClick={logout} 
          className="w-full flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl transition-colors border border-slate-200/60 hover:border-rose-200"
        >
          <LogOut size={14} /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
