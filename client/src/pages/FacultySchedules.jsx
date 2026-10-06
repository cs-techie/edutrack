import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Calendar, User, BookOpen, Plus, CheckCircle2 } from 'lucide-react';

const FacultySchedules = () => {
  const [teacher, setTeacher] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [adding, setAdding] = useState(false);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('/api/tools/schedules');
      setSchedules(res.data);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!teacher || !date || !time || !details) {
      alert("Please fill in all fields before adding the schedule.");
      return;
    }

    setAdding(true);
    try {
      await axios.post('/api/tools/schedules', {
        teacher,
        date,
        time,
        details
      });
      setTeacher('');
      setDate('');
      setTime('');
      setDetails('');
      fetchSchedules();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding schedule');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <main className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                Timetable Hub
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Class Schedules & Lecture Slots</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage 24-hour lecture schedules and faculty availability</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{schedules.length} Slots Scheduled</span>
            </div>
          </div>

          {/* Add Schedule Form */}
          <form onSubmit={handleAddSchedule} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 mb-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Add New Class Schedule Slot</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Faculty Teacher Name</label>
                <input 
                  type="text" 
                  placeholder="Prof. Alan Turing" 
                  required 
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Date</label>
                <input 
                  type="date" 
                  required 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-slate-900 dark:text-white dark:[color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Time Slot</label>
                <input 
                  type="text" 
                  placeholder="e.g. 10:00 AM - 11:30 AM" 
                  required 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Class Details / Room Location</label>
              <input 
                type="text" 
                placeholder="e.g. CS101 Lecture Hall B, Data Structures & Algorithms" 
                required 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>

            <button 
              type="submit"
              disabled={adding}
              className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all"
            >
              {adding ? 'Publishing Slot...' : 'Add Schedule Slot'}
            </button>
          </form>

          {/* Schedule List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Upcoming Timetable Slots:</h3>
            
            {schedules.length > 0 ? (
              schedules.map((sch) => (
                <div key={sch._id || sch.timestamp} className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-between hover:border-purple-300 dark:hover:border-purple-500 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sch.details}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                          <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {sch.teacher}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-purple-700 dark:text-purple-400">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 dark:text-purple-500" />
                          {sch.date} ({sch.time})
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                    Confirmed
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-6">No class schedules available.</p>
            )}
          </div>

        </div>

      </main>
    </div>
  );
};

export default FacultySchedules;
