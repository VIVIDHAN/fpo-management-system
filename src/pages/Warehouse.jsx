import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockWarehouses } from '../utils/mockData';
import { Plus, Search, MapPin } from 'lucide-react';
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
      case 'ACTIVE': return 'badge-success';
      case 'FULL': return 'badge-danger';
      case 'MAINTENANCE': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Warehouse Management</h1>
          <p className="page-subtitle">Manage storage facilities, capacity, and current stock.</p>
        </div>
        
        {['Admin', 'FPO Manager'].includes(user?.role) && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Facility
          </button>
        )}
      </div>

      <div className="mb-6 relative w-full max-w-md animate-fade-in-down">
        <Search className="absolute text-muted" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }} size={18} />
        <input 
          type="text" 
          className="form-input" 
          style={{ paddingLeft: '2.5rem' }} 
          placeholder="Search by location or commodity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {filtered.map(w => (
          <div key={w.id} className="card-panel p-5 animate-fade-up">
            <div className="d-flex justify-between align-start mb-4">
              <div className="d-flex align-center gap-2">
                <div className="p-2 bg-primary-light text-primary rounded-md">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{w.location}</h3>
                  <span className={`badge ${getStatusColor(w.status)}`}>{w.status}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-column gap-3">
              <div className="d-flex justify-between border-b pb-2" style={{ borderBottom: '1px solid var(--border-color)'}}>
                <span className="text-muted">Stored Commodity</span>
                <span className="font-medium">{w.commodity}</span>
              </div>
              <div className="d-flex justify-between border-b pb-2" style={{ borderBottom: '1px solid var(--border-color)'}}>
                <span className="text-muted">Current Stock (MT)</span>
                <span className="font-bold text-primary">{w.currentStockMt}</span>
              </div>
              <div className="d-flex justify-between border-b pb-2" style={{ borderBottom: '1px solid var(--border-color)'}}>
                <span className="text-muted">Total Capacity (MT)</span>
                <span className="font-medium">{w.capacityMt}</span>
              </div>
              
              <div className="mt-2">
                <div className="d-flex justify-between text-xs mb-1">
                  <span>Utilization</span>
                  <span>{((w.currentStockMt / w.capacityMt) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-border-color rounded-full h-2" style={{ background: 'var(--border-color)'}}>
                  <div 
                    className="h-full rounded-full bg-primary transition-slow" 
                    style={{ width: `${(w.currentStockMt / w.capacityMt) * 100}%`, background: w.status === 'FULL' ? 'var(--danger)' : 'var(--primary)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted">
            No warehouses found matching your search.
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="absolute d-flex justify-center align-center" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, position: 'fixed' }}>
          <div className="glass-card bg-white p-6 w-full max-w-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4">Add Warehouse Facility</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Location Name</label>
                <input type="text" className={`form-input ${errors.location ? 'error' : ''}`} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Pune Central Hub" />
                {errors.location && <p className="form-error">{errors.location}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Supported Commodity</label>
                <input type="text" className="form-input" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})} placeholder="e.g. Rice, Wheat or Mixed" />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Capacity (MT)</label>
                  <input type="number" className={`form-input ${errors.capacityMt ? 'error' : ''}`} value={formData.capacityMt} onChange={e => setFormData({...formData, capacityMt: e.target.value})} />
                  {errors.capacityMt && <p className="form-error">{errors.capacityMt}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Stock (MT)</label>
                  <input type="number" className={`form-input ${errors.currentStockMt ? 'error' : ''}`} value={formData.currentStockMt} onChange={e => setFormData({...formData, currentStockMt: e.target.value})} />
                  {errors.currentStockMt && <p className="form-error">{errors.currentStockMt}</p>}
                </div>
              </div>

              <div className="d-flex justify-end gap-2 mt-6">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
