import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: ''
  });

  const [savedResume, setSavedResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get('/api/tools/resume');
        if (res.data && res.data.name) {
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            education: res.data.education || '',
            skills: res.data.skills || '',
            experience: res.data.experience || ''
          });
          setSavedResume(res.data);
        }
      } catch (err) {
        console.error('Error fetching resume:', err);
      }
    };
    fetchResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tools/resume', formData);
      alert('Resume saved successfully!');
      setSavedResume(formData);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving resume');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', margin: 0, padding: 0, minHeight: '100vh' }}>
      <div 
        className="container"
        style={{
          width: '80%',
          maxWidth: '800px',
          margin: '20px auto',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h1 style={{ margin: 0, color: '#333' }}>Student Resume Builder</h1>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              backgroundColor: '#0288d1',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🖨️ Print / Download PDF
          </button>
        </div>
        
        {/* Resume Form */}
        <form id="resumeForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="name" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your full name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="phone" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone:</label>
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              placeholder="Enter your phone number" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="education" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Education:</label>
            <textarea 
              id="education" 
              name="education" 
              placeholder="Enter your education details" 
              required
              rows="3"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            ></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="skills" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Skills:</label>
            <textarea 
              id="skills" 
              name="skills" 
              placeholder="Enter your skills" 
              required
              rows="3"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            ></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="experience" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Experience:</label>
            <textarea 
              id="experience" 
              name="experience" 
              placeholder="Enter your work experience" 
              required
              rows="3"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              style={{ padding: '10px', fontSize: '16px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{
                backgroundColor: '#5cb85c',
                color: 'white',
                border: 'none',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '5px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Save Resume
            </button>
          </div>
        </form>

        {/* Live Formatted Resume Display Section */}
        {savedResume && (
          <div 
            id="resumeDisplay" 
            className="resume-display"
            style={{
              marginTop: '30px',
              padding: '25px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #5cb85c', paddingBottom: '10px' }}>
              <h2 style={{ color: '#333', margin: 0 }}>Formatted Resume Preview</h2>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
              >
                🖨️ Export PDF
              </button>
            </div>

            <div style={{ padding: '15px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h1 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.8em' }}>{savedResume.name}</h1>
              <p style={{ margin: '0 0 15px 0', color: '#7f8c8d', fontSize: '0.95em' }}>
                📧 {savedResume.email} | 📞 {savedResume.phone}
              </p>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ borderBottom: '1px solid #eee', color: '#27ae60', margin: '0 0 8px 0', paddingBottom: '4px' }}>EDUCATION</h3>
                <p style={{ margin: 0, color: '#34495e', whiteSpace: 'pre-line' }}>{savedResume.education}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ borderBottom: '1px solid #eee', color: '#27ae60', margin: '0 0 8px 0', paddingBottom: '4px' }}>TECHNICAL SKILLS</h3>
                <p style={{ margin: 0, color: '#34495e', whiteSpace: 'pre-line' }}>{savedResume.skills}</p>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ borderBottom: '1px solid #eee', color: '#27ae60', margin: '0 0 8px 0', paddingBottom: '4px' }}>PROFESSIONAL EXPERIENCE</h3>
                <p style={{ margin: 0, color: '#34495e', whiteSpace: 'pre-line' }}>{savedResume.experience}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
