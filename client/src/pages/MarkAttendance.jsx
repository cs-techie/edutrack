import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Calendar, CheckCircle2, XCircle, Save, CheckSquare } from 'lucide-react';

const MarkAttendance = () => {
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState(user?.subject || 'Computer Science');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/api/attendance/students');
        setStudents(res.data);
      } catch (err) {
        console.error('Error loading students:', err);
      }
    };
    fetchStudents();
  }, []);

  const handleRadioChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (students.length > 0) {
      for (const st of students) {
        if (!attendance[st._id]) {
          alert('Please mark attendance (Present/Absent) for all students.');
          return;
        }
      }
    }

    setSaving(true);
    setMessage('');
    try {
      await axios.post('/api/attendance', {
        date,
        subject,
        attendance
      });
      setMessage('Attendance recorded and saved successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          
          {/* Form Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Faculty Attendance Entry
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mark Attendance for {subject}</h1>
              <p className="text-xs text-slate-500 mt-1">Select date and mark student presence status</p>
            </div>

            {/* Quick Batch Actions */}
            {students.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newAtt = {};
                    students.forEach(s => newAtt[s._id] = 'Present');
                    setAttendance(newAtt);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mark All Present</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newAtt = {};
                    students.forEach(s => newAtt[s._id] = 'Absent');
                    setAttendance(newAtt);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Mark All Absent</span>
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Date Input */}
            <div className="max-w-xs">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Attendance Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Attendance Matrix Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3.5 px-4">Roll Number</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4 text-center">Present Status</th>
                    <th className="py-3.5 px-4 text-center">Absent Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {students.length > 0 ? (
                    students.map((row) => {
                      const isPresent = attendance[row._id] === 'Present';
                      const isAbsent = attendance[row._id] === 'Absent';
                      return (
                        <tr key={row._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{row.rollNumber || 'N/A'}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{row.name || row.username}</td>
                          <td className="py-3.5 px-4 text-center">
                            <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all border ${
                              isPresent ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}>
                              <input 
                                type="radio" 
                                name={`attendance_${row._id}`} 
                                value="Present" 
                                checked={isPresent}
                                onChange={() => handleRadioChange(row._id, 'Present')}
                                className="hidden"
                              />
                              <span>Present</span>
                            </label>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all border ${
                              isAbsent ? 'bg-red-600 text-white font-bold border-red-600 shadow-sm' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}>
                              <input 
                                type="radio" 
                                name={`attendance_${row._id}`} 
                                value="Absent" 
                                checked={isAbsent}
                                onChange={() => handleRadioChange(row._id, 'Absent')}
                                className="hidden"
                              />
                              <span>Absent</span>
                            </label>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 italic">
                        No registered students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button 
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-xl gradient-bg-emerald text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Attendance...' : 'Save & Submit Attendance Matrix'}</span>
            </button>

          </form>

        </div>

      </main>
    </div>
  );
};

export default MarkAttendance;
