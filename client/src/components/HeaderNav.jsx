import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { BookOpen, Calendar, GraduationCap, Clock, Layers, Info, User, LogOut, Shield, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';

const HeaderNav = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/');
  };

  const dashboardPath = user?.role === 'faculty' ? '/faculty/dashboard' : user?.role === 'student' ? '/student/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/';

  const navLinks = [
    { name: 'Assignments', path: '/assignments', icon: BookOpen },
    { name: 'Attendance', path: '/attendance', icon: Calendar },
    { name: 'Results', path: '/results', icon: GraduationCap },
    { name: 'Schedules', path: '/schedules', icon: Clock },
    { name: 'Services', path: '/services', icon: Layers },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to={dashboardPath} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">EduTrack</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300 border border-brand-200 dark:border-brand-700">PRO</span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">Academic & Learning Management System</p>
          </div>
        </Link>
        
        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 shadow-sm border border-brand-200/60 dark:border-brand-800' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Account / Dark Mode Toggle Action */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-amber-400 transition-all duration-200"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          {user ? (
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 border border-slate-200/80 dark:border-slate-700">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-600 to-accent-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{user.name || user.username}</p>
                  <p className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider">{user.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200/80 dark:border-slate-700 py-2 z-50 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name || user.username}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">EID: {user.rollNumber || user._id?.substring(0, 8) || 'N/A'}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      {user.role} Account Active
                    </span>
                  </div>

                  <div className="py-1">
                    <Link to={dashboardPath} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium" onClick={() => setDropdownOpen(false)}>
                      <User className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium" onClick={() => setDropdownOpen(false)}>
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link to="/services" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
                      <Shield className="w-4 h-4 text-slate-400" />
                      Account Settings & Security
                    </Link>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/"
              className="gradient-bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default HeaderNav;
