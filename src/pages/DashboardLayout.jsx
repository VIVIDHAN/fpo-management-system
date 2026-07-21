import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="d-flex bg-gradient" style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      <Sidebar />
      <div className="flex-1 p-6" style={{ overflowY: 'auto', height: '100vh' }}>
        <div className="container animate-fade-in-up">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
