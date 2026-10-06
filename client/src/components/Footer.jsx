import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, MessageSquare, ShieldCheck, Heart, Sparkles, X } from 'lucide-react';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-8 pb-6 border-t border-slate-800">
        <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center text-white font-bold shadow-md shadow-brand-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-extrabold text-white tracking-tight">EduTrack Pro</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Empowering educational institutions with real-time attendance analytics, automated grading, live code execution, and streamlined result processing.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-accent-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
                <span>All Systems Operational — In-Memory Engine Active</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform Nav</h4>
              <ul className="space-y-2.5 text-sm font-medium">
                <li><Link to="/assignments" className="hover:text-brand-400 transition-colors">Assignments Hub</Link></li>
                <li><Link to="/attendance" className="hover:text-brand-400 transition-colors">Attendance Tracker</Link></li>
                <li><Link to="/results" className="hover:text-brand-400 transition-colors">Results & Transcripts</Link></li>
                <li><Link to="/schedules" className="hover:text-brand-400 transition-colors">Class Schedules</Link></li>
                <li><Link to="/about" className="hover:text-brand-400 transition-colors">About System</Link></li>
              </ul>
            </div>

            {/* Col 3: Actions & Contact */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support & Feedback</h4>
              <button
                onClick={() => setShowFeedback(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-600/20 mb-4"
              >
                <MessageSquare className="w-4 h-4" />
                Send Feedback
              </button>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-400" />
                  <a href="mailto:edutrack24@gmail.com" className="hover:text-white transition-colors">support@edutrack.edu</a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-400" />
                  <a href="https://facebook.com/edutrack24" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">facebook.com/edutrack24</a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} EduTrack Pro Academic System. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                SSL Encrypted Session Security
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Modal Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">System Feedback</h3>
                <p className="text-xs text-slate-500">Help us improve your EduTrack experience</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Feedback submitted successfully.'); setShowFeedback(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Role / Gender</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Feedback Message</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Share your thoughts or report an issue..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
