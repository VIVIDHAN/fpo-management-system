import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#f5f5f7] font-sans overflow-hidden selection:bg-green-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-7xl mx-auto w-full animate-fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
