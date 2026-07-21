import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-center align-center h-full pt-5">
        <div className="text-primary text-xl font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user's role is not in the allowed list, redirect to a dashboard based on their role, or an error page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
