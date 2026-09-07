import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProcurements, mockMembers, mockWarehouses } from '../utils/mockData';
import { Plus, Search, CheckCircle, X, ShoppingBag, Filter } from 'lucide-react';
import { validateQuantity } from '../utils/validators';
import { useToast } from '../components/Toast';

const Procurement = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [procurements, setProcurements] = useState(mockProcurements);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ 
    memberId: 'FPO-M-1001', 
    commodity: 'Wheat', 
    quantityKg: '', 
    grade: 'A', 
    pricePerKg: '25.00',
    warehouseId: '301'
  });
  const [errors, setErrors] = useState({});

  const filtered = procurements.filter(p => {
    const matchesSearch = p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'ALL' || p.grade === gradeFilter;
    const matchesPayment = paymentFilter === 'ALL' || p.paymentStatus === paymentFilter;
    return matchesSearch && matchesGrade && matchesPayment;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      quantityKg: validateQuantity(formData.quantityKg)
    };
    
    if (!formData.memberId) newErrors.memberId = "Member ID is required";
    if (!formData.pricePerKg || isNaN(parseFloat(formData.pricePerKg))) newErrors.pricePerKg = "Valid price per kg is required";

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const member = mockMembers.find(m => m.memberId === formData.memberId) || { name: 'Rajesh Kumar' };
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
    setFormData({ memberId: 'FPO-M-1001', commodity: 'Wheat', quantityKg: '', grade: 'A', pricePerKg: '25.00', warehouseId: '301' });
    setErrors({});
    addToast?.(`Procurement of ${qty} kg ${formData.commodity} recorded for ${member.name}. Payment pending approval.`, 'success');
  };

  const markAsPaid = (id) => {
    setProcurements(procurements.map(p => {
      if (p.id === id) {
        addToast?.(`Payment of ₹${p.totalAmount?.toLocaleString()} for ${p.memberName} marked as PAID.`, 'success');
        return { ...p, paymentStatus: 'PAID' };
      }
      return p;
    }));
  };

  return (
    <div className="pb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Produce Aggregation & Procurement</h1>
          <p className="text-slate-500 text-xs font-medium">Record collection center crop deliveries, quality grading (A/B/C/REJECT), and payout settlements.</p>
        </div>
        
        {['Admin', 'FPO Manager', 'Collection Agent'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus size={16} /> <span>Record Procurement</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden animate-fade-up">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
              placeholder="Search by farmer name or commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select 
              value={gradeFilter} 
              onChange={e => setGradeFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
            >
              <option value="ALL">All Grades</option>
              <option value="A">Grade A (Premium)</option>
              <option value="B">Grade B (Standard)</option>
              <option value="C">Grade C (Low)</option>
              <option value="REJECT">REJECT</option>
            </select>

            <select 
              value={paymentFilter} 
              onChange={e => setPaymentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
            >
              <option value="ALL">All Payments</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Farmer Member</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Commodity</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quality Grade</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Qty (kg)</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Price / kg</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Status</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Approve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">{p.date}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-xs">{p.memberName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.memberId}</div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-900 font-bold">{p.commodity}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                      p.grade === 'REJECT' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      Grade {p.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-900 font-bold">{p.quantityKg} kg</td>
                  <td className="py-4 px-6 text-xs text-slate-600">₹{p.pricePerKg}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">₹{p.totalAmount?.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {p.paymentStatus === 'PENDING' && ['Admin', 'FPO Manager'].includes(user?.role) && (
                      <button 
                        onClick={() => markAsPaid(p.id)} 
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Mark Payment Paid"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-400 text-xs">
                    No procurement records matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Procurement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Record Crop Procurement</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Select Farmer Member</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.memberId} 
                  onChange={e => setFormData({...formData, memberId: e.target.value})}
                >
                  {mockMembers.map(m => (
                    <option key={m.memberId} value={m.memberId}>{m.name} ({m.memberId}) - {m.village}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Commodity</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none"
                    value={formData.commodity} 
                    onChange={e => setFormData({...formData, commodity: e.target.value})}
                  >
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Quality Grade</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none"
                    value={formData.grade} 
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                  >
                    <option value="A">Grade A (Premium)</option>
                    <option value="B">Grade B (Standard)</option>
                    <option value="C">Grade C (Low)</option>
                    <option value="REJECT">REJECT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Quantity (kg)</label>
                  <input 
                    type="number" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.quantityKg ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.quantityKg} 
                    onChange={e => setFormData({...formData, quantityKg: e.target.value})} 
                    placeholder="1000" 
                  />
                  {errors.quantityKg && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.quantityKg}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Price per kg (₹)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.pricePerKg ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.pricePerKg} 
                    onChange={e => setFormData({...formData, pricePerKg: e.target.value})} 
                    placeholder="25.00" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Destination Warehouse</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none"
                  value={formData.warehouseId} 
                  onChange={e => setFormData({...formData, warehouseId: e.target.value})}
                >
                  {mockWarehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.location} (Capacity: {w.capacityMt} MT)</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Record Collection</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Procurement;
