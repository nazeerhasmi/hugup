import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, 
  Paperclip, 
  Send, 
  Mic, 
  Image, 
  Camera, 
  FileText, 
  MapPin,
  User,
  Plus,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MessageInput = ({ chatId }) => {
  const { chats, setChats, user } = useApp();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);

  const attachmentOptions = [
    { icon: Image, label: 'Photo', color: 'text-purple-500', action: () => handleAttachment('photo') },
    { icon: Camera, label: 'Camera', color: 'text-pink-500', action: () => handleAttachment('camera') },
    { icon: FileText, label: 'Document', color: 'text-blue-500', action: () => handleAttachment('document') },
    { icon: User, label: 'Contact', color: 'text-green-500', action: () => handleAttachment('contact') },
    { icon: MapPin, label: 'Location', color: 'text-red-500', action: () => handleAttachment('location') }
  ];

  const emojiList = ['😀', '😂', '🥰', '😍', '🤔', '👍', '👏', '🎉', '❤️', '🔥', '💯', '👌', '🙏', '😎', '🤗', '😊'];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId: user.id,
      text: message.trim(),
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
    };

    // Update the chat with new message
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...(chat.messages || []), newMessage],
            lastMessage: {
              text: newMessage.text,
              timestamp: newMessage.timestamp,
              senderId: newMessage.senderId
            }
          };
        }
        return chat;
      })
    );

    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate message status updates
    setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 1000);
    setTimeout(() => updateMessageStatus(newMessage.id, 'read'), 2000);
  };

  const updateMessageStatus = (messageId, status) => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === messageId ? { ...msg, status } : msg
            )
          };
        }
        return chat;
      })
    );
  };

  const handleAttachment = (type) => {
    console.log(`Opening ${type} picker`);
    setShowAttachments(false);
    // Here you would implement the actual file picker logic
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Implement voice recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Process and send voice message
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] p-4">
      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-4 p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]"
          >
            <div className="flex flex-wrap gap-2">
              {emojiList.map((emoji, index) => (
                <motion.button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:bg-[var(--hover-bg)] rounded p-1 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachment Options */}
      <AnimatePresence>
        {showAttachments && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-4 p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]"
          >
            <div className="grid grid-cols-5 gap-4">
              {attachmentOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={option.action}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center ${option.color}`}>
                    <option.icon size={20} />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input Container */}
      <div className="flex items-end gap-3">
        {/* Attachment Button */}
        <motion.button
          onClick={() => setShowAttachments(!showAttachments)}
          className={`p-2 rounded-full transition-colors ${
            showAttachments
              ? 'bg-[var(--accent-color)] text-white'
              : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAttachments ? <X size={20} /> : <Paperclip size={20} />}
        </motion.button>

        {/* Message Input Field */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-3 pr-12 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-color)] resize-none max-h-32 min-h-[44px] transition-colors"
            rows={1}
          />
          
          {/* Emoji Button */}
          <motion.button
            onClick={() => setShowEmoji(!showEmoji)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
              showEmoji
                ? 'text-[var(--accent-color)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Smile size={20} />
          </motion.button>
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <motion.button
            onClick={handleSendMessage}
            className="p-3 bg-[var(--accent-color)] text-white rounded-full hover:bg-[var(--accent-hover)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={20} />
          </motion.button>
        ) : (
          <motion.button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic size={20} />
          </motion.button>
        )}
      </div>

      {/* Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex items-center gap-2 text-red-500"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Recording... Release to send</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdowns */}
      {(showEmoji || showAttachments) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowEmoji(false);
            setShowAttachments(false);
          }}
        />
      )}
    </div>
  );
};

export default MessageInput;