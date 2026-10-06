import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  GraduationCap, Calendar, BookOpen, Download, Trophy, 
  CheckCircle2, Flame, GitBranch, Code, Target, Sparkles, TrendingUp,
  User, CheckSquare, Crown, Award, Activity, BarChart3
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip
} from 'recharts';

// Mock Data for the advanced 3D-like progress graphs
const skillMatrixData = [
  { subject: 'Academics', A: 90, fullMark: 100 },
  { subject: 'Algorithms', A: 85, fullMark: 100 },
  { subject: 'GitHub / OSS', A: 95, fullMark: 100 },
  { subject: 'Web Dev', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Hackathons', A: 80, fullMark: 100 },
];

const progressData = [
  { month: 'Jan', overall: 30, leetcode: 20 },
  { month: 'Feb', overall: 45, leetcode: 35 },
  { month: 'Mar', overall: 60, leetcode: 55 },
  { month: 'Apr', overall: 85, leetcode: 70 },
  { month: 'May', overall: 95, leetcode: 90 },
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get('/api/dashboard/student');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  const studentInfo = data?.student || {
    name: user?.name || user?.username,
    rollNumber: user?.rollNumber || '2451-23-733-001',
    email: user?.email || `${user?.username}@edutrack.edu`
  };

  const attendanceStats = data?.attendanceStats || { totalPresent: 0, totalMarked: 0, percentage: 88, isEligible: true };
  const resultStats = data?.resultStats || { totalSubjects: 5, averageMarks: 92, totalMarks: 460 };
  const submissions = data?.submissions || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center font-sans">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-bold text-base">
          <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading learning matrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Elite Profile Header */}
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Subtle accent glows */}
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-accent-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-3xl font-extrabold text-brand-600 dark:text-brand-400 shadow-inner">
                {studentInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm" title="Class Rank #3">
                <Crown className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                  {studentInfo.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-[10px] font-extrabold border border-brand-200 dark:border-brand-500/20 uppercase tracking-wider">
                  Level 42
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{studentInfo.email} • {studentInfo.rollNumber}</p>
              
              <div className="flex items-center gap-4 pt-2 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Trophy className="w-4 h-4 text-accent-500" />
                  <span>Rank #3 in Class</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Flame className="w-4 h-4 text-brand-500" />
                  <span>14 Day Streak</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto">
            <button className="gradient-bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Share Matrix</span>
            </button>
            <div className="flex gap-2">
              <div className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-300 flex-1 justify-center">
                <GitBranch className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold">1.2k Commits</span>
              </div>
              <div className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-300 flex-1 justify-center">
                <Code className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold">450 Solved</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visualizations & Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Radar Chart: Holistic Skill Matrix */}
          <div className="glass-card rounded-3xl p-6 flex flex-col col-span-1 lg:col-span-1">
            <div className="mb-2">
              <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-500" />
                Skill Radar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Competence distribution</p>
            </div>
            <div className="flex-grow w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillMatrixData}>
                  <PolarGrid stroke="#cbd5e1" className="dark:stroke-slate-700" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Student" dataKey="A" stroke="#7525ff" strokeWidth={3} fill="#7525ff" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart: Combined Progress Over Time */}
          <div className="glass-card rounded-3xl p-6 flex flex-col col-span-1 lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-500" />
                  Performance Trajectory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Academic vs Code progress</p>
              </div>
              <div className="flex gap-4 text-xs font-bold bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-brand-500"></div>Overall</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent-400"></div>LeetCode</div>
              </div>
            </div>
            <div className="flex-grow w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7525ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7525ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLeetcode" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="overall" stroke="#7525ff" strokeWidth={3} fillOpacity={1} fill="url(#colorOverall)" />
                  <Area type="monotone" dataKey="leetcode" stroke="#2dd4bf" className="dark:stroke-accent-500" strokeWidth={2} fillOpacity={1} fill="url(#colorLeetcode)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Essential Academic Metrics - Unified Color Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: GPA */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current GPA</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">9.2</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400">
              <TrendingUp className="w-4 h-4" />
              <span>+0.4 from last semester</span>
            </div>
          </div>

          {/* Card 2: Attendance */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Attendance</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{attendanceStats.percentage}%</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-accent-600 dark:text-accent-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Eligible for exams</span>
            </div>
          </div>

          {/* Card 3: LeetCode */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Questions Solved</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">450</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>200 Ez</span>
              <span>200 Md</span>
              <span>50 Hd</span>
            </div>
          </div>

          {/* Card 4: Tasks */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending Tasks</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">2</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-500">
              <Link to="/assignments" className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                View Deadlines &rarr;
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;
