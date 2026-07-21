import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings as SettingsIcon, User, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted mt-1">Manage your account preferences and system configurations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
        <div className="flex-column gap-6">
          <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: 'var(--primary)' }}>
            <div className="d-flex align-center gap-3 mb-4">
              <div className="p-2 bg-primary-light text-primary rounded-full">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold">Profile Details</h3>
            </div>
            <div className="flex-column gap-2 text-sm">
              <p><span className="text-muted">Name:</span> <span className="font-medium">{user?.name}</span></p>
              <p><span className="text-muted">Email:</span> <span className="font-medium">{user?.email}</span></p>
              <p><span className="text-muted">Role:</span> <span className="font-medium">{user?.role}</span></p>
              <p><span className="text-muted">Phone:</span> <span className="font-medium">{user?.phone || 'Not Provided'}</span></p>
            </div>
            <button className="btn btn-outline w-full mt-4">Edit Profile</button>
          </div>

          <div className="glass-card p-6">
            <div className="d-flex align-center gap-3 mb-4">
              <div className="p-2 bg-secondary-light text-secondary rounded-full">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold">Security</h3>
            </div>
            <p className="text-sm text-muted mb-4">Update your password and secure your account.</p>
            <button className="btn btn-outline w-full text-secondary" style={{ borderColor: 'var(--secondary)'}}>Change Password</button>
          </div>
        </div>

        <div className="md:col-span-2 flex-column gap-6 delay-100">
          <div className="glass-card p-6">
            <div className="d-flex align-center gap-3 mb-4">
              <div className="p-2 bg-accent-light text-accent rounded-full">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-bold">Notification Preferences</h3>
            </div>
            
            <div className="flex-column gap-4">
              <div className="d-flex justify-between align-center p-3 border-b border-color">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-xs text-muted">Receive daily summaries and transaction receipts.</p>
                </div>
                <input type="checkbox" defaultChecked className="cursor-pointer" style={{ width: '20px', height: '20px' }} />
              </div>
              
              <div className="d-flex justify-between align-center p-3 border-b border-color">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-xs text-muted">Get instant text messages for payment updates.</p>
                </div>
                <input type="checkbox" defaultChecked className="cursor-pointer" style={{ width: '20px', height: '20px' }} />
              </div>
              
              <div className="d-flex justify-between align-center p-3">
                <div>
                  <h4 className="font-medium">System Announcements</h4>
                  <p className="text-xs text-muted">News from the FPO board and upcoming meetings.</p>
                </div>
                <input type="checkbox" defaultChecked className="cursor-pointer" style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
          </div>

          {['Admin', 'FPO Manager'].includes(user?.role) && (
            <div className="glass-card p-6 delay-200">
              <div className="d-flex align-center gap-3 mb-4">
                <div className="p-2 bg-success-light text-success rounded-full">
                  <SettingsIcon size={24} />
                </div>
                <h3 className="text-xl font-bold">System Configuration (Admin)</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="btn btn-secondary justify-start">
                  <Smartphone size={18} /> Manage Mobile App Sync
                </button>
                <button className="btn btn-secondary justify-start text-danger" style={{ borderColor: 'var(--danger-light)' }}>
                  Clear System Cache
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
