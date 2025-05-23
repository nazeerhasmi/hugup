import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  ArrowLeft,
  Pin,
  VolumeX,
  Trash2,
  Archive,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

const ChatWindow = () => {
  const { activeChat, setActiveChat } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  if (!activeChat) return null;

  const handleBackClick = () => {
    setActiveChat(null);
  };

  const menuItems = [
    { icon: Pin, label: activeChat.pinned ? 'Unpin chat' : 'Pin chat', action: () => {} },
    { icon: VolumeX, label: activeChat.muted ? 'Unmute' : 'Mute notifications', action: () => {} },
    { icon: Star, label: 'Starred messages', action: () => {} },
    { icon: Archive, label: 'Archive chat', action: () => {} },
    { icon: Trash2, label: 'Delete chat', action: () => {}, danger: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="flex flex-col h-full bg-[var(--bg-primary)]"
    >
      {/* Chat Header */}
      <ChatHeader 
        chat={activeChat}
        onBackClick={handleBackClick}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        menuItems={menuItems}
      />

      {/* Messages Container */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-95"></div>
        <div className="relative z-10">
          <AnimatePresence>
            {activeChat.messages?.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput chatId={activeChat.id} />

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  );
};

export default ChatWindow;