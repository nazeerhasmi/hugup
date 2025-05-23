export const mockUser = {
  id: '1',
  name: 'You',
  phone: '+1 234 567 8900',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  status: 'Available',
  lastSeen: new Date(),
  isOnline: true
};

export const mockContacts = [
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 234 567 8901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    status: 'Busy with work',
    lastSeen: new Date(Date.now() - 300000),
    isOnline: false
  },
  {
    id: '3',
    name: 'Mike Chen',
    phone: '+1 234 567 8902',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'At the gym 💪',
    lastSeen: new Date(),
    isOnline: true
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    phone: '+1 234 567 8903',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'Coffee lover ☕',
    lastSeen: new Date(Date.now() - 1800000),
    isOnline: false
  }
];

export const mockChats = [
  {
    id: '2',
    type: 'individual',
    contact: mockContacts[0],
    messages: [
      {
        id: 'm1',
        senderId: '2',
        text: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'm2',
        senderId: '1',
        text: 'I\'m doing great! Just finished a project. What about you?',
        timestamp: new Date(Date.now() - 3500000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'm3',
        senderId: '2',
        text: 'That\'s awesome! I\'m swamped with work but doing well 😊',
        timestamp: new Date(Date.now() - 300000),
        status: 'delivered',
        type: 'text'
      }
    ],
    unreadCount: 1,
    lastMessage: {
      text: 'That\'s awesome! I\'m swamped with work but doing well 😊',
      timestamp: new Date(Date.now() - 300000),
      senderId: '2'
    },
    pinned: false,
    muted: false
  },
  {
    id: '3',
    type: 'individual',
    contact: mockContacts[1],
    messages: [
      {
        id: 'm4',
        senderId: '3',
        text: 'Want to grab lunch tomorrow?',
        timestamp: new Date(Date.now() - 7200000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'm5',
        senderId: '1',
        text: 'Sure! How about 12:30 at the usual place?',
        timestamp: new Date(Date.now() - 7100000),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      text: 'Sure! How about 12:30 at the usual place?',
      timestamp: new Date(Date.now() - 7100000),
      senderId: '1'
    },
    pinned: true,
    muted: false
  }
];