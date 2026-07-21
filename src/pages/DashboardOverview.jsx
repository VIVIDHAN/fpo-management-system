import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockKPIs, mockProcurements } from '../utils/mockData';
import { Users, IndianRupee, TrendingUp, Warehouse } from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderKPICards = () => {
    const isAdmin = ['Admin', 'FPO Manager', 'Board Member'].includes(user?.role);

    if (isAdmin) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 animate-fade-in-up delay-100">
          <div className="glass-card d-flex align-center gap-3">
            <div className="p-3 bg-primary-light text-primary rounded-full">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total Members</p>
              <h3 className="text-2xl font-bold">{mockKPIs.totalMembers}</h3>
            </div>
          </div>
          
          <div className="glass-card d-flex align-center gap-3">
            <div className="p-3 bg-secondary-light text-secondary rounded-full">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Share Capital</p>
              <h3 className="text-2xl font-bold">₹{(mockKPIs.totalShareCapital / 100000).toFixed(2)}L</h3>
            </div>
          </div>
          
          <div className="glass-card d-flex align-center gap-3">
            <div className="p-3 bg-success-light text-success rounded-full">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Monthly Sales</p>
              <h3 className="text-2xl font-bold">₹{(mockKPIs.monthlySalesRevenue / 100000).toFixed(2)}L</h3>
            </div>
          </div>

          <div className="glass-card d-flex align-center gap-3">
            <div className="p-3 bg-accent-light text-accent rounded-full">
              <Warehouse size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Warehouse Used</p>
              <h3 className="text-2xl font-bold">{mockKPIs.warehouseUtilization}%</h3>
            </div>
          </div>
        </div>
      );
    }

    if (user?.role === 'Member') {
      const personalTx = mockProcurements.filter(p => p.memberId === user.memberId);
      const totalSold = personalTx.reduce((acc, curr) => acc + curr.totalAmount, 0);

      return (
        <div className="grid md:grid-cols-3 gap-4 mt-6 animate-fade-in-up delay-100">
          <div className="glass-card">
            <p className="text-sm text-muted font-medium">My Transactions</p>
            <h3 className="text-2xl font-bold text-primary">{personalTx.length}</h3>
          </div>
          <div className="glass-card">
            <p className="text-sm text-muted font-medium">Total Amount Received</p>
            <h3 className="text-2xl font-bold text-secondary">₹{totalSold.toLocaleString()}</h3>
          </div>
          <div className="glass-card">
            <p className="text-sm text-muted font-medium">Share Capital</p>
            <h3 className="text-2xl font-bold text-success">₹5,000</h3>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{getGreeting()}, {user?.name}!</h1>
        <p className="text-muted mt-2">Welcome to your {user?.role} dashboard.</p>
      </div>
      
      {renderKPICards()}
      
      {['Admin', 'FPO Manager'].includes(user?.role) && (
        <div className="mt-8 grid md:grid-cols-2 gap-6 animate-fade-in-up delay-200">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Procurements</h3>
            <div className="flex-column gap-3">
              {mockProcurements.slice(0, 3).map(p => (
                <div key={p.id} className="d-flex justify-between align-center p-3 border-b border-color">
                  <div>
                    <p className="font-medium">{p.memberName}</p>
                    <p className="text-xs text-muted">{p.commodity} - {p.quantityKg}kg</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{p.totalAmount}</p>
                    <span className={`badge ${p.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'}`}>{p.paymentStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">System Alerts</h3>
            <div className="flex-column gap-3">
              <div className="p-3 bg-accent-light text-accent rounded-md border-l-4" style={{ borderColor: 'var(--accent)' }}>
                <p className="font-medium">Warehouse Capacity Warning</p>
                <p className="text-sm">Wada Facility is at 97.5% capacity.</p>
              </div>
              <div className="p-3 bg-danger-light text-danger rounded-md border-l-4" style={{ borderColor: 'var(--danger)' }}>
                <p className="font-medium">Pending Payments</p>
                <p className="text-sm">3 members waiting for procurement payments.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
