import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    repeat_password: '',
    role: 'student'
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = [];

    if (!formData.fullname || !formData.email || !formData.password || !formData.repeat_password) {
      errs.push("All fields are required.");
    }
    if (formData.password.length < 8) {
      errs.push("Password must be at least 8 characters long.");
    }
    if (formData.password !== formData.repeat_password) {
      errs.push("Passwords do not match.");
    }

    if (errs.length > 0) {
      setErrors(errs);
      setSuccessMsg('');
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      setErrors([]);
      setSuccessMsg(res.message || 'Account registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setErrors([err.response?.data?.message || 'Failed to create account. Username or email may already be taken.']);
      setSuccessMsg('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-bg-primary text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create EduTrack Account</h2>
          <p className="text-xs text-slate-500 mt-1">Join students and faculty across EduTrack Pro</p>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium space-y-1">
            {errors.map((err, index) => (
              <div key={index} className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                required
                placeholder="John Doe"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email" 
                required
                placeholder="john@edutrack.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                required
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                required
                placeholder="Repeat password"
                value={formData.repeat_password}
                onChange={(e) => setFormData({ ...formData, repeat_password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white"
            >
              <option value="student">Student Account</option>
              <option value="faculty">Faculty Account</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all mt-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/" className="font-bold text-blue-600 hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Registration;
