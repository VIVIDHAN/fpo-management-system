import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProcurements, mockMembers, mockShareCapital } from '../utils/mockData';
import { BookOpen, IndianRupee, ShoppingBag, Award, Download, CheckCircle } from 'lucide-react';

const MemberPortal = () => {
  const { user } = useAuth();
  
  // Member records filtering
  const currentMember = mockMembers.find(m => m.phone === user?.phone || m.name === user?.name) || mockMembers[0];
  const personalTx = mockProcurements.filter(p => p.memberId === currentMember.memberId || p.memberName === currentMember.name);
  const shareDetails = mockShareCapital.find(s => s.memberId === currentMember.memberId) || { sharesCount: 50, totalValue: 5000, lastDividendPaid: 450, dividendDate: '2023-12-31' };
  
  const totalEarned = personalTx.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="pb-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
              <BookOpen size={14} /> Official Member Digital Passbook
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{currentMember.name}</h1>
            <p className="text-slate-300 text-xs font-medium">Member ID: <span className="font-mono text-emerald-400 font-bold">{currentMember.memberId}</span> • Village: {currentMember.village} • Land: {currentMember.landHolding} Acres</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert(`Downloading Digital Passbook Statement for ${currentMember.memberId}...`)}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              <Download size={16} /> Export Passbook PDF
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-fade-up">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <ShoppingBag size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Produce Submissions</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{personalTx.length} Entries</h3>
          <p className="text-[11px] text-slate-400 mt-1">Total aggregated deliveries</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <IndianRupee size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Received</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹{totalEarned.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Reconciled</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Award size={20} className="text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Share Capital & Dividend</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹{shareDetails.totalValue.toLocaleString()}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Last Dividend: ₹{shareDetails.lastDividendPaid} ({shareDetails.dividendDate})</p>
        </div>
      </div>

      {/* Digital Passbook Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">Produce Procurement Passbook</h3>
            <p className="text-slate-500 text-xs">Complete chronological record of submitted crops, grades, prices, and payment status.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Commodity</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quantity (kg)</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Price / kg</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {personalTx.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs text-slate-600 font-medium">{p.date}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{p.commodity}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${p.grade === 'REJECT' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                      Grade {p.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{p.quantityKg} kg</td>
                  <td className="py-4 px-6 text-xs text-slate-600">₹{p.pricePerKg}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">₹{p.totalAmount?.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {p.paymentStatus === 'PAID' ? <><CheckCircle size={12} /> PAID</> : 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))}
              {personalTx.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 text-xs">
                    No passbook transactions found for this member account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default MemberPortal;
