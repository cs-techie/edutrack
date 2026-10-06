import React from 'react';
import { BookOpen, Layers, Sparkles, MessageSquare, Library, Headphones } from 'lucide-react';

const serviceList = [
  {
    title: 'Assignment Management',
    desc: 'Streamlined submission, automated specification distribution, and instructor grading workflows.',
    icon: BookOpen,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    title: 'LMS Integration',
    desc: 'Seamless integration with modern Learning Management Systems and student record databases.',
    icon: Layers,
    color: 'from-purple-600 to-pink-600'
  },
  {
    title: 'Interactive Code Runner',
    desc: 'In-browser live code execution environment supporting Python, JavaScript, C, C++, Java, and Ruby.',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600'
  },
  {
    title: 'Faculty Evaluation Portal',
    desc: 'Constructive feedback text areas, grade letter assignment (A+ to F), and individual remarks.',
    icon: MessageSquare,
    color: 'from-emerald-600 to-teal-600'
  },
  {
    title: 'Academic Resource Library',
    desc: 'Centralized access to language documentation, tutorials, and verifiable completion certificates.',
    icon: Library,
    color: 'from-cyan-600 to-blue-600'
  },
  {
    title: 'Dedicated Support & Security',
    desc: '24/7 academic helpline, encrypted session authentication, and in-memory fallback reliability.',
    icon: Headphones,
    color: 'from-indigo-600 to-purple-600'
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider inline-block">
            EduTrack Ecosystem Services
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Academic Services</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Discover the comprehensive suite of digital education services designed to simplify academic administration and elevate student learning.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Explore Feature</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
};

export default Services;
