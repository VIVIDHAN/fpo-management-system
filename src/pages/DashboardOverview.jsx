import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockKPIs, mockProcurements } from '../utils/mockData';
import { Users, IndianRupee, TrendingUp, Warehouse, ChevronRight, AlertCircle, Bell, Shield, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pb-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-2">
            <Shield size={14} strokeWidth={2.5} /> Active Role: {user?.role || 'Guest'}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">
            {getGreeting()}, {user?.name ? user.name.split(' ')[0] : 'User'}!
          </h1>
          <p className="text-slate-500 text-xs font-medium">Here's a summary of your agricultural cooperative's operations today.</p>
        </div>
      </div>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-up">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl border border-slate-100">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">+12 new</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Member Farmers</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{mockKPIs.totalMembers}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl border border-slate-100">
              <IndianRupee size={20} />
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">Share Capital</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Share Capital</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">₹{(mockKPIs.totalShareCapital / 100000).toFixed(2)}L</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl border border-slate-100">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +18.4% <ArrowUpRight size={12} />
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Monthly B2B Sales</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">₹{(mockKPIs.monthlySalesRevenue / 100000).toFixed(2)}L</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl border border-slate-100">
              <Warehouse size={20} />
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">High Utilization</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Warehouse Stock</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{mockKPIs.warehouseUtilization}%</h3>
        </div>

      </div>
      
      {/* Activity & Alerts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Recent Procurements */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-base tracking-tight">Recent Produce Deliveries</h3>
            <button onClick={() => navigate('/dashboard/procurement')} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Farmer Member</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Crop</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total (₹)</th>
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockProcurements.slice(0, 4).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900 text-xs">{p.memberName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.memberId}</div>
                    </td>
                    <td className="py-3.5 px-6 text-xs text-slate-700 font-medium">{p.commodity} ({p.quantityKg}kg)</td>
                    <td className="py-3.5 px-6">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {p.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-xs font-bold text-slate-900">₹{p.totalAmount?.toLocaleString()}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* System Alerts */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
              <Bell size={18} className="text-slate-400" />
              <h3 className="font-bold text-slate-900 text-base tracking-tight">Active Operational Alerts</h3>
            </div>
            
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex gap-3 items-start">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-900">Warehouse Capacity Warning</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Wada Facility reached 97.5% capacity limit.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 flex gap-3 items-start">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-900">Pending Farmer Settlements</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">3 procurement payments exceeding ₹50k require manager approval.</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard/analytics')}
            className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-xl transition-colors border border-slate-200/80"
          >
            Open Analytics & Reports
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
