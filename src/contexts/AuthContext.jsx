import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check local storage for mocked session
    const storedUser = localStorage.getItem('fpo_mock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('fpo_mock_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { identifier, password } = credentials;
    
    // MOCK ACCOUNTS
    const mockAccounts = {
      'admin': { id: 'U001', name: 'System Admin', email: 'admin@fpo.com', role: 'Admin', phone: '9876543210' },
      'manager': { id: 'U002', name: 'FPO Manager', email: 'manager@fpo.com', role: 'FPO Manager', phone: '8765432109' },
      'board': { id: 'U003', name: 'Board Member', email: 'board@fpo.com', role: 'Board Member', phone: '7654321098' },
      'agent': { id: 'U004', name: 'Collection Agent', email: 'agent@fpo.com', role: 'Collection Agent', phone: '6543210987' },
      'member': { id: 'M001', name: 'Farmer John', email: 'member@fpo.com', role: 'Member', phone: '5432109876', memberId: 'FPO-M-1001' },
      'guest': { id: 'G001', name: 'Guest User', email: 'guest@fpo.com', role: 'Guest', phone: '4321098765' }
    };

    const userKey = identifier.split('@')[0].toLowerCase();
    
    // Simple mock check
    if (mockAccounts[userKey] && password === 'Password@123') {
      const userData = mockAccounts[userKey];
      setUser(userData);
      localStorage.setItem('fpo_mock_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData };
    }
    
    setLoading(false);
    return { success: false, message: 'Invalid credentials. Please use an admin, manager, board, agent, member, or guest account with Password@123' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fpo_mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
