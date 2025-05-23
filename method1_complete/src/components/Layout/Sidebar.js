import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Radio, Settings, Moon, Sun, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ activeView, setActiveView }) => {
  const { user, theme, toggleTheme, setIsAuthenticated } = useApp();

  const navigationItems = [
    { id: 'chats', icon: MessageCircle, label: 'Chats' },
    { id: 'status', icon: Radio, label: 'Status' },
    { id: 'communities', icon: Users, label: 'Communities' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('hugup_auth');
    setIsAuthenticated(false);
  };

  return (
    <div className="sidebar">
      <motion.img
        src={user?.avatar}
        alt={user?.name}
        className="sidebar-avatar"
        whileHover={{ scale: 1.1 }}
      />

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`sidebar-nav-item ${activeView === item.id ? 'active' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={item.label}
          >
            <item.icon size={20} />
          </motion.button>
        ))}
      </nav>

      <motion.button
        onClick={toggleTheme}
        className="sidebar-theme-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>

      <motion.button
        onClick={handleLogout}
        className="sidebar-theme-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Logout"
        style={{ marginTop: '10px' }}
      >
        <LogOut size={18} />
      </motion.button>
    </div>
  );
};

export default Sidebar;