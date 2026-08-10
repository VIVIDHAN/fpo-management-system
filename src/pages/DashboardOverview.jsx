import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockKPIs, mockProcurements } from '../utils/mockData';
import { Users, IndianRupee, TrendingUp, Warehouse, ChevronRight, AlertCircle, Bell } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 text-gray-700 rounded-2xl">
                <Users size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Total Members</p>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{mockKPIs.totalMembers}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 text-gray-700 rounded-2xl">
                <IndianRupee size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Share Capital</p>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">₹{(mockKPIs.totalShareCapital / 100000).toFixed(2)}L</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 text-gray-700 rounded-2xl">
                <TrendingUp size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Monthly Sales</p>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">₹{(mockKPIs.monthlySalesRevenue / 100000).toFixed(2)}L</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 text-gray-700 rounded-2xl">
                <Warehouse size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Warehouse Used</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{mockKPIs.warehouseUtilization}%</h3>
                <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">High</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (user?.role === 'Member') {
      const personalTx = mockProcurements.filter(p => p.memberId === user.memberId);
      const totalSold = personalTx.reduce((acc, curr) => acc + curr.totalAmount, 0);

      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up">
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50">
            <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">My Transactions</p>
            <h3 className="text-4xl font-bold text-gray-900 tracking-tight mt-2">{personalTx.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50">
            <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Total Received</p>
            <h3 className="text-4xl font-bold text-gray-900 tracking-tight mt-2">₹{totalSold.toLocaleString()}</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50">
            <p className="text-[13px] text-gray-500 font-medium mb-1 uppercase tracking-wider">Share Capital</p>
            <h3 className="text-4xl font-bold text-gray-900 tracking-tight mt-2">₹5,000</h3>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-end mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{getGreeting()}, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 font-medium">Here's what's happening with your cooperative today.</p>
        </div>
      </div>
      
      {renderKPICards()}
      
      {['Admin', 'FPO Manager'].includes(user?.role) && (
        <div className="grid lg:grid-cols-3 gap-6 mt-6 animate-fade-up delay-200">
          
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-lg tracking-tight">Recent Procurements</h3>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {mockProcurements.slice(0, 4).map((p, idx) => (
                    <tr key={p.id} className={`${idx !== 0 ? 'border-t border-gray-50' : ''} hover:bg-gray-50/50 transition-colors group cursor-pointer`}>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900 mb-0.5">{p.memberName}</div>
                        <div className="text-sm text-gray-500">{p.commodity} • {p.quantityKg}kg</div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="font-bold text-gray-900 mb-1">₹{p.totalAmount.toLocaleString()}</div>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {p.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <Bell size={20} className="text-gray-400" />
              <h3 className="font-semibold text-gray-900 text-lg tracking-tight">System Alerts</h3>
            </div>
            <div className="p-6 space-y-4 flex-1">
              
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 flex gap-3 items-start">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Warehouse Capacity</p>
                  <p className="text-[13px] text-amber-700 mt-1">Wada Facility is at 97.5% capacity. Consider rerouting new procurements.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100/50 flex gap-3 items-start">
                <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">Pending Payments</p>
                  <p className="text-[13px] text-red-700 mt-1">3 members are waiting for procurement payments exceeding ₹50,000.</p>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
