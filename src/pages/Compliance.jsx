import React, { useState } from 'react';
import { mockDocuments, mockAuditLogs } from '../utils/mockData';
import { ShieldCheck, FileText, Shield, Lock, Eye, Download, AlertCircle, Clock } from 'lucide-react';
import { useToast } from '../components/Toast';

const Compliance = () => {
  const { addToast } = useToast() || { addToast: console.log };
  const [activeTab, setActiveTab] = useState('documents');

  const handleDownloadDoc = (title) => {
    addToast?.(`Downloading document: ${title}...`, 'info');
  };

  return (
    <div className="pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Compliance & Audit Repository</h1>
          <p className="text-slate-500 text-xs font-medium">Manage legal FPO documentation, regulatory filings, and immutable system audit logs.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'documents' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Document Repository
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'audit' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            System Audit Trail Logs
          </button>
        </div>
      </div>

      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden animate-fade-up">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Official FPO Documents</h3>
              <p className="text-slate-500 text-xs">Repository of MOA, NABARD agreements, APMC licenses, and governance documents.</p>
            </div>
            <button 
              onClick={() => addToast?.('Opening Document Upload Modal...', 'info')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Upload Document
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document Title</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Version</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-900">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600">{doc.category}</td>
                    <td className="py-4 px-6 text-xs font-mono font-semibold text-slate-700">{doc.version}</td>
                    <td className="py-4 px-6 text-xs text-slate-600">{doc.expiryDate}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        doc.status === 'EXPIRING_SOON' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDownloadDoc(doc.title)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Download Document"
                      >
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden animate-fade-up">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2">
                <Lock size={18} className="text-emerald-600" /> Tamper-Evident Audit Trail
              </h3>
              <p className="text-slate-500 text-xs">Immutable security log recording all user access, data modifications, timestamps, and declared purpose.</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              AES-256 Encrypted Logs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User Identity</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Action Type</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target Resource</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">IP Address</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Declared Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-slate-500 flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" /> {log.timestamp}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {log.user} <span className="text-[10px] font-normal text-slate-400">({log.role})</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{log.target}</td>
                    <td className="py-4 px-6 text-slate-500">{log.ip}</td>
                    <td className="py-4 px-6 text-slate-700 font-sans text-xs">{log.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Compliance;
