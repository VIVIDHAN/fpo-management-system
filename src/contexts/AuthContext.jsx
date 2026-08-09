import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('fpo_user');
    const token = localStorage.getItem('fpo_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('fpo_user');
        localStorage.removeItem('fpo_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    const { identifier, password } = credentials;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { name: data.name, role: data.role, phone: identifier };
        setUser(userData);
        localStorage.setItem('fpo_user', JSON.stringify(userData));
        localStorage.setItem('fpo_token', data.token);
        setLoading(false);
        return { success: true, user: userData };
      } else {
        setLoading(false);
        return { success: false, message: data.error || 'Login failed' };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Network error connecting to backend' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fpo_user');
    localStorage.removeItem('fpo_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
