import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Radio, 
  Archive, 
  Star, 
  Settings, 
  Moon, 
  Sun,
  LogOut,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ activeView, setActiveView }) => {
  const { user, theme, toggleTheme, setIsAuthenticated } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  const navigationItems = [
    { id: 'chats', icon: MessageCircle, label: 'Chats', badge: 3 },
    { id: 'status', icon: Radio, label: 'Status', badge: null },
    { id: 'communities', icon: Users, label: 'Communities', badge: null },
    { id: 'archived', icon: Archive, label: 'Archived', badge: null },
    { id: 'starred', icon: Star, label: 'Starred', badge: null }
  ];

  const handleLogout = () => {
    localStorage.removeItem('hugup_auth');
    setIsAuthenticated(false);
  };

  return (
    <div className="w-16 bg-[var(--bg-tertiary)] flex flex-col items-center py-4 border-r border-[var(--border-color)]">
      {/* User Avatar */}
      <motion.div
        className="relative mb-6 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => setActiveView('profile')}
      >
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--accent-color)]"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-tertiary)]"></div>
      </motion.div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`relative p-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id
                ? 'bg-[var(--accent-color)] text-white'
                : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={item.label}
          >
            <item.icon size={20} />
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        {/* Settings */}
        <motion.button
          onClick={() => setActiveView('settings')}
          className={`p-3 rounded-xl transition-all ${
            activeView === 'settings'
              ? 'bg-[var(--accent-color)] text-white'
              : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <Settings size={20} />
        </motion.button>

        {/* Menu */}
        <div className="relative">
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="More options"
          >
            <MoreVertical size={20} />
          </motion.button>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-full left-full ml-2 mb-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg py-2 min-w-[150px] z-50"
            >
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--hover-bg)] flex items-center gap-3"
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;