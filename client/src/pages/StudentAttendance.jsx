import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, XCircle, AlertCircle, Calendar, Clock, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentAttendance = () => {
  const { user } = useContext(AuthContext);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`/api/attendance/student/${user._id}`);
        // Sort by date descending
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendance(sorted);
      } catch (err) {
        console.error('Error fetching detailed attendance:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchAttendance();
  }, [user]);

  // Calculations
  const total = attendance.length;
  const present = attendance.filter(r => r.status === 'present').length;
  const absent = attendance.filter(r => r.status === 'absent').length;
  const late = attendance.filter(r => r.status === 'late').length;
  
  const percentage = total === 0 ? 0 : Math.round(((present + (late * 0.5)) / total) * 100);

  // Subject-wise grouping
  const subjectStats = attendance.reduce((acc, curr) => {
    const sub = curr.subject || 'General';
    if (!acc[sub]) acc[sub] = { total: 0, present: 0, absent: 0, late: 0 };
    acc[sub].total += 1;
    acc[sub][curr.status] += 1;
    return acc;
  }, {});

  const filteredAttendance = attendance.filter(r => 
    (r.subject || 'General').toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(r.date).toLocaleDateString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16">
      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Attendance Records
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Detailed Attendance</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Track your presence, manage your subjects, and maintain your academic standing.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-emerald-500/5 flex items-center gap-6">
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Overall Percentage</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black ${percentage >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {percentage}%
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{present}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Days Present</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-red-100 dark:border-red-900/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{absent}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Days Absent</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{late}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Days Late</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Subject Breakdown */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Subject Breakdown
            </h3>
            <div className="space-y-4">
              {Object.keys(subjectStats).length === 0 && !loading && (
                <p className="text-sm text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  No subjects found in your records.
                </p>
              )}
              {Object.entries(subjectStats).map(([sub, stats]) => {
                const subPerc = Math.round(((stats.present + (stats.late * 0.5)) / stats.total) * 100);
                return (
                  <div key={sub} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{sub}</h4>
                      <span className={`text-sm font-black ${subPerc >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>{subPerc}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full ${subPerc >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${subPerc}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span>Total: {stats.total}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">P: {stats.present}</span>
                      <span className="text-red-500">A: {stats.absent}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Logs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                Attendance Logs
              </h3>
              
              <div className="relative max-w-sm w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by subject or date..."
                  className="pl-10 w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">Loading records...</td>
                      </tr>
                    ) : filteredAttendance.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">No attendance records match your search.</td>
                      </tr>
                    ) : (
                      filteredAttendance.map((record) => (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={record._id} 
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                            {new Date(record.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {record.subject || 'General'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                              record.status === 'present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                              record.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' :
                              'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                            {record.remarks || '-'}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default StudentAttendance;
