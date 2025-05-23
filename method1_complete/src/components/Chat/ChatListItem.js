import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { format, isToday, isYesterday } from 'date-fns';

const ChatListItem = ({ chat }) => {
  const { activeChat, setActiveChat } = useApp();
  const isActive = activeChat?.id === chat.id;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM');
    }
  };

  return (
    <motion.div
      onClick={() => setActiveChat(chat)}
      className={`chat-item ${isActive ? 'active' : ''}`}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img
        src={chat.contact?.avatar}
        alt={chat.contact?.name}
        className="chat-avatar"
      />

      <div className="chat-info">
        <div className="chat-name">
          {chat.contact?.name || 'Unknown Contact'}
        </div>
        <div className="chat-message">
          {chat.lastMessage?.text || 'No messages yet'}
        </div>
      </div>

      <div className="chat-meta">
        <div className="chat-time">
          {chat.lastMessage ? formatTime(chat.lastMessage.timestamp) : ''}
        </div>
        {chat.unreadCount > 0 && (
          <div className="unread-badge">
            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatListItem;