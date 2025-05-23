import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Database,
  HelpCircle,
  Palette,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Lock,
  Eye,
  MessageSquare,
  Phone,
  Clock,
  Download,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Settings = ({ onBack }) => {
  const { theme, toggleTheme, user } = useApp();
  const [activeSection, setActiveSection] = useState(null);

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Privacy', icon: Shield, description: 'Last seen, profile photo, status' },
        { label: 'Security', icon: Lock, description: 'Two-step verification, change number' },
        { label: 'Profile', icon: User, description: 'Name, about, phone number' }
      ]
    },
    {
      title: 'Chats',
      icon: MessageSquare,
      items: [
        { label: 'Chat Backup', icon: Database, description: 'Back up to Google Drive' },
        { label: 'Chat History', icon: Clock, description: 'Export, clear, delete' },
        { label: 'Wallpaper', icon: Palette, description: 'Change chat wallpaper' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Messages', icon: MessageSquare, description: 'Sound, vibration, light' },
        { label: 'Groups', icon: User, description: 'Sound, vibration, light' },
        { label: 'Calls', icon: Phone, description: 'Ringtone, vibration' }
      ]
    },
    {
      title: 'Storage and data',
      icon: Database,
      items: [
        { label: 'Network usage', icon: Globe, description: 'Wi-Fi, cellular data usage' },
        { label: 'Media auto-download', icon: Download, description: 'Voice messages, photos, videos' },
        { label: 'Storage usage', icon: Smartphone, description: 'Manage storage' }
      ]
    }
  ];

  const renderSettingsSection = (section) => (
    <div key={section.title} className="mb-6">
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3 px-4">
        {section.title}
      </h3>
      <div className="bg-[var(--bg-secondary)] rounded-lg mx-4">
        {section.items.map((item, index) => (
          <motion.div
            key={item.label}
            className={`flex items-center p-4 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors ${
              index !== section.items.length - 1 ? 'border-b border-[var(--border-color)]' : ''
            }`}
            whileHover={{ x: 4 }}
            onClick={() => setActiveSection(item.label)}
          >
            <div className="w-8 h-8 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mr-3">
              <item.icon size={18} className="text-[var(--accent-color)]" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[var(--text-primary)]">{item.label}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
            </div>
            <ChevronRight size={16} className="text-[var(--text-tertiary)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (activeSection) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col h-full bg-[var(--bg-primary)]"
      >
        {/* Header */}
        <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-3">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setActiveSection(null)}
              className="p-2 -ml-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-primary)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              {activeSection}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={32} className="text-[var(--text-tertiary)]" />
            </div>
            <h3 className="text-[var(--text-primary)] font-semibold mb-2">Settings Panel</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              This would contain specific settings for {activeSection}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full bg-[var(--bg-primary)]"
    >
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-3">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-primary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Settings
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto py-6">
        {/* Profile Section */}
        <div className="px-4 mb-6">
          <motion.div
            className="flex items-center p-4 bg-[var(--bg-secondary)] rounded-lg cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
            whileHover={{ x: 4 }}
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text-primary)] text-lg">{user?.name}</h3>
              <p className="text-[var(--text-secondary)]">{user?.status}</p>
              <p className="text-sm text-[var(--text-tertiary)]">{user?.phone}</p>
            </div>
            <ChevronRight size={16} className="text-[var(--text-tertiary)]" />
          </motion.div>
        </div>

        {/* Theme Toggle */}
        <div className="px-4 mb-6">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center">
                  {theme === 'light' ? 
                    <Sun size={18} className="text-[var(--accent-color)]" /> : 
                    <Moon size={18} className="text-[var(--accent-color)]" />
                  }
                </div>
                <div>
                  <h4 className="font-medium text-[var(--text-primary)]">
                    {theme === 'light' ? 'Light' : 'Dark'} Theme
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Change app appearance
                  </p>
                </div>
              </div>
              <motion.button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-[var(--accent-color)]' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: theme === 'dark' ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map(renderSettingsSection)}

        {/* Help Section */}
        <div className="px-4 mb-6">
          <div className="bg-[var(--bg-secondary)] rounded-lg">
            <motion.div
              className="flex items-center p-4 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
              whileHover={{ x: 4 }}
            >
              <div className="w-8 h-8 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mr-3">
                <HelpCircle size={18} className="text-[var(--accent-color)]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[var(--text-primary)]">Help</h4>
                <p className="text-sm text-[var(--text-secondary)]">FAQ, contact us, terms of service</p>
              </div>
              <ChevronRight size={16} className="text-[var(--text-tertiary)]" />
            </motion.div>
          </div>
        </div>

        {/* App Info */}
        <div className="px-4 text-center">
          <p className="text-xs text-[var(--text-tertiary)]">Hugup v1.0.0</p>
          <p className="text-xs text-[var(--text-tertiary)]">from Meta</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;