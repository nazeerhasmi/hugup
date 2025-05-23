import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatList from '../Chat/ChatList';
import ChatWindow from '../Chat/ChatWindow';
import WelcomeScreen from '../Chat/WelcomeScreen';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';
import { useApp } from '../../context/AppContext';

const MainLayout = () => {
  const { activeChat, theme } = useApp();
  const [activeView, setActiveView] = useState('chats'); // chats, status, communities, settings, profile

  const renderMainContent = () => {
    if (activeView === 'settings') {
      return <Settings onBack={() => setActiveView('chats')} />;
    }
    
    if (activeView === 'profile') {
      return <Profile onBack={() => setActiveView('chats')} />;
    }

    return (
      <div className="flex flex-1 h-full">
        {/* Chat List Panel */}
        <div className="w-full md:w-96 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col">
          <ChatList activeView={activeView} setActiveView={setActiveView} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <ChatWindow />
          ) : (
            <WelcomeScreen />
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex h-screen bg-[var(--bg-primary)] ${theme}`}
    >
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderMainContent()}
      </div>
    </motion.div>
  );
};

export default MainLayout;