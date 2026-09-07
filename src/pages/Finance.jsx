import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockShareCapital, mockMembers } from '../utils/mockData';
import { DollarSign, PieChart, FileText, Calculator, Download, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/Toast';

const Finance = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [netProfit, setNetProfit] = useState(500000);
  const [poolPercentage, setPoolPercentage] = useState(40);
  const [showCalcModal, setShowCalcModal] = useState(false);

  // Calculation logic per SRS Appendix A & H
  const dividendPool = (netProfit * poolPercentage) / 100;
  const totalShares = mockShareCapital.reduce((acc, curr) => acc + curr.sharesCount, 0);
  const dividendPerShare = totalShares > 0 ? dividendPool / totalShares : 0;

  const handleCalculate = (e) => {
    e.preventDefault();
    addToast?.(`Dividends calculated: ₹${dividendPerShare.toFixed(2)} per share. Total pool: ₹${dividendPool.toLocaleString()}`, 'success');
    setShowCalcModal(false);
  };

  return (
    <div className="pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Finance & Dividends</h1>
          <p className="text-slate-500 text-xs font-medium">Manage member share capital, calculate dividends, and generate NABARD reports.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              addToast?.('Generating NABARD & FPC Act Annual Compliance Report...', 'info');
              setTimeout(() => addToast?.('NABARD Report downloaded successfully!', 'success'), 1200);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <FileText size={16} /> <span>Export NABARD Report</span>
          </button>
          <button 
            onClick={() => setShowCalcModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Calculator size={16} /> <span>Calculate Dividends</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-fade-up">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <DollarSign size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Share Capital</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹45.00L</h3>
          <p className="text-[11px] text-slate-400 mt-1">Managed across 1,245 active farmers</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <PieChart size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Current Dividend Pool</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹{dividendPool.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">₹{dividendPerShare.toFixed(2)} per share ({poolPercentage}% pool)</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <FileText size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">NABARD Status</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">Compliant</h3>
          <p className="text-[11px] text-slate-400 mt-1">FPC Act Section 378 verified</p>
        </div>
      </div>

      {/* Share Capital Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">Share Capital Ledger</h3>
            <p className="text-slate-500 text-xs">Detailed records of shares held per farmer member and historical payouts.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member ID</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Farmer Name</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shares Count</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Face Value</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Share Value</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Dividend</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payout Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShareCapital.map((s) => {
                const member = mockMembers.find(m => m.memberId === s.memberId) || { name: 'Farmer Member' };
                return (
                  <tr key={s.memberId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-xs font-mono font-bold text-slate-900">{s.memberId}</td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-900">{member.name}</td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-900">{s.sharesCount} shares</td>
                    <td className="py-4 px-6 text-xs text-slate-600">₹{s.shareValue}</td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-900">₹{s.totalValue.toLocaleString()}</td>
                    <td className="py-4 px-6 text-xs text-emerald-700 font-bold">₹{s.lastDividendPaid}</td>
                    <td className="py-4 px-6 text-xs text-slate-500">{s.dividendDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dividend Calculation Modal */}
      {showCalcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Calculate Annual Dividends</h3>
              <button onClick={() => setShowCalcModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>
            
            <form onSubmit={handleCalculate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Annual FPO Net Profit (₹)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                  value={netProfit} 
                  onChange={e => setNetProfit(parseFloat(e.target.value) || 0)} 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Dividend Pool Allocation (%)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                  value={poolPercentage} 
                  onChange={e => setPoolPercentage(parseFloat(e.target.value) || 0)} 
                />
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs space-y-1">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Calculated Dividend Pool:</span>
                  <span className="font-bold text-slate-900">₹{dividendPool.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Estimated Dividend / Share:</span>
                  <span className="font-bold text-emerald-700">₹{dividendPerShare.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowCalcModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Approve & Disburse</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Finance;
