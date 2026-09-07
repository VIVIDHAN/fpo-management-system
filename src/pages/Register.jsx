import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Check, ArrowLeft, Loader2, ShieldCheck, Mail } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validatePassword } from '../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Member', password: '', confirmPassword: '', otp: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleNext = () => {
    const newErrors = {};
    if (step === 1) {
      newErrors.name = validateName(formData.name);
      newErrors.email = validateEmail(formData.email);
      newErrors.phone = validatePhone(formData.phone);
    }
    
    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
    } else {
      setStep(step + 1);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const newErrors = {};
    newErrors.password = validatePassword(formData.password);
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const activeErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.trim().length !== 6) {
      setErrors({ submit: 'Please enter the 6-digit OTP verification code' });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/login', { state: { message: 'Registration successful! Please log in with your credentials.' } });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 font-sans selection:bg-emerald-100">
      
      <div className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer transition hover:opacity-80" onClick={() => navigate('/')}>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <Leaf size={20} />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">AgriCoop</span>
      </div>

      <div className="w-full max-w-[540px] animate-fade-up my-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Create Account</h1>
          <p className="text-slate-500 text-xs font-medium">Register for Agricultural Cooperative & FPO Platform</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80">
          
          {/* Stepper */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 -translate-y-1/2"></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 ${
                  step > num ? 'bg-emerald-600 text-white shadow-xs' : 
                  step === num ? 'border-2 border-slate-900 text-slate-900 shadow-xs' : 
                  'bg-slate-100 text-slate-400'
                }`}>
                  {step > num ? <Check size={14} strokeWidth={3} /> : <span className="font-bold text-xs">{num}</span>}
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${step >= num ? 'text-slate-900' : 'text-slate-400'}`}>
                  {num === 1 ? 'Personal' : num === 2 ? 'Security' : 'OTP Verify'}
                </span>
              </div>
            ))}
          </div>

          {errors.submit && (
            <div className="p-3 mb-5 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-200 text-center animate-shake">
              {errors.submit}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Full Name (Alpha only)</label>
                  <input 
                    type="text" 
                    name="name" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all ${errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200/80 focus:border-emerald-500'}`} 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Rajesh Kumar" 
                  />
                  {errors.name && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Phone (10 digits)</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all ${errors.phone ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200/80 focus:border-emerald-500'}`} 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="10-digit mobile" 
                  />
                  {errors.phone && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all ${errors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200/80 focus:border-emerald-500'}`} 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="rajesh@cooperative.org" 
                />
                {errors.email && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Requested Operational Role</label>
                <select 
                  name="role" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all appearance-none" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="Member">Farmer Member</option>
                  <option value="Collection Agent">Collection Agent</option>
                  <option value="FPO Manager">FPO Manager</option>
                  <option value="Board Member">Board Member</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end">
                <button 
                  type="button" 
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-transform active:scale-[0.98] shadow-xs" 
                  onClick={handleNext}
                >
                  <span>Continue to Password</span> <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Create Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all ${errors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200/80 focus:border-emerald-500'}`} 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password@123" 
                />
                {errors.password && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.password}</p>}
                <p className="text-[10px] text-slate-400 mt-1.5 ml-1 leading-normal">
                  Min 8 chars: uppercase, lowercase, digit, and special char (@$!%*?&).
                </p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all ${errors.confirmPassword ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200/80 focus:border-emerald-500'}`} 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Repeat Password" 
                />
                {errors.confirmPassword && <p className="text-rose-500 text-[11px] mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-3 flex gap-3">
                <button 
                  type="button" 
                  className="flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full transition-colors" 
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 shadow-xs" 
                  onClick={handleSendOtp} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending OTP...</> : 'Send Verification OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Verify Email OTP</h2>
              <p className="text-slate-500 text-xs mb-6">A 6-digit OTP code was sent to <strong className="text-slate-900">{formData.email || 'your email'}</strong>.</p>
              
              <div className="max-w-[200px] mx-auto text-left mb-6">
                <label className="block text-xs font-medium text-slate-500 mb-1 text-center">Enter 6-Digit OTP</label>
                <input 
                  type="text" 
                  name="otp" 
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg tracking-[0.4em] font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all" 
                  value={formData.otp} 
                  onChange={handleChange} 
                  maxLength={6} 
                  placeholder="123456" 
                />
              </div>

              <div className="flex gap-3">
                <button 
                  type="button" 
                  className="flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full transition-colors" 
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 shadow-xs" 
                  onClick={handleRegister} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : 'Complete Registration'}
                </button>
              </div>
            </div>
          )}

        </div>

        {step < 3 && (
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Already registered?{' '}
              <span className="font-semibold text-slate-900 cursor-pointer hover:text-emerald-600 hover:underline" onClick={() => navigate('/login')}>
                Sign in
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
