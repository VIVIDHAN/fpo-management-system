import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.includes('/members')) return 'Member Directory & Farmers';
    if (pathname.includes('/member-portal')) return 'Digital Passbook';
    if (pathname.includes('/procurement')) return 'Produce Aggregation & Procurement';
    if (pathname.includes('/sales')) return 'B2B Sales Orders';
    if (pathname.includes('/warehouse')) return 'Warehouse Inventory Facilities';
    if (pathname.includes('/finance')) return 'Finance, Share Capital & Dividends';
    if (pathname.includes('/analytics')) return 'Analytics & Compliance Reports';
    if (pathname.includes('/compliance')) return 'Document Repository & Audit Logs';
    if (pathname.includes('/settings')) return 'System Settings';
    return 'Dashboard Overview';
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <Header title={getPageTitle(location.pathname)} />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
