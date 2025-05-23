import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Camera,
  Edit3,
  Phone,
  Mail,
  Globe,
  Calendar,
  MapPin,
  Briefcase,
  Heart,
  Settings,
  Share2,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Profile = ({ onBack }) => {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const profileSections = [
    {
      title: 'Personal Information',
      fields: [
        { icon: Phone, label: 'Phone', value: user?.phone, editable: false },
        { icon: Mail, label: 'Email', value: 'john.doe@example.com', editable: true },
        { icon: Calendar, label: 'Date of Birth', value: 'January 15, 1990', editable: true },
        { icon: MapPin, label: 'Location', value: 'New York, USA', editable: true }
      ]
    },
    {
      title: 'Professional',
      fields: [
        { icon: Briefcase, label: 'Work', value: 'Software Engineer at Tech Co', editable: true },
        { icon: Globe, label: 'Website', value: 'www.johndoe.com', editable: true }
      ]
    },
    {
      title: 'Interests',
      fields: [
        { icon: Heart, label: 'Hobbies', value: 'Photography, Travel, Cooking', editable: true }
      ]
    }
  ];

  const handleSave = () => {
    // Here you would normally save to backend
    setIsEditing(false);
    console.log('Saving profile:', editedUser);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full bg-[var(--bg-primary)]"
    >
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-primary)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              Profile
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <motion.button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[var(--accent-color)] text-white text-sm rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share profile"
                >
                  <Share2 size={18} />
                </motion.button>
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Edit profile"
                >
                  <Edit3 size={18} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            {isEditing && (
              <motion.button
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={18} />
              </motion.button>
            )}
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[var(--bg-primary)]"
              />
              {isEditing && (
                <motion.button
                  className="absolute bottom-0 right-0 p-2 bg-[var(--accent-color)] rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera size={14} />
                </motion.button>
              )}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-primary)]"></div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-6">
          <div className="mb-6">
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="text-2xl font-bold text-[var(--text-primary)] bg-transparent border-b border-[var(--border-color)] outline-none focus:border-[var(--accent-color)] transition-colors w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{user?.name}</h2>
            )}
            
            {isEditing ? (
              <textarea
                value={editedUser.status}
                onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })}
                className="text-[var(--text-secondary)] mt-2 bg-transparent border border-[var(--border-color)] rounded-lg p-2 outline-none focus:border-[var(--accent-color)] transition-colors w-full resize-none"
                rows={2}
              />
            ) : (
              <p className="text-[var(--text-secondary)] mt-1">{user?.status}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">247</h3>
              <p className="text-sm text-[var(--text-secondary)]">Messages</p>
            </div>
            <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">18</h3>
              <p className="text-sm text-[var(--text-secondary)]">Groups</p>
            </div>
            <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">156</h3>
              <p className="text-sm text-[var(--text-secondary)]">Contacts</p>
            </div>
          </div>

          {/* Profile Sections */}
          {profileSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                {section.title}
              </h3>
              <div className="bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
                {section.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={`flex items-center p-4 ${
                      fieldIndex !== section.fields.length - 1 ? 'border-b border-[var(--border-color)]' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center mr-3">
                      <field.icon size={18} className="text-[var(--accent-color)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--text-primary)] text-sm">
                        {field.label}
                      </h4>
                      {isEditing && field.editable ? (
                        <input
                          type="text"
                          value={field.value}
                          className="text-sm text-[var(--text-secondary)] bg-transparent border-b border-[var(--border-color)] outline-none focus:border-[var(--accent-color)] transition-colors w-full mt-1"
                        />
                      ) : (
                        <p className="text-sm text-[var(--text-secondary)]">{field.value}</p>
                      )}
                    </div>
                    {!isEditing && field.editable && (
                      <Edit3 size={14} className="text-[var(--text-tertiary)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings size={18} className="text-[var(--accent-color)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Settings</span>
              </motion.button>
              <motion.button
                className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Star size={18} className="text-[var(--accent-color)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Starred</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;