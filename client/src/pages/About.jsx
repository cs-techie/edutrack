import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Award, Users, Code, Cpu } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        
        {/* About Hero Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
                About Platform
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">About EduTrack Pro</h1>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <strong className="text-blue-700 dark:text-blue-400 font-bold">EduTrack Pro</strong> is an innovative academic management platform designed to transform how educational institutions, faculty, and students interact. By combining attendance analytics, automated solution submission grading, live multi-language code execution, and verified grade cards, EduTrack elevates academic productivity to industry-leading standards.
          </p>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Our platform offers a comprehensive suite of features, including gamified attendance tracking, real-time progress indicators, and seamless MERN stack backend integration. Instructors gain instant visibility into submission statistics, while students enjoy instant feedback, downloadable transcripts, and an embedded programming sandbox.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg dark:shadow-none space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Academic Integrity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Role-based permission controls protecting student grade cards and faculty submission records.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg dark:shadow-none space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Code Execution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">In-browser IDE supporting Python, JavaScript, C, C++, and Java execution for computer science labs.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg dark:shadow-none space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">In-Memory Engine</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Zero-setup fallback database guaranteeing 100% availability even without an active MongoDB server.</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default About;
