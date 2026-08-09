import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, Warehouse as WarehouseIcon, Settings, LogOut, Leaf } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const role = user?.role;
    const items = [
      { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> }
    ];

    if (['Admin', 'FPO Manager', 'Board Member', 'Member'].includes(role)) {
      items.push({ path: '/dashboard/members', label: 'Members', icon: <Users size={20} /> });
    }

    if (['Admin', 'FPO Manager', 'Collection Agent', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/procurement', label: 'Procurement', icon: <ShoppingBag size={20} /> });
    }

    if (['Admin', 'FPO Manager', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/sales', label: 'Sales Orders', icon: <TrendingUp size={20} /> });
      items.push({ path: '/dashboard/warehouse', label: 'Warehouse', icon: <WarehouseIcon size={20} /> });
    }

    items.push({ path: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> });

    return items;
  };

  const navItems = getNavItems();

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header d-flex align-center gap-3">
        <div className="p-2 bg-primary-light text-primary rounded-lg">
          <Leaf size={28} />
        </div>
        <div>
          <h2 className="text-xl text-primary font-bold">AgriCoop</h2>
          <p className="text-xs text-muted font-medium uppercase tracking-widest">{user?.role}</p>
        </div>
      </div>
      
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={logout} className="btn btn-secondary w-full justify-center">
          <LogOut size={18} /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
