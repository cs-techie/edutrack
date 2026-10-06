import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Lock, Sparkles, Shield, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginHub = () => {
  const [role, setRole] = useState('student'); // 'student', 'faculty', 'admin'
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuickLogin = (demoRole) => {
    if (demoRole === 'student') {
      setRole('student');
      setFormData({ identifier: 'student1', password: 'password123' });
    } else if (demoRole === 'faculty') {
      setRole('faculty');
      setFormData({ identifier: 'faculty1', password: 'password123' });
    } else {
      setRole('admin');
      setFormData({ identifier: 'admin1', password: 'password123' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      toast.error('Please enter both username/ID and password.');
      return;
    }

    setLoading(true);

    try {
      let loginPayload = {};
      if (role === 'student') {
        loginPayload = { username: formData.identifier, password: formData.password, role: 'student' };
      } else if (role === 'faculty') {
        loginPayload = { faculty_id: formData.identifier, password: formData.password, role: 'faculty' };
      } else {
        loginPayload = { username: formData.identifier, password: formData.password, role: 'admin' };
      }

      const res = await login(loginPayload);
      const userRole = res.user?.role || role;

      toast.success(`Successfully logged in as ${userRole}`);
      if (userRole === 'faculty') {
        navigate('/faculty/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] bg-grid-slate-100 dark:bg-grid-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="max-w-4xl w-full glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 animate-fade-in-up">
        
        {/* Left Col: Hero Branding & Instant Demo Access */}
        <div className="gradient-bg-primary p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-brand-500/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">EduTrack Pro</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold font-display leading-tight mb-4">
              Academic & Learning Management Portal
            </h1>
            <p className="text-brand-100 text-sm leading-relaxed mb-6">
              Streamline attendance marking, solution grading, course analytics, and academic results in one unified platform.
            </p>

            {/* Quick Demo Access Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-200 mb-3">⚡ One-Click Demo Access:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className="px-2.5 py-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-brand-900 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('faculty')}
                  className="px-2.5 py-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-brand-900 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="px-2.5 py-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-brand-900 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-brand-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Real-Time Attendance Percentage Tracker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Interactive Python/JS/C Code Execution Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>PDF Transcript & Certificate Generator</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/20 text-xs text-brand-200 flex items-center justify-between">
            <span>Powered by EduTrack Core</span>
            <span className="font-bold text-white">v2.4 Pro Edition</span>
          </div>
        </div>

        {/* Right Col: Interactive Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In to Your Account</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select your account role to proceed</p>
          </div>

          {/* Role Tabs Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'student' ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('faculty')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'faculty' ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'admin' ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {role === 'faculty' ? 'Faculty ID' : 'Username / Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder={role === 'faculty' ? 'e.g. faculty1' : role === 'admin' ? 'e.g. admin1' : 'e.g. student1'}
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-brand-600 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginHub;
