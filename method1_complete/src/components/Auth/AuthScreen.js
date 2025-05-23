import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-container"
      >
        <div className="auth-logo">
          <div className="auth-logo-icon">💬</div>
          <h1>Hugup</h1>
        </div>
        
        <h2 className="auth-title">Connect with your world</h2>
        <p className="auth-subtitle">
          Simple, reliable, private messaging and calling for everyone
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
          
          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Quick Demo Access
          </p>
          <motion.button
            onClick={onLogin}
            className="auth-button"
            style={{ background: '#6c757d' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Demo Mode
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;