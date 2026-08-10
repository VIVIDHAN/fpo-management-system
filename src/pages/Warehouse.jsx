import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockWarehouses } from '../utils/mockData';
import { Plus, Search, MapPin, X } from 'lucide-react';
import { validateQuantity, validateName } from '../utils/validators';

const Warehouse = () => {
  const { user } = useAuth();
  const [warehouses, setWarehouses] = useState(mockWarehouses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ location: '', capacityMt: '', currentStockMt: '', commodity: 'Mixed' });
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
    
    if (formData.currentStockMt && isNaN(parseFloat(formData.currentStockMt))) {
      newErrors.currentStockMt = "Valid number required";
    }

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const capacity = parseFloat(formData.capacityMt);
    const stock = parseFloat(formData.currentStockMt || 0);

    let status = 'ACTIVE';
    if (stock >= capacity) status = 'FULL';

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
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'bg-green-50 text-green-700';
      case 'FULL': return 'bg-red-50 text-red-700';
      case 'MAINTENANCE': return 'bg-amber-50 text-amber-700';
      default: return 'bg-blue-50 text-blue-700';
    }
  };

  return (
    <div className="pb-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Warehouse Management</h1>
          <p className="text-gray-500 font-medium">Manage storage facilities, capacity, and current stock.</p>
        </div>
        
        {['Admin', 'FPO Manager'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors shadow-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={18} /> <span>Add Facility</span>
            </button>
          </div>
        )}
      </div>

      <div className="mb-8 relative w-full max-w-md animate-fade-in-down">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200/60 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all shadow-sm"
          placeholder="Search by location or commodity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {filtered.map(w => {
          const utilization = (w.currentStockMt / w.capacityMt) * 100;
          return (
            <div key={w.id} className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 p-6 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 tracking-tight">{w.location}</h3>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider mt-1 ${getStatusColor(w.status)}`}>
                      {w.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Commodity</span>
                  <span className="text-sm font-semibold text-gray-900">{w.commodity}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Current Stock (MT)</span>
                  <span className="text-sm font-bold text-gray-900">{w.currentStockMt}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Total Capacity (MT)</span>
                  <span className="text-sm font-semibold text-gray-900">{w.capacityMt}</span>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Utilization</span>
                    <span className="text-sm font-bold text-gray-900">{utilization.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${w.status === 'FULL' ? 'bg-red-500' : 'bg-gray-900'}`} 
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
             <p className="text-gray-400 text-sm">No warehouses found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Add Warehouse Facility</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Location Name</label>
                <input type="text" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.location ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.location} onChange={e => {setFormData({...formData, location: e.target.value}); setErrors({...errors, location: null})}} placeholder="e.g. Pune Central Hub" />
                {errors.location && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.location}</p>}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Supported Commodity</label>
                <input type="text" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})} placeholder="e.g. Rice, Wheat or Mixed" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Capacity (MT)</label>
                  <input type="number" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.capacityMt ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.capacityMt} onChange={e => {setFormData({...formData, capacityMt: e.target.value}); setErrors({...errors, capacityMt: null})}} />
                  {errors.capacityMt && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.capacityMt}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Initial Stock (MT)</label>
                  <input type="number" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.currentStockMt ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.currentStockMt} onChange={e => {setFormData({...formData, currentStockMt: e.target.value}); setErrors({...errors, currentStockMt: null})}} />
                  {errors.currentStockMt && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.currentStockMt}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                <button type="button" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-full transition-colors" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-full transition-colors shadow-sm">Add Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
