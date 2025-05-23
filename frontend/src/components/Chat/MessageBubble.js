import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, MoreVertical, Reply, Forward, Star, Copy, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const MessageBubble = ({ message }) => {
  const { user } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const isOwn = message.senderId === user?.id;

  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const getStatusIcon = () => {
    if (!isOwn) return null;

    switch (message.status) {
      case 'sent':
        return <Check size={14} className="text-[var(--text-tertiary)]" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-[var(--text-tertiary)]" />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const menuItems = [
    { icon: Reply, label: 'Reply', action: () => {} },
    { icon: Forward, label: 'Forward', action: () => {} },
    { icon: Star, label: 'Star', action: () => {} },
    { icon: Copy, label: 'Copy', action: () => {} },
    ...(isOwn ? [{ icon: Trash2, label: 'Delete', action: () => {}, danger: true }] : [])
  ];

  return (
    <motion.div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className={`max-w-xs lg:max-w-md relative ${isOwn ? 'order-2' : 'order-1'}`}>
        {/* Message Container */}
        <div
          className={`relative px-3 py-2 rounded-lg ${
            isOwn
              ? 'bg-[var(--message-bg-sent)] text-[var(--text-primary)] rounded-br-sm'
              : 'bg-[var(--message-bg-received)] text-[var(--text-primary)] rounded-bl-sm'
          } shadow-sm`}
        >
          {/* Message Content */}
          <div className="break-words">
            {message.type === 'text' && (
              <p className="text-sm leading-relaxed">{message.text}</p>
            )}
            
            {message.type === 'image' && (
              <div className="mb-2">
                <img
                  src={message.imageUrl}
                  alt="Shared image"
                  className="rounded-lg max-w-full h-auto"
                />
                {message.text && (
                  <p className="text-sm mt-2 leading-relaxed">{message.text}</p>
                )}
              </div>
            )}

            {message.type === 'voice' && (
              <div className="flex items-center gap-3 py-1">
                <button className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                </button>
                <div className="flex-1 h-1 bg-[var(--text-tertiary)] rounded-full">
                  <div className="w-1/3 h-full bg-[var(--accent-color)] rounded-full"></div>
                </div>
                <span className="text-xs text-[var(--text-secondary)]">0:12</span>
              </div>
            )}

            {message.type === 'document' && (
              <div className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-[var(--text-primary)]">PDF</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{message.fileName}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{message.fileSize}</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Footer */}
          <div className={`flex items-center justify-end gap-1 mt-1 ${
            message.type === 'text' ? 'mt-1' : 'mt-2'
          }`}>
            <span className="text-xs text-[var(--text-tertiary)]">
              {formatTime(message.timestamp)}
            </span>
            {getStatusIcon()}
          </div>

          {/* Message Tail */}
          <div className={`absolute bottom-0 ${
            isOwn 
              ? 'right-0 transform translate-x-1 border-l-8 border-l-[var(--message-bg-sent)] border-b-8 border-b-transparent'
              : 'left-0 transform -translate-x-1 border-r-8 border-r-[var(--message-bg-received)] border-b-8 border-b-transparent'
          }`}></div>
        </div>

        {/* Menu Button */}
        <motion.button
          className={`absolute top-2 ${
            isOwn ? 'left-0 transform -translate-x-8' : 'right-0 transform translate-x-8'
          } opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-opacity`}
          onClick={() => setShowMenu(!showMenu)}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <MoreVertical size={14} />
        </motion.button>

        {/* Context Menu */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute top-8 ${
              isOwn ? 'left-0 transform -translate-x-full' : 'right-0 transform translate-x-full'
            } bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg py-2 min-w-[120px] z-50`}
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setShowMenu(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-[var(--hover-bg)] flex items-center gap-2 ${
                  item.danger ? 'text-red-500' : 'text-[var(--text-primary)]'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

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

export default MessageBubble;