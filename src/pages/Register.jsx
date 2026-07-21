import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Check } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validatePassword } from '../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Member', password: '', confirmPassword: ''
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

  const handleSubmit = async (e) => {
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
    }, 1200);
  };

  return (
    <div className="d-flex justify-center align-center min-h-screen bg-auth py-12 px-4 relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute rounded-full bg-primary" style={{ opacity: 0.05, width: '500px', height: '500px', top: '-100px', left: '-100px' }}></div>
      <div className="absolute rounded-full" style={{ background: 'var(--secondary)', opacity: 0.04, width: '400px', height: '400px', bottom: '-100px', right: '-100px' }}></div>

      {/* Constrained 650px container */}
      <div className="w-full animate-fade-up z-10" style={{ maxWidth: '650px' }}>
        
        <div className="text-center mb-8">
          <div className="d-flex justify-center align-center mb-4 cursor-pointer" onClick={() => navigate('/')}>
            <Leaf size={40} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Create your account</h1>
          <p className="text-subheading">Join the leading platform for Farmer Producer Organizations.</p>
        </div>

        <div className="saas-card" style={{ padding: '2.5rem' }}>
          
          {/* Elegant Stepper */}
          <div className="d-flex justify-between mb-10 relative px-4">
            <div className="absolute" style={{ top: '16px', left: '15%', right: '15%', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="d-flex flex-column align-center relative" style={{ zIndex: 1 }}>
                <div 
                  className={`d-flex justify-center align-center rounded-full mb-3 transition-normal ${step >= num ? 'text-white' : 'bg-white text-muted border-color'}`} 
                  style={{ 
                    width: '34px', height: '34px', 
                    background: step >= num ? 'var(--primary)' : 'white',
                    border: step >= num ? 'none' : '2px solid var(--border-color)',
                    boxShadow: step >= num ? '0 0 10px var(--primary-glow)' : 'none'
                  }}>
                  {step > num ? <Check size={18} strokeWidth={3} /> : <span className="font-semibold text-sm">{num}</span>}
                </div>
                <span className={`text-sm font-medium ${step >= num ? 'text-main' : 'text-muted'}`}>
                  {num === 1 ? 'Personal Details' : num === 2 ? 'Security Setup' : 'Done'}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-up">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" className={`form-input ${errors.phone ? 'error' : ''}`} value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Work Email Address</label>
                <input type="email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} placeholder="john@cooperative.com" />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Requested Role</label>
                <select name="role" className="form-input" value={formData.role} onChange={handleChange}>
                  <option value="Member">Farmer Member</option>
                  <option value="Collection Agent">Collection Agent</option>
                  <option value="FPO Manager">FPO Manager</option>
                </select>
              </div>

              <div className="d-flex justify-end mt-8">
                <button type="button" className="btn btn-primary btn-large" onClick={handleNext}>
                  Continue to Security <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <div className="form-group">
                <label className="form-label">Create Password</label>
                <input type="password" name="password" className={`form-input ${errors.password ? 'error' : ''}`} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                {errors.password && <p className="form-error">{errors.password}</p>}
                <p className="text-xs text-muted mt-2">Minimum 8 characters containing uppercase, lowercase, number, and special character.</p>
              </div>
              
              <div className="form-group mb-8">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" className={`form-input ${errors.confirmPassword ? 'error' : ''}`} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>

              <div className="d-flex gap-4">
                <button type="button" className="btn btn-secondary btn-large" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="button" className="btn btn-primary btn-large flex-1 justify-center" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-up py-8">
              <div className="d-flex justify-center mb-6">
                <div className="p-5 bg-green-50 text-primary rounded-full shadow-sm" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Check size={56} strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">Check your email</h2>
              <p className="text-subheading mb-8 mx-auto" style={{ maxWidth: '400px' }}>
                We've sent a verification link to <span className="text-main font-medium">{formData.email}</span>. Please verify your email to access your account.
              </p>
              <button type="button" className="btn btn-primary btn-large w-full justify-center" onClick={() => navigate('/login')}>
                Go to Sign In
              </button>
            </div>
          )}

        </div>

        {step < 3 && (
          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-muted">Already have an account?</span> <span className="text-primary cursor-pointer hover:underline ml-1" onClick={() => navigate('/login')}>Sign in instead</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
