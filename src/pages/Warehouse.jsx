import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockWarehouses } from '../utils/mockData';
import { Plus, Search, MapPin, X, Warehouse as WarehouseIcon, PackagePlus } from 'lucide-react';
import { validateQuantity, validateName } from '../utils/validators';
import { useToast } from '../components/Toast';

const Warehouse = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [warehouses, setWarehouses] = useState(mockWarehouses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  
  const [formData, setFormData] = useState({ location: '', capacityMt: '', currentStockMt: '', commodity: 'Mixed' });
  const [depositData, setDepositData] = useState({ stockMt: '', commodity: 'Wheat' });
  const [errors, setErrors] = useState({});

  const filtered = warehouses.filter(w => 
    w.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      location: validateName(formData.location),
      capacityMt: validateQuantity(formData.capacityMt)
    };

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const capacity = parseFloat(formData.capacityMt);
    const stock = parseFloat(formData.currentStockMt || 0);
    const status = stock >= capacity ? 'FULL' : 'ACTIVE';

    const newWarehouse = {
      id: warehouses.length + 301,
      location: formData.location,
      capacityMt: capacity,
      currentStockMt: stock,
      commodity: formData.commodity,
      status: status
    };
    
    setWarehouses([newWarehouse, ...warehouses]);
    setShowAddModal(false);
    setFormData({ location: '', capacityMt: '', currentStockMt: '', commodity: 'Mixed' });
    setErrors({});
    addToast?.(`Warehouse facility at ${newWarehouse.location} created!`, 'success');
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const depositMt = parseFloat(depositData.stockMt || 0);
    if (!depositMt || depositMt <= 0) return;

    setWarehouses(warehouses.map(w => {
      if (w.id === selectedFacility.id) {
        const updatedStock = w.currentStockMt + depositMt;
        const status = updatedStock >= w.capacityMt ? 'FULL' : 'ACTIVE';
        addToast?.(`Deposited ${depositMt} MT to ${w.location}. Current Stock: ${updatedStock} MT`, 'success');
        return { ...w, currentStockMt: updatedStock, status };
      }
      return w;
    }));
    setShowDepositModal(false);
    setDepositData({ stockMt: '', commodity: 'Wheat' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'FULL': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'MAINTENANCE': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="pb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Warehouse & Stock Inventory</h1>
          <p className="text-slate-500 text-xs font-medium">Track storage facilities, capacity utilization %, commodity lot allocations, and maintenance states.</p>
        </div>
        
        {['Admin', 'FPO Manager'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus size={16} /> <span>Add Warehouse Facility</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="mb-6 relative w-full max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
          placeholder="Search warehouse location or commodity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Facility Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
        {filtered.map(w => {
          const utilization = w.capacityMt > 0 ? (w.currentStockMt / w.capacityMt) * 100 : 0;
          return (
            <div key={w.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base tracking-tight">{w.location}</h3>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border mt-1 ${getStatusColor(w.status)}`}>
                        {w.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 my-4 text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Commodity</span>
                    <span className="font-bold text-slate-900">{w.commodity}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Current Stock</span>
                    <span className="font-bold text-slate-900">{w.currentStockMt} MT</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Total Capacity</span>
                    <span className="font-bold text-slate-900">{w.capacityMt} MT</span>
                  </div>
                  
                  <div className="pt-1">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Utilization</span>
                      <span className="text-xs font-bold text-slate-900">{utilization.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${utilization >= 90 ? 'bg-rose-500' : 'bg-emerald-600'}`} 
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {['Admin', 'FPO Manager'].includes(user?.role) && (
                <button 
                  onClick={() => { setSelectedFacility(w); setShowDepositModal(true); }}
                  className="w-full py-2.5 mt-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-xl transition-colors border border-slate-200/80 flex items-center justify-center gap-2"
                >
                  <PackagePlus size={14} /> Deposit Stock Lot
                </button>
              )}

            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Add Storage Facility</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Facility Location Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.location ? 'border-rose-300' : 'border-slate-200'}`} 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                  placeholder="e.g. Pune Regional Storage Hub" 
                />
                {errors.location && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Supported Commodities</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none" 
                  value={formData.commodity} 
                  onChange={e => setFormData({...formData, commodity: e.target.value})} 
                  placeholder="e.g. Wheat, Rice or Mixed" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Total Capacity (MT)</label>
                  <input 
                    type="number" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.capacityMt ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.capacityMt} 
                    onChange={e => setFormData({...formData, capacityMt: e.target.value})} 
                    placeholder="500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Initial Stock (MT)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none" 
                    value={formData.currentStockMt} 
                    onChange={e => setFormData({...formData, currentStockMt: e.target.value})} 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Save Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deposit Stock Modal */}
      {showDepositModal && selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Deposit Stock to {selectedFacility.location}</h3>
            <p className="text-xs text-slate-500 mb-4">Current Stock: {selectedFacility.currentStockMt} / {selectedFacility.capacityMt} MT</p>
            
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Deposit Quantity (MT)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none" 
                  value={depositData.stockMt} 
                  onChange={e => setDepositData({...depositData, stockMt: e.target.value})} 
                  placeholder="25" 
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowDepositModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Confirm Deposit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Warehouse;
