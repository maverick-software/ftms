import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import NewStudent from './pages/NewStudent';
import Organizations from './pages/Organizations';
import OrganizationProfile from './pages/OrganizationProfile';
import Courses from './pages/Courses';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import CourseDetails from './pages/CourseDetails';
import Competencies from './pages/Competencies';
import Reports from './pages/Reports';
import Insurance from './pages/Insurance';
import Certifications from './pages/Certifications';
import Settings from './pages/Settings';
import CreateCompetency from './pages/CreateCompetency';
import CompetencyDetails from './pages/CompetencyDetails';
import EditCompetency from './pages/EditCompetency';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/organizations" 
          element={
            <ProtectedRoute>
              <Layout>
                <Organizations />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/organizations/:id" 
          element={
            <ProtectedRoute>
              <Layout>
                <OrganizationProfile />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/students" 
          element={
            <ProtectedRoute>
              <Layout>
                <Students />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/students/new" 
          element={
            <ProtectedRoute>
              <Layout>
                <NewStudent />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/students/:id" 
          element={
            <ProtectedRoute>
              <Layout>
                <StudentProfile />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/courses/new" 
          element={
            <ProtectedRoute>
              <Layout>
                <CreateCourse />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/courses/:id/edit" 
          element={
            <ProtectedRoute>
              <Layout>
                <EditCourse />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/courses/:id" 
          element={
            <ProtectedRoute>
              <Layout>
                <CourseDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/competencies" 
          element={
            <ProtectedRoute>
              <Layout>
                <Competencies />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/competencies/new" 
          element={
            <ProtectedRoute>
              <Layout>
                <CreateCompetency />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/competencies/:id" 
          element={
            <ProtectedRoute>
              <Layout>
                <CompetencyDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/competencies/:id/edit" 
          element={
            <ProtectedRoute>
              <Layout>
                <EditCompetency />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/insurance" 
          element={
            <ProtectedRoute>
              <Layout>
                <Insurance />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/certifications" 
          element={
            <ProtectedRoute>
              <Layout>
                <Certifications />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;