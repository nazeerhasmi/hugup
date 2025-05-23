import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';

const AuthScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Instant Messaging',
      description: 'Send messages, photos, videos and voice notes instantly'
    },
    {
      icon: Users,
      title: 'Group Chats',
      description: 'Stay connected with family and friends in group conversations'
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Your personal messages are protected with end-to-end encryption'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning fast message delivery across all devices'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding and features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
              <MessageCircle size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Hugup</h1>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
            Connect with your world
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Simple, reliable, private messaging and calling for everyone
          </p>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <feature.icon size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto w-full"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to Hugup</h3>
            <p className="text-gray-600">Enter your phone number to get started</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                  <option>+86</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Continue
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">Quick Demo Access</p>
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Enter Demo Mode
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;