import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, Warehouse as WarehouseIcon, Settings, LogOut, Sprout } from 'lucide-react';

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
    <aside className="sidebar flex-column glass-card" style={{ height: 'calc(100vh - 2rem)', padding: '1.5rem', width: '280px' }}>
      <div className="sidebar-header mb-8 d-flex align-center gap-3">
        <div className="p-2 bg-primary-light text-primary rounded-lg shadow-glow">
          <Sprout size={28} />
        </div>
        <div>
          <h2 className="text-xl text-primary font-bold">AgriCoop</h2>
          <p className="text-xs text-muted font-medium text-uppercase tracking-wider">{user?.role}</p>
        </div>
      </div>
      
      <div className="sidebar-nav flex-1 flex-column gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `sidebar-link d-flex align-center gap-3 p-3 rounded-lg transition-fast ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-footer mt-auto pt-6 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
        <button onClick={logout} className="btn btn-outline w-full justify-center">
          <LogOut size={18} /> <span className="font-semibold">Sign Out</span>
        </button>
      </div>

      <style>{`
        .sidebar-link {
          color: var(--text-muted);
        }
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.6);
          color: var(--primary);
          transform: translateX(4px);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, var(--primary-light), rgba(16,185,129,0.1));
          color: var(--primary-dark);
          box-shadow: var(--shadow-sm);
        }
        .tracking-wider { letter-spacing: 0.1em; }
        .text-uppercase { text-transform: uppercase; }
      `}</style>
    </aside>
  );
};

export default Sidebar;
