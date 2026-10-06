import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Calendar, GraduationCap, Clock, Bell, ArrowRight, CheckSquare, FileText, Award } from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { title: 'Posted Assignments', count: '12', icon: BookOpen, color: 'from-blue-500 to-indigo-600', link: '/assignments/upload' },
    { title: 'Attendance Today', count: '94%', icon: Calendar, color: 'from-emerald-500 to-teal-600', link: '/attendance' },
    { title: 'Evaluated Results', count: '100%', icon: GraduationCap, color: 'from-amber-500 to-orange-600', link: '/results' },
    { title: 'Scheduled Slots', count: '8', icon: Clock, color: 'from-purple-500 to-pink-600', link: '/schedules' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      
      {/* Top Announcement Marquee Ticker */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-2.5 px-4 shadow-sm border-b border-blue-800">
        <div className="max-w-[96%] xl:max-w-[1600px] mx-auto flex items-center gap-3 text-xs font-semibold">
          <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold shrink-0 uppercase tracking-wider">
            <Bell className="w-3 h-3 animate-bounce" />
            Notice
          </span>
          <marquee className="text-slate-200">
            Welcome to EduTrack Faculty Portal — Please submit semester assignment solutions and update attendance before 5:00 PM today.
          </marquee>
        </div>
      </div>

      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="gradient-bg-primary rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-blue-100 border border-white/20 mb-3 inline-block">
              Faculty Command Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || user?.username || 'Professor'}!
            </h1>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              Manage student entry records, mark attendance matrix, upload new course assignments, and publish term results with instant validation.
            </p>
          </div>

          <div className="relative z-10 flex gap-3">
            <Link
              to="/faculty/submissions"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-5 py-3 rounded-2xl shadow-lg transition-all text-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Review Student Submissions</span>
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link key={idx} to={s.link} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.title}</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.count}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Core Feature Cards (Original STUDENT ENTRY section 1:1 mapped to modern aesthetics) */}
        <section id="Entry" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">STUDENT ENTRY MODULES</h2>
              <p className="text-xs text-slate-500">Access core academic features and manage student academic workflows</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">4 Modules Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Assignments */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Assignments</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Upload PDF assignment specifications, specify due dates, and grade student submissions.
                </p>
              </div>
              <div className="space-y-2">
                <Link 
                  to="/assignments/upload" 
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>Upload Specification</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/faculty/submissions" 
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors text-center"
                >
                  Check Submissions
                </Link>
              </div>
            </div>

            {/* Box 2: Attendance */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Attendance</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Mark daily student attendance by subject with single-click batch toggles and instant save.
                </p>
              </div>
              <Link 
                to="/attendance" 
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Mark Attendance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Box 3: Results */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Results</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Enter student marks per subject, calculate letter grades, and publish official transcripts.
                </p>
              </div>
              <Link 
                to="/results" 
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Manage Results</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Box 4: Schedules */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Schedules</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  View and manage class time slots, lecture rooms, and 24-hour timetable schedules.
                </p>
              </div>
              <Link 
                to="/schedules" 
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>View Schedules</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default FacultyDashboard;
