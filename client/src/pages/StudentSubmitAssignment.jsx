import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Upload, Download, CheckCircle2, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentSubmitAssignment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [studentName, setStudentName] = useState(user?.name || user?.username || '');
  const [subject, setSubject] = useState('C');
  const [studentAssignment, setStudentAssignment] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchMySubmissions();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('/api/assignments');
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const fetchMySubmissions = async () => {
    try {
      const res = await axios.get('/api/assignments/my-submissions');
      setMySubmissions(res.data);
    } catch (err) {
      console.error('Error fetching my submissions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName) {
      alert('Student name not provided.');
      return;
    }
    if (!studentAssignment) {
      alert('Please select a PDF file to submit.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('student_name', studentName);
    formData.append('subject', subject);
    formData.append('studentAssignment', studentAssignment);

    try {
      const res = await axios.post('/api/assignments/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'Assignment submitted successfully!');
      setStudentAssignment(null);
      fetchMySubmissions();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to upload solution file.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Section 1: Available Course Assignments */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Published Problem Specifications
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Course Assignments
              </h1>
            </div>
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>

          {assignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((item) => (
                <div key={item._id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase">
                      {item.subject}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{item.title || `${item.subject} Assignment`}</h3>
                    {item.description && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{item.description}</p>}
                  </div>

                  {item.fileUrl && (
                    <a 
                      href={item.fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Problem PDF</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-6 text-center">No assignments published by faculty yet.</p>
          )}
        </div>

        {/* Section 2: Solution Submission Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Submit Your Assignment Solution</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload your completed solution in PDF format</p>
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Student Name</label>
                <input 
                  type="text" 
                  required 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Subject</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="C">C Language</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Upload Solution File (.PDF)</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {studentAssignment ? studentAssignment.name : 'Click to select solution PDF file'}
                </p>
                <input 
                  type="file" 
                  accept=".pdf" 
                  required
                  onChange={(e) => setStudentAssignment(e.target.files[0])}
                  className="mt-3 text-xs mx-auto block cursor-pointer"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{submitting ? 'Uploading Solution...' : 'Submit Solution PDF'}</span>
            </button>
          </form>
        </div>

        {/* Section 3: My Submitted Assignments & Faculty Feedback */}
        {mySubmissions.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Submitted Assignments & Evaluation</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review instructor grades and written feedback</p>
            </div>

            <div className="space-y-4">
              {mySubmissions.map((sub) => (
                <div key={sub._id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Subject: {sub.subject}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        Submitted on: {new Date(sub.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                      sub.grade ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {sub.grade ? `Grade: ${sub.grade}` : 'Under Review'}
                    </span>
                  </div>

                  {sub.feedback && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        Faculty Feedback Remark:
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{sub.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default StudentSubmitAssignment;
