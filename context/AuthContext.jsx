'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/api';

const AuthContext = createContext();

const isTokenValid = (token) => {
  try {
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000;
  if (payload.exp && payload.exp < currentTime) {
    return false;
    }
    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token || !isTokenValid(token)) {
        localStorage.removeItem("token"); // Remove invalid token
        setLoading(false);
        return;
      }
      else {
        setAdmin({ token });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      localStorage.removeItem('adminToken');
      setAdmin(null);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await apiClient.login(credentials);
      localStorage.setItem('adminToken', response.token);
      setAdmin({ token: response.token });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

