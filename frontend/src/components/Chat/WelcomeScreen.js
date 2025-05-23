import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, Zap, Users } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-32 h-32 bg-[var(--accent-color)] rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <MessageCircle size={64} className="text-white" />
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-[var(--text-primary)] mb-4"
        >
          Welcome to Hugup
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[var(--text-secondary)] mb-8 leading-relaxed"
        >
          Send and receive messages without keeping your phone online.
          Use Hugup on up to 4 linked devices and 1 mobile phone.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mb-3">
              <Shield size={24} className="text-[var(--accent-color)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Secure</h3>
            <p className="text-sm text-[var(--text-secondary)]">End-to-end encrypted</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mb-3">
              <Zap size={24} className="text-[var(--accent-color)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Fast</h3>
            <p className="text-sm text-[var(--text-secondary)]">Lightning quick delivery</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mb-3">
              <Users size={24} className="text-[var(--accent-color)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Connected</h3>
            <p className="text-sm text-[var(--text-secondary)]">Stay in touch always</p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-color)]"
        >
          <p className="text-sm text-[var(--text-secondary)]">
            💡 <strong className="text-[var(--text-primary)]">Tip:</strong> 
            Select a chat from the sidebar to start messaging, or create a new conversation to get started.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;