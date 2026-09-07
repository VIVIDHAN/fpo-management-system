import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockSalesOrders, mockWarehouses } from '../utils/mockData';
import { Plus, Search, CheckCircle, X, TrendingUp, DollarSign } from 'lucide-react';
import { validateQuantity, validateName } from '../utils/validators';
import { useToast } from '../components/Toast';

const Sales = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [sales, setSales] = useState(mockSalesOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ 
    buyerName: '', 
    buyerType: 'APMC', 
    commodity: 'Wheat', 
    quantityKg: '', 
    pricePerKg: '',
    warehouseId: '301'
  });
  const [errors, setErrors] = useState({});

  const filtered = sales.filter(s => {
    const matchesSearch = s.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = buyerTypeFilter === 'ALL' || s.buyerType === buyerTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      buyerName: validateName(formData.buyerName),
      quantityKg: validateQuantity(formData.quantityKg)
    };
    
    if (!formData.pricePerKg || isNaN(parseFloat(formData.pricePerKg))) newErrors.pricePerKg = "Valid price per kg is required";

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const qty = parseFloat(formData.quantityKg);
    const price = parseFloat(formData.pricePerKg);

    const newSale = {
      id: sales.length + 201,
      buyerName: formData.buyerName,
      buyerType: formData.buyerType,
      commodity: formData.commodity,
      quantityKg: qty,
      date: new Date().toISOString().split('T')[0],
      pricePerKg: price,
      paymentReceived: false
    };
    
    setSales([newSale, ...sales]);
    setShowAddModal(false);
    setFormData({ buyerName: '', buyerType: 'APMC', commodity: 'Wheat', quantityKg: '', pricePerKg: '', warehouseId: '301' });
    setErrors({});
    addToast?.(`Sales Order #${newSale.id} created for ${newSale.buyerName}. Total: ₹${(qty * price).toLocaleString()}`, 'success');
  };

  const markAsPaid = (id) => {
    setSales(sales.map(s => {
      if (s.id === id) {
        addToast?.(`Payment for order #${id} (${s.buyerName}) marked as RECEIVED!`, 'success');
        return { ...s, paymentReceived: true };
      }
      return s;
    }));
  };

  return (
    <div className="pb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">B2B Market Linkage & Sales Orders</h1>
          <p className="text-slate-500 text-xs font-medium">Manage produce sales to APMC mandis, private aggregators, e-NAM auctions, and export buyers.</p>
        </div>
        
        {['Admin', 'FPO Manager'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus size={16} /> <span>New B2B Order</span>
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
              placeholder="Search by buyer or commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select 
              value={buyerTypeFilter} 
              onChange={e => setBuyerTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
            >
              <option value="ALL">All Buyer Channels</option>
              <option value="APMC">APMC Mandi</option>
              <option value="PRIVATE">Private Processor</option>
              <option value="E_NAM">e-NAM Trading</option>
              <option value="EXPORT">Export Buyer</option>
            </select>
          </div>
        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Buyer Name</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Channel Type</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Commodity</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Qty (kg)</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Agreed Price</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sales (₹)</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Status</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Approve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">{s.date}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{s.buyerName}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {s.buyerType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-900 font-bold">{s.commodity}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{s.quantityKg} kg</td>
                  <td className="py-4 px-6 text-xs text-slate-600">₹{s.pricePerKg}/kg</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">₹{(s.quantityKg * s.pricePerKg).toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      s.paymentReceived ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {s.paymentReceived ? 'RECEIVED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {!s.paymentReceived && ['Admin', 'FPO Manager'].includes(user?.role) && (
                      <button 
                        onClick={() => markAsPaid(s.id)} 
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Mark Payment Received"
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
                    No sales orders matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Create B2B Sales Order</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Buyer Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.buyerName ? 'border-rose-300' : 'border-slate-200'}`} 
                  value={formData.buyerName} 
                  onChange={e => setFormData({...formData, buyerName: e.target.value})} 
                  placeholder="e.g. ITC Agrico Ltd" 
                />
                {errors.buyerName && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.buyerName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Buyer Channel</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none"
                    value={formData.buyerType} 
                    onChange={e => setFormData({...formData, buyerType: e.target.value})}
                  >
                    <option value="APMC">APMC Mandi</option>
                    <option value="PRIVATE">Private Buyer</option>
                    <option value="E_NAM">e-NAM Platform</option>
                    <option value="EXPORT">Export Trader</option>
                  </select>
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Quantity (kg)</label>
                  <input 
                    type="number" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.quantityKg ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.quantityKg} 
                    onChange={e => setFormData({...formData, quantityKg: e.target.value})} 
                    placeholder="5000" 
                  />
                  {errors.quantityKg && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.quantityKg}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Agreed Price/kg (₹)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.pricePerKg ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.pricePerKg} 
                    onChange={e => setFormData({...formData, pricePerKg: e.target.value})} 
                    placeholder="30.00" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Generate Sales Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sales;
