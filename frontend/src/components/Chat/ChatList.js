import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Filter,
  Archive,
  Star,
  Users,
  Radio,
  MoreVertical,
  Pin,
  VolumeX
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ChatListItem from './ChatListItem';
import StatusList from '../Status/StatusList';
import { format, isToday, isYesterday } from 'date-fns';

const ChatList = ({ activeView, setActiveView }) => {
  const { chats, user, setActiveChat } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, unread, groups, contacts

  const getViewTitle = () => {
    switch (activeView) {
      case 'chats': return 'Chats';
      case 'status': return 'Status';
      case 'communities': return 'Communities';
      case 'archived': return 'Archived';
      case 'starred': return 'Starred Messages';
      default: return 'Chats';
    }
  };

  const filteredChats = useMemo(() => {
    let filtered = chats;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(chat => {
        const name = chat.type === 'group' ? chat.group?.name : chat.contact?.name;
        const lastMessage = chat.lastMessage?.text || '';
        return name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Filter by type
    switch (filterType) {
      case 'unread':
        filtered = filtered.filter(chat => chat.unreadCount > 0);
        break;
      case 'groups':
        filtered = filtered.filter(chat => chat.type === 'group');
        break;
      case 'contacts':
        filtered = filtered.filter(chat => chat.type === 'individual');
        break;
    }

    // Sort: pinned first, then by last message time
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.lastMessage?.timestamp) - new Date(a.lastMessage?.timestamp);
    });
  }, [chats, searchQuery, filterType]);

  const renderContent = () => {
    switch (activeView) {
      case 'status':
        return <StatusList />;
      case 'communities':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <Users size={64} className="text-[var(--text-tertiary)] mx-auto mb-4" />
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">Stay connected with a community</h3>
              <p className="text-[var(--text-secondary)] text-sm">Communities bring members together in topic-based groups</p>
            </div>
          </div>
        );
      case 'archived':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <Archive size={64} className="text-[var(--text-tertiary)] mx-auto mb-4" />
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">No archived chats</h3>
              <p className="text-[var(--text-secondary)] text-sm">Archive chats to keep your chat list organized</p>
            </div>
          </div>
        );
      case 'starred':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <Star size={64} className="text-[var(--text-tertiary)] mx-auto mb-4" />
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">No starred messages</h3>
              <p className="text-[var(--text-secondary)] text-sm">Tap and hold on any message and tap star to find them here</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ChatListItem chat={chat} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredChats.length === 0 && (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <Search size={64} className="text-[var(--text-tertiary)] mx-auto mb-4" />
                  <h3 className="text-[var(--text-primary)] font-semibold mb-2">No chats found</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {searchQuery ? 'Try a different search term' : 'Start a new conversation'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            {getViewTitle()}
          </h1>
          <div className="flex items-center gap-2">
            {activeView === 'chats' && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                  title="New chat"
                >
                  <Plus size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                  title="Filter chats"
                >
                  <Filter size={20} />
                </motion.button>
              </>
            )}
            {activeView === 'status' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                title="Add status"
              >
                <Plus size={20} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
              title="More options"
            >
              <MoreVertical size={20} />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        {(activeView === 'chats' || activeView === 'status') && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder={`Search ${activeView}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
          </div>
        )}

        {/* Filter Tabs for Chats */}
        {activeView === 'chats' && (
          <div className="flex gap-2 mt-3">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'groups', label: 'Groups' },
              { id: 'contacts', label: 'Contacts' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterType === filter.id
                    ? 'bg-[var(--accent-color)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ChatList;