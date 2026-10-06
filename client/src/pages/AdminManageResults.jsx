import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, CheckCircle2, User, BookOpen, Save, Layers } from 'lucide-react';

const AdminManageResults = () => {
  const [username, setUsername] = useState('student1');
  const [subject, setSubject] = useState('Computer Science');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState('');
  const [publishedResults, setPublishedResults] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchResults = async () => {
    try {
      const res = await axios.get('/api/results/all');
      setPublishedResults(res.data);
    } catch (err) {
      console.error('Error fetching all results:', err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getPreviewGrade = (score) => {
    const num = parseFloat(score);
    if (isNaN(num)) return null;
    if (num >= 90) return { letter: 'A+', text: 'Pass with Distinction', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (num >= 80) return { letter: 'A', text: 'Pass', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (num >= 70) return { letter: 'B', text: 'Pass', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (num >= 50) return { letter: 'C', text: 'Pass', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { letter: 'F', text: 'Fail / Retake Needed', color: 'text-red-600 bg-red-50 border-red-200' };
  };

  const preview = getPreviewGrade(marks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !subject || marks === '') {
      alert('Please fill in student username, subject, and marks.');
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const res = await axios.post('/api/results', {
        username,
        subject,
        marks: Number(marks)
      });
      setMessage(res.data.message || 'Result recorded successfully.');
      setMarks('');
      fetchResults();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving result.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Faculty & Admin Results Portal
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Publish & Manage Student Marks
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Insert or update student semester score records with dynamic grade calculation
              </p>
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Student Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. student1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Subject Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Computer Science"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Marks Scored (0 - 100)
                </label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  required
                  placeholder="e.g. 95"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Real-Time Grade Calculation Preview */}
            {preview && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${preview.color}`}>
                <span>Grade Calculated: <strong>Grade {preview.letter}</strong> ({preview.text})</span>
                <span>Automatic Grade Letter Ready</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Publishing Result...' : 'Publish Student Result'}</span>
            </button>
          </form>

          {/* Published Results Table */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Currently Published Student Results Inventory:</h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-4">Student Username</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4 text-center">Marks Score</th>
                    <th className="py-3 px-4 text-center">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {publishedResults.length > 0 ? (
                    publishedResults.map((item) => {
                      const num = Number(item.marks);
                      const letter = num >= 90 ? 'A+' : num >= 80 ? 'A' : num >= 70 ? 'B' : num >= 50 ? 'C' : 'F';
                      return (
                        <tr key={item._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{item.username}</td>
                          <td className="py-3 px-4 font-medium">{item.subject}</td>
                          <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white">{item.marks} / 100</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                              Grade {letter}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-slate-400 italic">No published results found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminManageResults;
