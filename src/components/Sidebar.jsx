import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, Warehouse as WarehouseIcon, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const role = user?.role;
    const items = [
      { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} />, roles: ['Admin', 'FPO Manager', 'Board Member', 'Collection Agent', 'Member', 'Guest'] }
    ];

    if (['Admin', 'FPO Manager', 'Board Member', 'Member'].includes(role)) {
      items.push({ path: '/dashboard/members', label: 'Members', icon: <Users size={20} />, roles: ['Admin', 'FPO Manager', 'Board Member', 'Member'] });
    }

    if (['Admin', 'FPO Manager', 'Collection Agent', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/procurement', label: 'Procurement', icon: <ShoppingBag size={20} />, roles: ['Admin', 'FPO Manager', 'Collection Agent', 'Board Member'] });
    }

    if (['Admin', 'FPO Manager', 'Board Member'].includes(role)) {
      items.push({ path: '/dashboard/sales', label: 'Sales Orders', icon: <TrendingUp size={20} />, roles: ['Admin', 'FPO Manager', 'Board Member'] });
      items.push({ path: '/dashboard/warehouse', label: 'Warehouse', icon: <WarehouseIcon size={20} />, roles: ['Admin', 'FPO Manager', 'Board Member'] });
    }

    items.push({ path: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} />, roles: ['Admin', 'FPO Manager', 'Board Member', 'Collection Agent', 'Member', 'Guest'] });

    return items;
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar flex-column glass-panel">
      <div className="sidebar-header p-4">
        <h2 className="text-xl text-primary font-bold">FPO System</h2>
        <p className="text-sm text-muted">{user?.role}</p>
      </div>
      
      <div className="sidebar-nav flex-1 p-2 flex-column gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `sidebar-link d-flex align-center gap-2 p-2 rounded-md transition-fast ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-footer p-4 border-t">
        <button onClick={logout} className="btn btn-outline w-full justify-center">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <style>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          position: sticky;
          top: 0;
          border-right: 1px solid var(--border-color);
        }
        .sidebar-link {
          color: var(--text-muted);
          font-weight: 500;
        }
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.5);
          color: var(--primary);
        }
        .sidebar-link.active {
          background: var(--primary-light);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .border-t {
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
