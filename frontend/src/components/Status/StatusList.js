import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Camera, Type } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockStatus } from '../../data/mockData';
import { format, formatDistanceToNow } from 'date-fns';

const StatusList = () => {
  const { user } = useApp();
  const [selectedStatus, setSelectedStatus] = useState(null);

  const myStatus = {
    id: 'my_status',
    userId: user?.id,
    user: user,
    content: null,
    timestamp: null,
    views: [],
    isViewed: false
  };

  const groupedStatus = mockStatus.reduce((acc, status) => {
    const timeAgo = formatDistanceToNow(new Date(status.timestamp), { addSuffix: true });
    const key = timeAgo.includes('hour') || timeAgo.includes('minute') ? 'recent' : 'viewed';
    
    if (!acc[key]) acc[key] = [];
    acc[key].push(status);
    return acc;
  }, {});

  const getStatusRingColor = (status) => {
    if (status.isViewed) return 'border-gray-300';
    return 'border-[var(--accent-color)] border-2';
  };

  const StatusViewer = ({ status, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-10 p-2"
      >
        ✕
      </button>
      
      <div className="w-full max-w-md mx-4">
        {/* Status Header */}
        <div className="flex items-center gap-3 mb-4 text-white">
          <img
            src={status.user.avatar}
            alt={status.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{status.user.name}</h3>
            <p className="text-sm text-gray-300">
              {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Status Content */}
        <div className="relative">
          {status.content.type === 'image' ? (
            <img
              src={status.content.url}
              alt="Status"
              className="w-full rounded-lg"
            />
          ) : (
            <div
              className="w-full h-96 rounded-lg flex items-center justify-center text-white text-xl font-medium"
              style={{ backgroundColor: status.content.backgroundColor }}
            >
              {status.content.text}
            </div>
          )}
          
          {status.content.text && status.content.type === 'image' && (
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="bg-black/50 rounded p-2">{status.content.text}</p>
            </div>
          )}
        </div>

        {/* Status Progress */}
        <div className="w-full bg-gray-600 h-1 rounded-full mt-4">
          <div className="bg-white h-1 rounded-full w-1/3"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {/* My Status */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-dashed border-[var(--border-color)]"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--accent-color)] rounded-full flex items-center justify-center">
              <Plus size={12} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--text-primary)]">My status</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Tap to add status update
            </p>
          </div>
        </div>

        {/* Add Status Options */}
        <div className="flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-tertiary)] rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Camera size={16} />
            Camera
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-tertiary)] rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Type size={16} />
            Text
          </motion.button>
        </div>
      </div>

      {/* Recent Updates */}
      {groupedStatus.recent && (
        <div className="p-4">
          <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Recent updates</h4>
          <div className="space-y-3">
            {groupedStatus.recent.map((status) => (
              <motion.div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className="flex items-center gap-3 cursor-pointer hover:bg-[var(--hover-bg)] rounded-lg p-2 -m-2 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className={`relative w-14 h-14 rounded-full p-0.5 ${getStatusRingColor(status)}`}>
                  <img
                    src={status.user.avatar}
                    alt={status.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--text-primary)]">{status.user.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Viewed Updates */}
      {groupedStatus.viewed && (
        <div className="p-4 border-t border-[var(--border-color)]">
          <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Viewed updates</h4>
          <div className="space-y-3">
            {groupedStatus.viewed.map((status) => (
              <motion.div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className="flex items-center gap-3 cursor-pointer hover:bg-[var(--hover-bg)] rounded-lg p-2 -m-2 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className={`relative w-14 h-14 rounded-full p-0.5 ${getStatusRingColor(status)}`}>
                  <img
                    src={status.user.avatar}
                    alt={status.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--text-primary)]">{status.user.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
                  <Eye size={12} />
                  <span className="text-xs">{status.views.length}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Status Viewer */}
      <AnimatePresence>
        {selectedStatus && (
          <StatusViewer
            status={selectedStatus}
            onClose={() => setSelectedStatus(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusList;