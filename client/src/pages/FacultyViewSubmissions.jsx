import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradeInputs, setGradeInputs] = useState({});
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('/api/assignments/submissions');
      setSubmissions(res.data);
      const initialGrades = {};
      const initialFeedbacks = {};
      res.data.forEach(sub => {
        initialGrades[sub._id] = sub.grade || '';
        initialFeedbacks[sub._id] = sub.feedback || '';
      });
      setGradeInputs(initialGrades);
      setFeedbackInputs(initialFeedbacks);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmit = async (subId) => {
    setSavingId(subId);
    setMsg('');
    try {
      await axios.put(`/api/assignments/submissions/${subId}/grade`, {
        grade: gradeInputs[subId],
        feedback: feedbackInputs[subId]
      });
      setMsg('Grade and feedback saved successfully!');
      fetchSubmissions();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error('Error saving grade:', err);
      alert('Failed to save grade');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Assignments</h1>
        
        {msg && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
            {msg}
          </div>
        )}

        {submissions.length > 0 ? (
          <div className="space-y-6">
            {submissions.map((sub) => (
              <div key={sub._id} className="p-5 border border-gray-200 rounded shadow-sm bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Student Name: {sub.studentName}</h3>
                    <p className="text-gray-700 my-1 font-medium">Subject: <span className="text-blue-700">{sub.subject}</span></p>
                    <p className="text-gray-500 text-sm mb-3">
                      Submitted at: {sub.createdAt ? new Date(sub.createdAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  {sub.grade && (
                    <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded border border-green-300">
                      Grade: {sub.grade}
                    </span>
                  )}
                </div>

                {sub.fileUrl ? (
                  <div className="mb-4">
                    <a 
                      href={sub.fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded shadow transition"
                    >
                      📄 Download Submission File
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400 italic mb-4">No file attached</p>
                )}

                {/* Grading & Feedback Section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Grade & Faculty Feedback:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">GRADE / MARKS</label>
                      <input 
                        type="text" 
                        placeholder="e.g. A, 95/100"
                        value={gradeInputs[sub._id] || ''}
                        onChange={(e) => setGradeInputs({...gradeInputs, [sub._id]: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-600 mb-1">FEEDBACK / REMARKS</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Great work on problem 3!"
                        value={feedbackInputs[sub._id] || ''}
                        onChange={(e) => setFeedbackInputs({...feedbackInputs, [sub._id]: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleGradeSubmit(sub._id)}
                    disabled={savingId === sub._id}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-4 py-2 rounded shadow transition"
                  >
                    {savingId === sub._id ? 'Saving...' : 'Save Grade & Feedback'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No student assignments available.</p>
        )}
      </div>
    </div>
  );
};

export default FacultyViewSubmissions;
