import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatList from '../Chat/ChatList';
import ChatWindow from '../Chat/ChatWindow';
import WelcomeScreen from '../Chat/WelcomeScreen';
import { useApp } from '../../context/AppContext';

const MainLayout = () => {
  const { activeChat, theme } = useApp();
  const [activeView, setActiveView] = useState('chats');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`main-layout ${theme}`}
    >
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="chat-list-container">
        <ChatList activeView={activeView} />
      </div>

      <div className="chat-window">
        {activeChat ? <ChatWindow /> : <WelcomeScreen />}
      </div>
    </motion.div>
  );
};

export default MainLayout;