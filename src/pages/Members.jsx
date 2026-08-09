import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockMembers } from '../utils/mockData';
import { Plus, Search, Upload, Download, FileUp } from 'lucide-react';
import { validateName, validatePhone, validateLandHolding } from '../utils/validators';

const Members = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', village: '', landHolding: '' });
  const [errors, setErrors] = useState({});

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      landHolding: validateLandHolding(formData.landHolding)
    };
    
    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const newMember = {
      id: members.length + 1,
      memberId: `FPO-M-100${members.length + 1}`,
      name: formData.name,
      phone: formData.phone,
      village: formData.village || 'Unknown',
      landHolding: parseFloat(formData.landHolding),
      shareCapital: 0,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    
    setMembers([newMember, ...members]);
    setShowAddModal(false);
    setFormData({ name: '', phone: '', village: '', landHolding: '' });
    setErrors({});
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Member Management</h1>
          <p className="page-subtitle">Manage farmer records, shares, and documents.</p>
        </div>
        
        <div className="d-flex gap-3">
          <button className="btn btn-secondary">
            <Upload size={18} /> Import CSV
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Member
          </button>
        </div>
      </div>

      <div className="card-panel mb-6 animate-fade-up">
        <div className="card-body">
          <div className="relative w-full max-w-md">
            <Search className="absolute text-muted" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }} size={18} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderTop: '1px solid var(--border-color)', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Village</th>
                <th>Land (Acres)</th>
                <th>Share Cap.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td className="text-primary font-medium">{m.memberId}</td>
                  <td>{m.name}</td>
                  <td>{m.phone}</td>
                  <td>{m.village}</td>
                  <td>{m.landAcres}</td>
                  <td>₹{m.shareCapital}</td>
                  <td>
                    <span className={`badge ${m.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted">
              No members found.
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal (Mock) */}
      {showAddModal && (
        <div className="absolute d-flex justify-center align-center" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, position: 'fixed' }}>
          <div className="glass-card bg-white p-6 w-full max-w-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4">Register New Member</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="text" className={`form-input ${errors.phone ? 'error' : ''}`} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Village</label>
                  <input type="text" className="form-input" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Land Holding (Acres)</label>
                  <input type="number" step="0.1" className={`form-input ${errors.landHolding ? 'error' : ''}`} value={formData.landHolding} onChange={e => setFormData({...formData, landHolding: e.target.value})} />
                  {errors.landHolding && <p className="form-error">{errors.landHolding}</p>}
                </div>
              </div>
              
              <div className="form-group border-t pt-4 mt-2" style={{ borderTop: '1px solid var(--border-color)'}}>
                <label className="form-label">Document Verification (Mock)</label>
                <div className="d-flex align-center gap-3 p-3 bg-primary-light text-primary rounded-md border-dashed" style={{ border: '2px dashed var(--primary)'}}>
                  <FileUp size={24} />
                  <div>
                    <p className="font-medium">Upload Aadhar / Land Record</p>
                    <p className="text-xs">Drag and drop or click to browse</p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-end gap-2 mt-6">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
