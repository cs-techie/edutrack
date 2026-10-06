import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Award, GraduationCap, Printer, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getGradeLetter = (marks) => {
  const num = parseFloat(marks);
  if (isNaN(num)) return { letter: 'N/A', color: 'bg-slate-500 text-white', status: 'PENDING' };
  if (num >= 90) return { letter: 'A+', color: 'bg-emerald-600 text-white', status: 'PASS WITH DISTINCTION' };
  if (num >= 80) return { letter: 'A', color: 'bg-emerald-500 text-white', status: 'PASS' };
  if (num >= 70) return { letter: 'B', color: 'bg-blue-600 text-white', status: 'PASS' };
  if (num >= 50) return { letter: 'C', color: 'bg-amber-500 text-white', status: 'PASS' };
  return { letter: 'F', color: 'bg-red-500 text-white', status: 'FAIL' };
};

const StudentViewResults = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState({ name: user?.name || user?.username, rollNumber: user?.rollNumber || '2451-23-733-001' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('/api/results/my-results');
        setResults(res.data.results || []);
        if (res.data.student) setStudentInfo(res.data.student);
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const totalMarks = results.reduce((acc, r) => acc + (parseFloat(r.marks) || 0), 0);
  const avgMarks = results.length > 0 ? parseFloat((totalMarks / results.length).toFixed(1)) : 0;
  const overallGrade = getGradeLetter(avgMarks);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center items-center font-sans">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-bold text-base">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading official grade transcript...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg-emerald text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Export Official PDF Transcript</span>
          </button>
        </div>

        {/* Grade Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Official Semester Transcript
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Academic Results Card for {studentInfo.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Roll Number: <strong className="font-mono text-slate-800 dark:text-slate-200">{studentInfo.rollNumber}</strong> • Verified Academic Record
              </p>
            </div>

            {results.length > 0 && (
              <div className="text-right">
                <span className={`inline-block px-4 py-1.5 rounded-2xl text-xs font-extrabold shadow-sm ${overallGrade.color}`}>
                  Grade {overallGrade.letter} ({overallGrade.status})
                </span>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                  Overall Average: <strong>{avgMarks} / 100</strong>
                </p>
              </div>
            )}
          </div>

          {/* Results Subject Matrix */}
          {results.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Subject Performance Breakdown:</h3>

              <div className="grid grid-cols-1 gap-4">
                {results.map((res, idx) => {
                  const grade = getGradeLetter(res.marks);
                  const marksNum = Number(res.marks) || 0;
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white">{res.subject}</h4>
                            <p className="text-xs text-slate-500">Maximum Score: 100 Marks</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold ${grade.color}`}>
                            Grade {grade.letter}
                          </span>
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">{res.marks} Marks</p>
                        </div>
                      </div>

                      {/* Visual Score Progress Bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full gradient-bg-emerald transition-all duration-500"
                          style={{ width: `${Math.min(marksNum, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 italic">
              No examination results published for your student account yet.
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default StudentViewResults;
