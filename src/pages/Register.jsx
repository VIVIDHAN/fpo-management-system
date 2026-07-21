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
    // clear error on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleNext = () => {
    const newErrors = {};
    if (step === 1) {
      newErrors.name = validateName(formData.name);
      newErrors.email = validateEmail(formData.email);
      newErrors.phone = validatePhone(formData.phone);
    }
    
    // filter out nulls
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
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1000);
  };

  return (
    <div className="d-flex justify-center align-center h-full min-h-screen pt-5 pb-5">
      <div className="w-full max-w-lg px-4 animate-fade-in-up">
        <div className="glass-card p-8">
          
          <div className="text-center mb-6">
            <div className="d-flex justify-center align-center mb-3">
              <div className="p-3 bg-primary-light text-primary rounded-full shadow-glow">
                <Leaf size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Join FPO Portal</h1>
            <p className="text-muted mt-2">Register for your cooperative account</p>
          </div>

          {/* Stepper */}
          <div className="d-flex justify-between mb-8 relative">
            <div className="absolute" style={{ top: '15px', left: '10%', right: '10%', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="d-flex flex-column align-center relative" style={{ zIndex: 1 }}>
                <div className={`d-flex justify-center align-center rounded-full mb-2 ${step >= num ? 'bg-primary text-white' : 'bg-white text-muted border-color'}`} style={{ width: '32px', height: '32px', border: step >= num ? 'none' : '1px solid var(--border-color)' }}>
                  {step > num ? <Check size={16} /> : num}
                </div>
                <span className="text-xs text-muted font-medium">{num === 1 ? 'Details' : num === 2 ? 'Security' : 'Complete'}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} placeholder="John Doe" />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number (10 digits)</label>
                <input type="tel" name="phone" className={`form-input ${errors.phone ? 'error' : ''}`} value={formData.phone} onChange={handleChange} placeholder="9876543210" />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Requested Role</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="Member">Farmer Member</option>
                  <option value="Collection Agent">Collection Agent</option>
                  <option value="FPO Manager">FPO Manager</option>
                </select>
              </div>

              <button type="button" className="btn btn-primary w-full mt-4" onClick={handleNext}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-in-right">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" name="password" className={`form-input ${errors.password ? 'error' : ''}`} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                {errors.password && <p className="form-error">{errors.password}</p>}
                <p className="text-xs text-muted mt-1">Must be 8+ chars with uppercase, lowercase, digit & special char.</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" className={`form-input ${errors.confirmPassword ? 'error' : ''}`} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="button" className="btn btn-secondary flex-1" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="button" className="btn btn-primary flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-in-up py-5">
              <div className="d-flex justify-center mb-4">
                <div className="p-4 bg-success-light text-success rounded-full">
                  <Check size={48} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-success mb-2">Registration Successful!</h2>
              <p className="text-muted mb-6">Your account has been created. An OTP has been sent to your email for verification. Once verified, a supervisor must approve your account.</p>
              <button type="button" className="btn btn-primary w-full" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </div>
          )}

          {step < 3 && (
            <div className="mt-6 text-center text-sm text-muted">
              <p>Already have an account? <span className="text-primary cursor-pointer font-medium" onClick={() => navigate('/login')}>Sign In</span></p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;
