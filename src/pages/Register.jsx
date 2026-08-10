import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validatePassword } from '../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Member', password: '', confirmPassword: '', otp: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setOtpSent(true);
        setStep(3);
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'Failed to send OTP' });
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrors({ submit: 'Network error connecting to backend' });
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setErrors({ submit: 'Please enter the OTP' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let roleEnum = formData.role.toUpperCase().replace(' ', '_');
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: roleEnum,
          password: formData.password,
          otp: formData.otp
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        navigate('/login', { state: { message: 'Registration successful! You can now log in.' } });
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'Registration failed' });
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrors({ submit: 'Network error connecting to backend' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 font-sans selection:bg-green-100">
      
      <div className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer transition hover:opacity-70" onClick={() => navigate('/')}>
        <Leaf size={24} className="text-green-600" />
        <span className="text-xl font-semibold tracking-tight text-gray-900">AgriCoop</span>
      </div>

      <div className="w-full max-w-[600px] animate-fade-up my-12">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 text-sm">Join the leading platform for Farmer Producer Organizations.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          
          {/* Apple-style Stepper */}
          <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gray-100 -z-10 -translate-y-1/2"></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  step > num ? 'bg-green-500 text-white shadow-sm' : 
                  step === num ? 'border-2 border-gray-900 text-gray-900 shadow-sm' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step > num ? <Check size={16} strokeWidth={3} /> : <span className="font-semibold text-xs">{num}</span>}
                </div>
                <span className={`text-xs font-medium transition-colors ${step >= num ? 'text-gray-900' : 'text-gray-400'}`}>
                  {num === 1 ? 'Details' : num === 2 ? 'Security' : 'Verify'}
                </span>
              </div>
            ))}
          </div>

          {errors.submit && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center animate-shake">
              {errors.submit}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-fade-up">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Full Name</label>
                  <input type="text" name="name" className={`w-full px-4 py-3 bg-gray-50/50 border rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-green-500'}`} value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Phone Number</label>
                  <input type="tel" name="phone" className={`w-full px-4 py-3 bg-gray-50/50 border rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-green-500'}`} value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Email Address</label>
                <input type="email" name="email" className={`w-full px-4 py-3 bg-gray-50/50 border rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-green-500'}`} value={formData.email} onChange={handleChange} placeholder="john@cooperative.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Requested Role</label>
                <select name="role" className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/60 rounded-2xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all appearance-none" value={formData.role} onChange={handleChange}>
                  <option value="Member">Farmer Member</option>
                  <option value="Collection Agent">Collection Agent</option>
                  <option value="FPO Manager">FPO Manager</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="button" className="flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-medium rounded-full transition-transform active:scale-[0.98] shadow-sm" onClick={handleNext}>
                  <span>Continue</span> <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Create Password</label>
                <input type="password" name="password" className={`w-full px-4 py-3 bg-gray-50/50 border rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-green-500'}`} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
                <p className="text-[11px] text-gray-400 mt-2 ml-1">Minimum 8 characters containing uppercase, lowercase, number, and special character.</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Confirm Password</label>
                <input type="password" name="confirmPassword" className={`w-full px-4 py-3 bg-gray-50/50 border rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200/60 focus:border-green-500'}`} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors" onClick={() => setStep(1)}>
                  <ArrowLeft size={18} />
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-black text-white font-medium rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 shadow-sm" onClick={handleSendOtp} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm mb-8">We've sent a verification code to <strong className="text-gray-900 font-semibold">{formData.email}</strong>.</p>
              
              <div className="max-w-[240px] mx-auto text-left mb-8">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Verification Code</label>
                <input 
                  type="text" 
                  name="otp" 
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/60 rounded-2xl text-center text-xl tracking-[0.5em] text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all font-mono" 
                  value={formData.otp} 
                  onChange={handleChange} 
                  maxLength={6} 
                  placeholder="000000" 
                />
              </div>

              <div className="flex gap-3">
                <button type="button" className="flex items-center justify-center px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors" onClick={() => setStep(2)}>
                   <ArrowLeft size={18} />
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-transform active:scale-[0.98] disabled:opacity-70 shadow-sm" onClick={handleRegister} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : 'Complete Registration'}
                </button>
              </div>
            </div>
          )}

        </div>

        {step < 3 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <span className="font-semibold text-gray-900 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                Sign in instead
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
