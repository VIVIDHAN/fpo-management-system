import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './pages/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import Members from './pages/Members';
import MemberPortal from './pages/MemberPortal';
import Procurement from './pages/Procurement';
import Sales from './pages/Sales';
import Warehouse from './pages/Warehouse';
import Finance from './pages/Finance';
import Analytics from './pages/Analytics';
import Compliance from './pages/Compliance';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Dashboard Layout */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardOverview />} />
                
                <Route path="member-portal" element={<MemberPortal />} />
                
                <Route path="members" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member', 'Collection Agent', 'Member']}>
                    <Members />
                  </ProtectedRoute>
                } />
                
                <Route path="procurement" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Collection Agent', 'Board Member']}>
                    <Procurement />
                  </ProtectedRoute>
                } />
                
                <Route path="sales" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member']}>
                    <Sales />
                  </ProtectedRoute>
                } />
                
                <Route path="warehouse" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member']}>
                    <Warehouse />
                  </ProtectedRoute>
                } />

                <Route path="finance" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member']}>
                    <Finance />
                  </ProtectedRoute>
                } />

                <Route path="analytics" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member']}>
                    <Analytics />
                  </ProtectedRoute>
                } />

                <Route path="compliance" element={
                  <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member']}>
                    <Compliance />
                  </ProtectedRoute>
                } />
                
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
