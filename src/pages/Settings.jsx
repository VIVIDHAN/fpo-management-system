import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings as SettingsIcon, User, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="pb-10">
      
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Settings</h1>
        <p className="text-gray-500 font-medium">Manage your account preferences and system configurations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
        
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                <User size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg tracking-tight">Profile Details</h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Name</span>
                <span className="font-semibold text-gray-900">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="font-semibold text-gray-900">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Role</span>
                <span className="font-semibold text-gray-900">{user?.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Phone</span>
                <span className="font-semibold text-gray-900">{user?.phone || 'Not Provided'}</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium rounded-xl transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Shield size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg tracking-tight">Security</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-6">Update your password and secure your account.</p>
            <button className="w-full py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium rounded-xl transition-colors shadow-sm">
              Change Password
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Bell size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg tracking-tight">Notification Preferences</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5">Email Notifications</h4>
                  <p className="text-xs text-gray-500">Receive daily summaries and transaction receipts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5">SMS Alerts</h4>
                  <p className="text-xs text-gray-500">Get instant text messages for payment updates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5">System Announcements</h4>
                  <p className="text-xs text-gray-500">News from the FPO board and upcoming meetings.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          {['Admin', 'FPO Manager'].includes(user?.role) && (
            <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <SettingsIcon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg tracking-tight">System Configuration</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-colors shadow-sm">
                  <Smartphone size={18} className="text-gray-500" /> Manage Mobile Sync
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-medium rounded-xl transition-colors shadow-sm">
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
