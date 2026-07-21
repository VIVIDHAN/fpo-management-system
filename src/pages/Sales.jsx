import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockSalesOrders } from '../utils/mockData';
import { Plus, Search, CheckCircle } from 'lucide-react';
import { validateQuantity, validateName } from '../utils/validators';

const Sales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState(mockSalesOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ buyerName: '', buyerType: 'APMC', commodity: 'Wheat', quantityKg: '', pricePerKg: '' });
  const [errors, setErrors] = useState({});

  const filtered = sales.filter(s => 
    s.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      buyerName: validateName(formData.buyerName),
      quantityKg: validateQuantity(formData.quantityKg)
    };
    
    if (!formData.pricePerKg || isNaN(parseFloat(formData.pricePerKg))) newErrors.pricePerKg = "Valid price is required";

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
    setFormData({ buyerName: '', buyerType: 'APMC', commodity: 'Wheat', quantityKg: '', pricePerKg: '' });
    setErrors({});
  };

  const markAsPaid = (id) => {
    setSales(sales.map(s => s.id === id ? { ...s, paymentReceived: true } : s));
  };

  return (
    <div>
      <div className="d-flex justify-between align-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sales Orders</h1>
          <p className="text-muted mt-1">Manage B2B sales to APMC, e-NAM, and Private Buyers.</p>
        </div>
        
        {['Admin', 'FPO Manager'].includes(user?.role) && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> New Order
          </button>
        )}
      </div>

      <div className="glass-card mb-6 animate-fade-in-up">
        <div className="mb-4 relative w-full max-w-md">
          <Search className="absolute text-muted" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }} size={18} />
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '2.5rem' }} 
            placeholder="Search by buyer or commodity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Buyer Name</th>
                <th>Type</th>
                <th>Commodity</th>
                <th>Qty (kg)</th>
                <th>Price/kg</th>
                <th>Total (₹)</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td className="font-medium text-primary">{s.buyerName}</td>
                  <td><span className="badge badge-primary">{s.buyerType.replace('_', ' ')}</span></td>
                  <td>{s.commodity}</td>
                  <td>{s.quantityKg}</td>
                  <td>₹{s.pricePerKg}</td>
                  <td className="font-bold">₹{(s.quantityKg * s.pricePerKg).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${s.paymentReceived ? 'badge-success' : 'badge-warning'}`}>
                      {s.paymentReceived ? 'RECEIVED' : 'PENDING'}
                    </span>
                  </td>
                  <td>
                    {!s.paymentReceived && ['Admin', 'FPO Manager'].includes(user?.role) && (
                      <button className="btn btn-outline p-2" onClick={() => markAsPaid(s.id)} title="Mark Paid">
                        <CheckCircle size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="absolute d-flex justify-center align-center" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, position: 'fixed' }}>
          <div className="glass-card bg-white p-6 w-full max-w-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4">Create Sales Order</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Buyer Name</label>
                <input type="text" className={`form-input ${errors.buyerName ? 'error' : ''}`} value={formData.buyerName} onChange={e => setFormData({...formData, buyerName: e.target.value})} placeholder="e.g. ITC Agrico" />
                {errors.buyerName && <p className="form-error">{errors.buyerName}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Buyer Type</label>
                  <select className="form-select" value={formData.buyerType} onChange={e => setFormData({...formData, buyerType: e.target.value})}>
                    <option value="APMC">APMC</option>
                    <option value="PRIVATE">Private</option>
                    <option value="E_NAM">e-NAM</option>
                    <option value="EXPORT">Export</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Commodity</label>
                  <select className="form-select" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})}>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Quantity (kg)</label>
                  <input type="number" className={`form-input ${errors.quantityKg ? 'error' : ''}`} value={formData.quantityKg} onChange={e => setFormData({...formData, quantityKg: e.target.value})} />
                  {errors.quantityKg && <p className="form-error">{errors.quantityKg}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Agreed Price/kg (₹)</label>
                  <input type="number" step="0.5" className={`form-input ${errors.pricePerKg ? 'error' : ''}`} value={formData.pricePerKg} onChange={e => setFormData({...formData, pricePerKg: e.target.value})} />
                  {errors.pricePerKg && <p className="form-error">{errors.pricePerKg}</p>}
                </div>
              </div>

              <div className="d-flex justify-end gap-2 mt-6">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
