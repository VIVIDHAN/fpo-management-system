import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProcurements, mockMembers } from '../utils/mockData';
import { Plus, Search, CheckCircle } from 'lucide-react';
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
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Procurement</h1>
          <p className="page-subtitle">Manage collective input and produce aggregation.</p>
        </div>
        
        {['Admin', 'FPO Manager', 'Collection Agent'].includes(user?.role) && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> New Entry
          </button>
        )}
      </div>

      <div className="card-panel mb-6 animate-fade-up">
        <div className="card-body">
          <div className="relative w-full max-w-md">
            <Search className="absolute text-muted" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }} size={18} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Search by member or commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderTop: '1px solid var(--border-color)', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Member</th>
                <th>Commodity</th>
                <th>Grade</th>
                <th>Qty (kg)</th>
                <th>Price/kg</th>
                <th>Total (₹)</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td className="font-medium text-primary">{p.memberName} <br/><span className="text-xs text-muted">{p.memberId}</span></td>
                  <td>{p.commodity}</td>
                  <td><span className={`badge ${p.grade === 'REJECT' ? 'badge-danger' : 'badge-primary'}`}>{p.grade}</span></td>
                  <td>{p.quantityKg}</td>
                  <td>₹{p.pricePerKg}</td>
                  <td className="font-bold">₹{p.totalAmount}</td>
                  <td>
                    <span className={`badge ${p.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {p.paymentStatus === 'PENDING' && ['Admin', 'FPO Manager'].includes(user?.role) && (
                      <button className="btn btn-outline p-2" onClick={() => markAsPaid(p.id)} title="Mark Paid">
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
            <h2 className="text-2xl font-bold mb-4">Record Procurement</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Member ID</label>
                <input type="text" className={`form-input ${errors.memberId ? 'error' : ''}`} value={formData.memberId} onChange={e => setFormData({...formData, memberId: e.target.value})} placeholder="e.g. FPO-M-1001" />
                {errors.memberId && <p className="form-error">{errors.memberId}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Commodity</label>
                  <select className="form-select" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})}>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Grade</label>
                  <select className="form-select" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                    <option value="A">A (Premium)</option>
                    <option value="B">B (Standard)</option>
                    <option value="C">C (Low Quality)</option>
                    <option value="REJECT">REJECT</option>
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
                  <label className="form-label">Price per kg (₹)</label>
                  <input type="number" step="0.5" className={`form-input ${errors.pricePerKg ? 'error' : ''}`} value={formData.pricePerKg} onChange={e => setFormData({...formData, pricePerKg: e.target.value})} />
                  {errors.pricePerKg && <p className="form-error">{errors.pricePerKg}</p>}
                </div>
              </div>

              <div className="d-flex justify-end gap-2 mt-6">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Procurement;
