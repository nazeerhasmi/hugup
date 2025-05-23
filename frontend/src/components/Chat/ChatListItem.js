import React from 'react';
import { motion } from 'framer-motion';
import { Pin, VolumeX, Check, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format, isToday, isYesterday } from 'date-fns';

const ChatListItem = ({ chat }) => {
  const { activeChat, setActiveChat, user } = useApp();
  const isActive = activeChat?.id === chat.id;

  const getDisplayName = () => {
    return chat.type === 'group' ? chat.group?.name : chat.contact?.name;
  };

  const getDisplayAvatar = () => {
    return chat.type === 'group' ? chat.group?.avatar : chat.contact?.avatar;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  const getMessageStatusIcon = () => {
    if (chat.lastMessage?.senderId === user?.id) {
      switch (chat.lastMessage?.status) {
        case 'sent':
          return <Check size={14} className="text-[var(--text-tertiary)]" />;
        case 'delivered':
          return <CheckCheck size={14} className="text-[var(--text-tertiary)]" />;
        case 'read':
          return <CheckCheck size={14} className="text-blue-500" />;
        default:
          return null;
      }
    }
    return null;
  };

  const getLastMessagePreview = () => {
    const message = chat.lastMessage;
    if (!message) return '';

    let prefix = '';
    if (chat.type === 'group' && message.senderId !== user?.id) {
      const sender = chat.group?.members?.find(m => m.id === message.senderId);
      prefix = `${sender?.name || 'Unknown'}: `;
    } else if (message.senderId === user?.id) {
      prefix = 'You: ';
    }

    return prefix + (message.text || 'Media');
  };

  const isOnline = () => {
    if (chat.type === 'individual') {
      return chat.contact?.isOnline;
    }
    return false;
  };

  return (
    <motion.div
      onClick={() => setActiveChat(chat)}
      className={`flex items-center p-3 cursor-pointer transition-colors relative ${
        isActive
          ? 'bg-[var(--selected-bg)] border-r-2 border-[var(--accent-color)]'
          : 'hover:bg-[var(--hover-bg)]'
      }`}
      whileHover={{ x: isActive ? 0 : 4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Avatar */}
      <div className="relative mr-3">
        <img
          src={getDisplayAvatar()}
          alt={getDisplayName()}
          className="w-12 h-12 rounded-full object-cover"
        />
        {isOnline() && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-medium text-[var(--text-primary)] truncate">
              {getDisplayName()}
            </h3>
            {chat.pinned && (
              <Pin size={14} className="text-[var(--text-tertiary)] transform rotate-45" />
            )}
            {chat.muted && (
              <VolumeX size={14} className="text-[var(--text-tertiary)]" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
            {getMessageStatusIcon()}
            <span>{formatTime(chat.lastMessage?.timestamp)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--text-secondary)] truncate flex-1">
            {getLastMessagePreview()}
          </p>
          {chat.unreadCount > 0 && (
            <span className="ml-2 bg-[var(--accent-color)] text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatListItem;