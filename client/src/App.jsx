import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';

import LoginHub from './pages/LoginHub';
import Registration from './pages/Registration';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MarkAttendance from './pages/MarkAttendance';
import StudentAttendance from './pages/StudentAttendance';
import FacultyUploadAssignment from './pages/FacultyUploadAssignment';
import StudentSubmitAssignment from './pages/StudentSubmitAssignment';
import FacultyViewSubmissions from './pages/FacultyViewSubmissions';
import AdminManageResults from './pages/AdminManageResults';
import StudentViewResults from './pages/StudentViewResults';
import FacultySchedules from './pages/FacultySchedules';
import ResumeBuilder from './pages/ResumeBuilder';
import Services from './pages/Services';
import About from './pages/About';
import LinksReference from './pages/LinksReference';
import StudentProfile from './pages/StudentProfile';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const wrap = (component) => <PageWrapper>{component}</PageWrapper>;

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#1e293b', color: '#fff', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold' } }} />
      {!isAuthPage && <HeaderNav />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                wrap(user ? (
                  user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> :
                  user.role === 'faculty' ? <Navigate to="/faculty/dashboard" replace /> : 
                  <Navigate to="/student/dashboard" replace />
                ) : (
                  <LoginHub />
                ))
              } 
            />
            <Route path="/register" element={wrap(<Registration />)} />
            
            {/* Dashboards */}
            <Route 
              path="/student/dashboard" 
              element={
                wrap(<ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentDashboard />
                </ProtectedRoute>)
              } 
            />
            <Route 
              path="/faculty/dashboard" 
              element={
                wrap(<ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <FacultyDashboard />
                </ProtectedRoute>)
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                wrap(<ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>)
              } 
            />

            {/* Attendance */}
            <Route 
              path="/attendance" 
              element={
                wrap(user?.role === 'student' ? (
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <StudentAttendance />
                  </ProtectedRoute>
                ) : (
                  <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                    <MarkAttendance />
                  </ProtectedRoute>
                ))
              } 
            />

            {/* Assignments */}
            <Route 
              path="/assignments" 
              element={
                wrap(user?.role === 'student' ? (
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <StudentSubmitAssignment />
                  </ProtectedRoute>
                ) : (
                  <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                    <FacultyUploadAssignment />
                  </ProtectedRoute>
                ))
              } 
            />
            <Route 
              path="/assignments/upload" 
              element={
                wrap(<ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <FacultyUploadAssignment />
                </ProtectedRoute>)
              } 
            />
            <Route 
              path="/student/submit" 
              element={
                wrap(<ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentSubmitAssignment />
                </ProtectedRoute>)
              } 
            />
            <Route 
              path="/faculty/submissions" 
              element={
                wrap(<ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <FacultyViewSubmissions />
                </ProtectedRoute>)
              } 
            />

            {/* Results */}
            <Route 
              path="/results" 
              element={
                wrap(user?.role === 'student' ? (
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <StudentViewResults />
                  </ProtectedRoute>
                ) : (
                  <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                    <AdminManageResults />
                  </ProtectedRoute>
                ))
              } 
            />

            {/* Static & Tools */}
            <Route path="/schedules" element={wrap(<FacultySchedules />)} />
            <Route path="/resume" element={wrap(<ResumeBuilder />)} />
            <Route path="/services" element={wrap(<Services />)} />
            <Route path="/about" element={wrap(<About />)} />
            <Route path="/links" element={wrap(<LinksReference />)} />
            <Route path="/profile" element={wrap(<ProtectedRoute><StudentProfile /></ProtectedRoute>)} />

            {/* Catch all redirect */}
            <Route path="*" element={wrap(<Navigate to="/" replace />)} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
