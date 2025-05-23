import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Context
import { AppProvider } from './context/AppContext';

// Components
import MainLayout from './components/Layout/MainLayout';
import AuthScreen from './components/Auth/AuthScreen';
import { mockChats, mockContacts, mockUser } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const [contacts, setContacts] = useState(mockContacts);
  const [theme, setTheme] = useState('light');
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    // Simulate authentication check
    const savedAuth = localStorage.getItem('hugup_auth');
    if (savedAuth) {
      setIsAuthenticated(true);
      setUser(mockUser);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser(mockUser);
    localStorage.setItem('hugup_auth', 'true');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppProvider
      value={{
        user,
        chats,
        setChats,
        contacts,
        setContacts,
        theme,
        toggleTheme,
        activeChat,
        setActiveChat,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      <div className={`App ${theme}`}>
        <Router>
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              <AuthScreen key="auth" onLogin={handleLogin} />
            ) : (
              <MainLayout key="main" />
            )}
          </AnimatePresence>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;