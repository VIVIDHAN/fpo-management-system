import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockMembers } from '../utils/mockData';
import { Plus, Search, Upload, FileUp, X } from 'lucide-react';
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
      landAcres: parseFloat(formData.landHolding),
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
    <div className="pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Member Directory</h1>
          <p className="text-gray-500 font-medium">Manage farmer records, shares, and KYC documents.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200/60 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Upload size={18} /> <span>Import CSV</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors shadow-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 overflow-hidden animate-fade-up delay-100">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all shadow-sm"
              placeholder="Search by name or ID..."
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
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Member ID</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Farmer Name</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Village</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Land (Acres)</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Share Capital</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-900">{m.memberId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-mono">{m.phone}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{m.village}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{m.landAcres}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">₹{m.shareCapital?.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${m.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400 text-sm">
                    No members found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Register New Member</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Full Name</label>
                  <input type="text" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.name} onChange={e => {setFormData({...formData, name: e.target.value}); setErrors({...errors, name: null})}} />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Phone</label>
                  <input type="text" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.phone} onChange={e => {setFormData({...formData, phone: e.target.value}); setErrors({...errors, phone: null})}} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Village</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Land Holding (Acres)</label>
                  <input type="number" step="0.1" className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all ${errors.landHolding ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-gray-900'}`} value={formData.landHolding} onChange={e => {setFormData({...formData, landHolding: e.target.value}); setErrors({...errors, landHolding: null})}} />
                  {errors.landHolding && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.landHolding}</p>}
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Document Verification</label>
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors group">
                  <div className="p-3 bg-white text-gray-400 group-hover:text-gray-600 rounded-xl shadow-sm transition-colors">
                    <FileUp size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Upload KYC Documents</p>
                    <p className="text-xs text-gray-500 mt-0.5">Aadhar / Land Record (PDF, JPG)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-2">
                <button type="button" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-full transition-colors" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-full transition-colors shadow-sm">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
