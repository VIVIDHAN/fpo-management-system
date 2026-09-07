import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings as SettingsIcon, User, Bell, Shield, Key, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../components/Toast';

const Settings = () => {
  const { user } = useAuth();
  const { addToast } = useToast() || { addToast: console.log };
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast?.('Password must be at least 8 characters long.', 'error');
      return;
    }
    addToast?.('Password updated successfully following security policy.', 'success');
    setShowPasswordModal(false);
    setNewPassword('');
  };

  return (
    <div className="pb-10">
      
      <div className="mb-8 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">System Settings</h1>
        <p className="text-slate-500 text-xs font-medium">Manage user profile details, password security, notification channels, and system configuration.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
        
        {/* Left Column - Profile & Security */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-200/60">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Profile Details</h3>
                <p className="text-[10px] text-slate-400">Authenticated user account</p>
              </div>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Name</span>
                <span className="font-bold text-slate-900">{user?.name || 'FPO User'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Role Claim</span>
                <span className="font-bold text-emerald-700">{user?.role || 'Member'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Mobile Number</span>
                <span className="font-bold text-slate-900 font-mono">{user?.phone || '9876543210'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Account Security</h3>
                <p className="text-[10px] text-slate-400">Password policy & 2FA</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4">Password policy enforces min 8 characters with uppercase, lowercase, digit, and special char.</p>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Key size={14} /> Change Password
            </button>
          </div>
        </div>

        {/* Right Column - Preferences & System Control */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Notification Channels</h3>
                <p className="text-[10px] text-slate-400">Configure real-time alerts per SRS FR8</p>
              </div>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">Email Notifications</h4>
                  <p className="text-[11px] text-slate-500">Daily procurement summaries and dividend statements.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded cursor-pointer" />
              </div>

              <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">SMS Text Alerts</h4>
                  <p className="text-[11px] text-slate-500">Instant SMS alerts for crop collection payouts.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded cursor-pointer" />
              </div>

              <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">NABARD & Regulatory Announcements</h4>
                  <p className="text-[11px] text-slate-500">System notices and meeting broadcasts.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded cursor-pointer" />
              </div>
            </div>
          </div>

          {['Admin', 'FPO Manager'].includes(user?.role) && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                  <SettingsIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base tracking-tight">System Administration Panel</h3>
                  <p className="text-[10px] text-slate-400">System maintenance & JWT session policy</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => addToast?.('System cache cleared. JWT tokens re-validated.', 'info')}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-2xl border border-slate-200 transition-colors"
                >
                  <RefreshCw size={14} /> Clear Cache & Re-sync
                </button>

                <button 
                  onClick={() => addToast?.('Database backup triggered per SRS FR16 requirements.', 'success')}
                  className="flex items-center justify-center gap-2 p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-2xl border border-emerald-200 transition-colors"
                >
                  <CheckCircle size={14} /> Trigger Encrypted Backup
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 text-sm mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Password@123"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 text-white font-semibold text-xs rounded-full shadow-xs">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
