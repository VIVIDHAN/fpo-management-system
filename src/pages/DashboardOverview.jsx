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
        <div className="stat-grid animate-fade-up">
          <div className="stat-card">
            <div className="stat-icon bg-primary-light text-primary">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total Members</p>
              <h3 className="text-2xl font-bold">{mockKPIs.totalMembers}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-secondary-light text-secondary">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Share Capital</p>
              <h3 className="text-2xl font-bold">₹{(mockKPIs.totalShareCapital / 100000).toFixed(2)}L</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-success-light text-success">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Monthly Sales</p>
              <h3 className="text-2xl font-bold">₹{(mockKPIs.monthlySalesRevenue / 100000).toFixed(2)}L</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-accent-light text-accent">
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
        <div className="stat-grid animate-fade-up">
          <div className="stat-card">
            <div>
              <p className="text-sm text-muted font-medium">My Transactions</p>
              <h3 className="text-2xl font-bold text-primary">{personalTx.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p className="text-sm text-muted font-medium">Total Amount Received</p>
              <h3 className="text-2xl font-bold text-secondary">₹{totalSold.toLocaleString()}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p className="text-sm text-muted font-medium">Share Capital</p>
              <h3 className="text-2xl font-bold text-success">₹5,000</h3>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{getGreeting()}, {user?.name}!</h1>
          <p className="page-subtitle">Welcome to your {user?.role} dashboard.</p>
        </div>
      </div>
      
      {renderKPICards()}
      
      {['Admin', 'FPO Manager'].includes(user?.role) && (
        <div className="grid md:grid-cols-2 gap-6 mt-8 animate-fade-up delay-200">
          <div className="card-panel">
            <div className="card-header">
              <h3 className="card-title">Recent Procurements</h3>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="data-table">
                <tbody>
                  {mockProcurements.slice(0, 4).map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="font-medium text-main">{p.memberName}</div>
                        <div className="text-xs text-muted">{p.commodity} - {p.quantityKg}kg</div>
                      </td>
                      <td className="text-right">
                        <div className="font-bold">₹{p.totalAmount}</div>
                        <span className={`badge ${p.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'} mt-2`}>{p.paymentStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="card-panel">
            <div className="card-header">
              <h3 className="card-title">System Alerts</h3>
            </div>
            <div className="card-body">
              <div className="alert-box alert-warning">
                <p className="font-medium text-accent">Warehouse Capacity Warning</p>
                <p className="text-sm text-muted mt-1">Wada Facility is at 97.5% capacity.</p>
              </div>
              <div className="alert-box alert-danger">
                <p className="font-medium text-danger">Pending Payments</p>
                <p className="text-sm text-muted mt-1">3 members waiting for procurement payments.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
