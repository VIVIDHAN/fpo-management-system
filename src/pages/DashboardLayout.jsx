import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css'; // Essential for dashboard styling!

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="container animate-fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
