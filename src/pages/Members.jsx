import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockMembers } from '../utils/mockData';
import { Plus, Search, Upload, FileUp, X, Check, Eye, User, Phone, MapPin, Award, BookOpen } from 'lucide-react';
import { validateName, validatePhone, validateLandHolding } from '../utils/validators';
import { useToast } from '../components/Toast';

const Members = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [villageFilter, setVillageFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', phone: '', village: '', landHolding: '' });
  const [errors, setErrors] = useState({});

  const villages = Array.from(new Set(members.map(m => m.village)));

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.phone.includes(searchTerm);
    const matchesVillage = villageFilter === 'ALL' || m.village === villageFilter;
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchesSearch && matchesVillage && matchesStatus;
  });

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
      village: formData.village || 'Palghar',
      landHolding: parseFloat(formData.landHolding),
      shareCapital: 1000,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    
    setMembers([newMember, ...members]);
    setShowAddModal(false);
    setFormData({ name: '', phone: '', village: '', landHolding: '' });
    setErrors({});
    addToast?.(`Member ${newMember.name} (${newMember.memberId}) registered successfully!`, 'success');
  };

  const handleImportCsv = (e) => {
    e.preventDefault();
    setShowImportModal(false);
    addToast?.('Bulk CSV import completed: 12 farmer member records validated and saved.', 'success');
  };

  const toggleStatus = (id) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        addToast?.(`Member ${m.memberId} status updated to ${nextStatus}`, 'info');
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  return (
    <div className="pb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Member Directory</h1>
          <p className="text-slate-500 text-xs font-medium">Manage farmer registration, land holding records, share capital, and KYC documents.</p>
        </div>
        
        {['Admin', 'FPO Manager', 'Collection Agent'].includes(user?.role) && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Upload size={16} /> <span>Import CSV</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus size={16} /> <span>Add Member</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden animate-fade-up">
        
        {/* Toolbar & Filters */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
              placeholder="Search by name, ID, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select 
              value={villageFilter} 
              onChange={e => setVillageFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
            >
              <option value="ALL">All Villages</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member ID</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Farmer Name</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Village</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Land (Acres)</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Share Capital</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs font-mono font-bold text-slate-900">{m.memberId}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-mono">{m.phone}</td>
                  <td className="py-4 px-6 text-xs text-slate-600">{m.village}</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{m.landHolding} Acres</td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">₹{m.shareCapital?.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => toggleStatus(m.id)}
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${
                        m.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {m.status}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelectedMember(m)} 
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Member Detail"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 text-xs">
                    No members match search criteria "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Register Farmer Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Full Name (Alphabetic & spaces only)</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${errors.name ? 'border-rose-300' : 'border-slate-200'}`} 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Rajesh Kumar" 
                />
                {errors.name && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Phone (Exactly 10 digits)</label>
                <input 
                  type="tel" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${errors.phone ? 'border-rose-300' : 'border-slate-200'}`} 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  placeholder="9876543210" 
                />
                {errors.phone && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Village</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none" 
                    value={formData.village} 
                    onChange={e => setFormData({...formData, village: e.target.value})} 
                    placeholder="Palghar" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Land (Acres)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 focus:outline-none ${errors.landHolding ? 'border-rose-300' : 'border-slate-200'}`} 
                    value={formData.landHolding} 
                    onChange={e => setFormData({...formData, landHolding: e.target.value})} 
                    placeholder="4.5" 
                  />
                  {errors.landHolding && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.landHolding}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">KYC Document Upload</label>
                <div className="border-2 border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50 text-center cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <FileUp size={20} className="mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-semibold text-slate-700">Upload Aadhar / Land Certificate</p>
                  <p className="text-[10px] text-slate-400">PDF, JPG up to 5MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 text-base mb-2">Bulk CSV Member Import</h3>
            <p className="text-xs text-slate-500 mb-4">Select a CSV file formatted according to SRS schema (Name, Phone, Village, LandAcres, ShareCapital).</p>
            
            <div className="border-2 border-dashed border-emerald-300 p-6 rounded-2xl bg-emerald-50/50 text-center mb-6">
              <Upload size={28} className="mx-auto text-emerald-600 mb-2" />
              <p className="text-xs font-bold text-slate-800">members_batch_2024.csv</p>
              <p className="text-[10px] text-slate-500">12 Farmer Records Detected</p>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
              <button onClick={handleImportCsv} className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-xs">Run Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Drawer */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Farmer Profile</h3>
              <button onClick={() => setSelectedMember(null)} className="p-1.5 text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mx-auto mb-3">
                {selectedMember.name.charAt(0)}
              </div>
              <h4 className="text-lg font-bold text-slate-900">{selectedMember.name}</h4>
              <p className="text-xs font-mono text-emerald-600 font-bold">{selectedMember.memberId}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Phone Contact</span>
                <span className="font-bold text-slate-900 font-mono">{selectedMember.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Village Location</span>
                <span className="font-semibold text-slate-900">{selectedMember.village}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Land Holding</span>
                <span className="font-bold text-slate-900">{selectedMember.landHolding} Acres</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Share Capital</span>
                <span className="font-bold text-slate-900">₹{selectedMember.shareCapital?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Joining Date</span>
                <span className="font-semibold text-slate-900">{selectedMember.joiningDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">KYC Status</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><CheckCircle2 size={14} /> VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Members;
