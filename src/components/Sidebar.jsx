import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, Warehouse as WarehouseIcon, Settings, LogOut, Leaf } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const role = user?.role;
    const items = [
      { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> }
    ];

    if (['Admin', 'FPO Manager', 'Board Member', 'Member'].includes(role)) {
      items.push({ path: '/dashboard/members', label: 'Members', icon: <Users size={18} /> });
    }

    if (['Admin', 'FPO Manager', 'Collection Agent', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/procurement', label: 'Procurement', icon: <ShoppingBag size={18} /> });
    }

    if (['Admin', 'FPO Manager', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/sales', label: 'Sales Orders', icon: <TrendingUp size={18} /> });
      items.push({ path: '/dashboard/warehouse', label: 'Warehouse', icon: <WarehouseIcon size={18} /> });
    }

    items.push({ path: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> });

    return items;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 h-full bg-white/80 backdrop-blur-2xl border-r border-gray-200/60 flex flex-col pt-8 pb-6 px-4 shadow-[4px_0_24px_rgb(0,0,0,0.02)]">
      
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="p-2 bg-green-50 text-green-600 rounded-xl shadow-sm">
          <Leaf size={24} />
        </div>
        <div>
          <h2 className="text-xl text-gray-900 font-semibold tracking-tight">AgriCoop</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user?.role || 'Guest'}</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1.5">
        <p className="px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            <span className="tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="pt-6 mt-auto border-t border-gray-100">
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
               {user?.name ? user.name.charAt(0) : 'U'}
             </div>
             <div>
               <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
             </div>
          </div>
        </div>
        <button 
          onClick={logout} 
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-red-600 text-sm font-medium rounded-xl transition-colors"
        >
          <LogOut size={16} /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
