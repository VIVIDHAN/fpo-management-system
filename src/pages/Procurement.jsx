import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProcurements, mockMembers } from '../utils/mockData';
import { Plus, Search, CheckCircle, X } from 'lucide-react';
import { validateQuantity } from '../utils/validators';

const Procurement = () => {
  const { user } = useAuth();
  const [procurements, setProcurements] = useState(mockProcurements);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ memberId: '', commodity: 'Wheat', quantityKg: '', grade: 'A', pricePerKg: '' });
  const [errors, setErrors] = useState({});

  const filtered = procurements.filter(p => 
    p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      quantityKg: validateQuantity(formData.quantityKg)
    };
    
    if (!formData.memberId) newErrors.memberId = "Member ID is required";
    if (!formData.pricePerKg || isNaN(parseFloat(formData.pricePerKg))) newErrors.pricePerKg = "Valid price is required";

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const member = mockMembers.find(m => m.memberId === formData.memberId) || { name: 'Unknown Member' };
    const qty = parseFloat(formData.quantityKg);
    const price = parseFloat(formData.pricePerKg);
    const totalAmount = qty * price;

    const newProc = {
      id: procurements.length + 101,
      memberId: formData.memberId,
      memberName: member.name,
      commodity: formData.commodity,
      quantityKg: qty,
      grade: formData.grade,
      date: new Date().toISOString().split('T')[0],
      pricePerKg: price,
      totalAmount: totalAmount,
      paymentStatus: 'PENDING'
    };
    
    setProcurements([newProc, ...procurements]);
    setShowAddModal(false);
    setFormData({ memberId: '', commodity: 'Wheat', quantityKg: '', grade: 'A', pricePerKg: '' });
    setErrors({});
  };

  const markAsPaid = (id) => {
    setProcurements(procurements.map(p => p.id === id ? { ...p, paymentStatus: 'PAID' } : p));
  };

  return (
    <div className="pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Procurement</h1>
          <p className="text-gray-500 font-medium">Manage collective input and produce aggregation.</p>
        </div>
        
        {['Admin', 'FPO Manager', 'Collection Agent'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors shadow-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={18} /> <span>New Entry</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 overflow-hidden animate-fade-up delay-100">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all shadow-sm"
              placeholder="Search by member or commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Commodity</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Qty (kg)</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Price/kg</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total (₹)</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm text-gray-500">{p.date}</td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900 mb-0.5">{p.memberName}</div>
                    <div className="text-xs text-gray-400 font-mono">{p.memberId}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{p.commodity}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold tracking-wider ${p.grade === 'REJECT' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                      {p.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{p.quantityKg}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">₹{p.pricePerKg}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">₹{p.totalAmount?.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {p.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {p.paymentStatus === 'PENDING' && ['Admin', 'FPO Manager'].includes(user?.role) && (
                      <button onClick={() => markAsPaid(p.id)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark Paid">
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-400 text-sm">
                    No procurements found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Record Procurement</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Member ID</label>
                <input type="text" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.memberId ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.memberId} onChange={e => {setFormData({...formData, memberId: e.target.value}); setErrors({...errors, memberId: null})}} placeholder="e.g. FPO-M-1001" />
                {errors.memberId && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.memberId}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Commodity</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all appearance-none" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})}>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Grade</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all appearance-none" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                    <option value="A">A (Premium)</option>
                    <option value="B">B (Standard)</option>
                    <option value="C">C (Low Quality)</option>
                    <option value="REJECT">REJECT</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Quantity (kg)</label>
                  <input type="number" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.quantityKg ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.quantityKg} onChange={e => {setFormData({...formData, quantityKg: e.target.value}); setErrors({...errors, quantityKg: null})}} />
                  {errors.quantityKg && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.quantityKg}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Price per kg (₹)</label>
                  <input type="number" step="0.5" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.pricePerKg ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.pricePerKg} onChange={e => {setFormData({...formData, pricePerKg: e.target.value}); setErrors({...errors, pricePerKg: null})}} />
                  {errors.pricePerKg && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.pricePerKg}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                <button type="button" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-full transition-colors" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-full transition-colors shadow-sm">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Procurement;
