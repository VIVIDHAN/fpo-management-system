import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './pages/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import Members from './pages/Members';
import Procurement from './pages/Procurement';
import Sales from './pages/Sales';
import Warehouse from './pages/Warehouse';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardOverview />} />
            
            <Route path="members" element={
              <ProtectedRoute allowedRoles={['Admin', 'FPO Manager', 'Board Member', 'Member']}>
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
            
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
