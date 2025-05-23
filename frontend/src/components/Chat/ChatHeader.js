import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Search 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ChatHeader = ({ chat, onBackClick, showMenu, setShowMenu, menuItems }) => {
  const { user } = useApp();

  const getDisplayName = () => {
    return chat.type === 'group' ? chat.group?.name : chat.contact?.name;
  };

  const getDisplayAvatar = () => {
    return chat.type === 'group' ? chat.group?.avatar : chat.contact?.avatar;
  };

  const getStatusText = () => {
    if (chat.type === 'group') {
      const memberCount = chat.group?.members?.length || 0;
      return `${memberCount} members`;
    } else {
      return chat.contact?.isOnline ? 'online' : 'last seen recently';
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center flex-1">
          {/* Back Button (Mobile) */}
          <motion.button
            onClick={onBackClick}
            className="md:hidden p-2 -ml-2 mr-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-primary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>

          {/* Avatar */}
          <div className="relative mr-3">
            <img
              src={getDisplayAvatar()}
              alt={getDisplayName()}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
            {chat.type === 'individual' && chat.contact?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
            )}
          </div>

          {/* Name and Status */}
          <div className="flex-1 min-w-0 cursor-pointer">
            <h2 className="font-semibold text-[var(--text-primary)] truncate">
              {getDisplayName()}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] truncate">
              {getStatusText()}
            </p>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Search in conversation"
          >
            <Search size={20} />
          </motion.button>

          {/* Voice Call */}
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Voice call"
          >
            <Phone size={20} />
          </motion.button>

          {/* Video Call */}
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Video call"
          >
            <Video size={20} />
          </motion.button>

          {/* More Options */}
          <div className="relative">
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="More options"
            >
              <MoreVertical size={20} />
            </motion.button>

            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-full right-0 mt-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg py-2 min-w-[180px] z-50"
              >
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setShowMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-[var(--hover-bg)] flex items-center gap-3 ${
                      item.danger ? 'text-red-500' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;