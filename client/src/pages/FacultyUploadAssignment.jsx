import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FacultyUploadAssignment = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('C');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignmentFile) {
      alert('Please select a PDF file to upload.');
      return;
    }

    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('title', title || `${subject} Assignment`);
    formData.append('description', description);
    formData.append('assignmentFile', assignmentFile);

    try {
      const res = await axios.post('/api/assignments/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'Assignment specification published successfully.');
      setFileUrl(res.data.fileUrl || '');
    } catch (err) {
      alert(err.response?.data?.message || 'Error uploading specification');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Faculty Portal
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Upload Assignment Specification</h1>
              <p className="text-xs text-slate-500 mt-1">Publish new course problem statement PDF for students</p>
            </div>

            <button
              onClick={() => navigate('/faculty/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{message}</span>
              </div>
              {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noreferrer" className="underline font-bold text-blue-600">
                  View PDF Specification
                </a>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Course Subject</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="C">C Language</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Assignment Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Lab 3: Pointer & Memory Management"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Instructions / Notes (Optional)</label>
              <textarea 
                rows="3"
                placeholder="Include submission deadlines, guidelines, or format expectations..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Drag & Drop File Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">PDF Document File</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  {assignmentFile ? assignmentFile.name : 'Click to browse specification PDF'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Maximum file size 10MB (.PDF supported)</p>
                <input 
                  type="file" 
                  accept=".pdf" 
                  required
                  onChange={(e) => setAssignmentFile(e.target.files[0])}
                  className="mt-3 text-xs mx-auto block cursor-pointer"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={uploading}
              className="w-full py-3.5 rounded-xl gradient-bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Publishing Assignment...' : 'Publish Course Assignment'}</span>
            </button>
          </form>

        </div>

      </main>
    </div>
  );
};

export default FacultyUploadAssignment;
