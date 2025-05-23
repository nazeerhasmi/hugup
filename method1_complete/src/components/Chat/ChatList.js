import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ChatListItem from './ChatListItem';

const ChatList = ({ activeView }) => {
  const { chats } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const getViewTitle = () => {
    switch (activeView) {
      case 'chats': return 'Chats';
      case 'status': return 'Status';
      case 'communities': return 'Communities';
      case 'settings': return 'Settings';
      default: return 'Chats';
    }
  };

  const filteredChats = chats.filter(chat => {
    const name = chat.contact?.name || 'Unknown';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (activeView !== 'chats') {
    return (
      <div className="chat-list-container">
        <div className="chat-list-header">
          <h1 className="chat-list-title">{getViewTitle()}</h1>
        </div>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          padding: '40px'
        }}>
          <div>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚙️</div>
            <h3>Coming Soon</h3>
            <p>This feature will be available in the next update!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h1 className="chat-list-title">Chats</h1>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chat-search"
        />
      </div>

      <div className="chat-list">
        {filteredChats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
        
        {filteredChats.length === 0 && (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: 'var(--text-secondary)' 
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
            <h3>No chats found</h3>
            <p>Start a new conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;