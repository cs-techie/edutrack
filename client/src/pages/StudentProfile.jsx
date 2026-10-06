import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, GitBranch, Code, Edit2, Save, X, Book } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    githubProfile: '',
    leetcodeProfile: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setProfile(res.data);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          githubProfile: res.data.githubProfile || '',
          leetcodeProfile: res.data.leetcodeProfile || '',
          bio: res.data.bio || ''
        });
      } catch (err) {
        toast.error('Failed to load profile');
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('/api/profile', formData);
      setProfile(res.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center font-sans">
        <div className="text-center p-8 glass-card rounded-3xl max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Profile Not Found</h2>
          <p className="text-slate-500 mb-6">Could not load your profile. Please try logging in again.</p>
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }} 
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="h-32 gradient-bg-primary relative">
             <div className="absolute -right-32 -top-32 w-96 h-96 bg-brand-400/20 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-8">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl font-extrabold text-brand-600 dark:text-brand-400 shadow-lg relative z-10">
                {profile?.name?.charAt(0)?.toUpperCase() || profile?.username?.charAt(0)?.toUpperCase()}
              </div>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 mb-2"
              >
                {isEditing ? <><Save className="w-4 h-4" /> Save Profile</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-1">
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Full Name" />
                  ) : (
                    profile.name || profile.username
                  )}
                </h1>
                <p className="text-slate-500 font-medium">@{profile.username} • {profile.role}</p>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-slate-400 absolute ml-3" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bio</label>
                    <div className="flex items-center">
                      <Book className="w-5 h-5 text-slate-400 absolute ml-3" />
                      <input type="text" name="bio" value={formData.bio} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white" placeholder="A short bio..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">GitHub Profile</label>
                    <div className="flex items-center">
                      <GitBranch className="w-5 h-5 text-slate-400 absolute ml-3" />
                      <input type="text" name="githubProfile" value={formData.githubProfile} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white" placeholder="https://github.com/username" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">LeetCode Profile</label>
                    <div className="flex items-center">
                      <Code className="w-5 h-5 text-slate-400 absolute ml-3" />
                      <input type="text" name="leetcodeProfile" value={formData.leetcodeProfile} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white" placeholder="https://leetcode.com/u/username" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="glass-panel p-4 rounded-xl flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="font-semibold text-slate-900 dark:text-white mt-1">{profile.email || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-xl flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                      <Book className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio</p>
                      <p className="font-semibold text-slate-900 dark:text-white mt-1">{profile.bio || 'Not provided'}</p>
                    </div>
                  </div>

                  <a 
                    href={profile.githubProfile || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`glass-panel p-4 rounded-xl flex items-start gap-4 transition-transform ${profile.githubProfile ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
                  >
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <GitBranch className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GitHub</p>
                      <p className="font-semibold text-brand-600 dark:text-brand-400 mt-1 break-all">{profile.githubProfile || 'Not linked'}</p>
                    </div>
                  </a>

                  <a 
                    href={profile.leetcodeProfile || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`glass-panel p-4 rounded-xl flex items-start gap-4 transition-transform ${profile.leetcodeProfile ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
                  >
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">LeetCode</p>
                      <p className="font-semibold text-brand-600 dark:text-brand-400 mt-1 break-all">{profile.leetcodeProfile || 'Not linked'}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="mt-8 flex justify-end">
                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mr-4">Cancel</button>
                 <button onClick={handleSave} className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md">Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
