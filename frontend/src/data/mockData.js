export const mockUser = {
  id: '1',
  name: 'You',
  phone: '+1 234 567 8900',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc0Nzk3MzQ1NXww&ixlib=rb-4.1.0&q=85',
  status: 'Available',
  lastSeen: new Date(),
  isOnline: true
};

export const mockContacts = [
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 234 567 8901',
    avatar: 'https://images.pexels.com/photos/8005453/pexels-photo-8005453.jpeg',
    status: 'Busy with work',
    lastSeen: new Date(Date.now() - 300000),
    isOnline: false
  },
  {
    id: '3',
    name: 'Mike Chen',
    phone: '+1 234 567 8902',
    avatar: 'https://images.pexels.com/photos/32181768/pexels-photo-32181768.jpeg',
    status: 'At the gym 💪',
    lastSeen: new Date(),
    isOnline: true
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    phone: '+1 234 567 8903',
    avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc0Nzk3MzQ1NXww&ixlib=rb-4.1.0&q=85',
    status: 'Coffee lover ☕',
    lastSeen: new Date(Date.now() - 1800000),
    isOnline: false
  },
  {
    id: '5',
    name: 'David Wilson',
    phone: '+1 234 567 8904',
    avatar: 'https://images.unsplash.com/photo-1725131481715-f0aa4357665d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTc0Nzk3MzQ1NXww&ixlib=rb-4.1.0&q=85',
    status: 'Traveling 🌍',
    lastSeen: new Date(Date.now() - 7200000),
    isOnline: false
  }
];

export const mockGroups = [
  {
    id: 'group1',
    name: 'Family Group',
    avatar: 'https://images.pexels.com/photos/32200925/pexels-photo-32200925.jpeg',
    description: 'Family chat group',
    members: ['1', '2', '3', '4', '5'],
    admins: ['1'],
    createdAt: new Date(Date.now() - 86400000 * 30),
    isGroup: true
  },
  {
    id: 'group2',
    name: 'Work Team',
    avatar: 'https://images.pexels.com/photos/32199948/pexels-photo-32199948.jpeg',
    description: 'Project discussion group',
    members: ['1', '2', '3'],
    admins: ['1', '2'],
    createdAt: new Date(Date.now() - 86400000 * 7),
    isGroup: true
  },
  {
    id: 'group3',
    name: 'College Friends',
    avatar: 'https://images.pexels.com/photos/32199937/pexels-photo-32199937.jpeg',
    description: 'Old college buddies reunion',
    members: ['1', '3', '4', '5'],
    admins: ['3'],
    createdAt: new Date(Date.now() - 86400000 * 365),
    isGroup: true
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
      },
      {
        id: 'm6',
        senderId: '3',
        text: 'Perfect! See you there 👍',
        timestamp: new Date(Date.now() - 7000000),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      text: 'Perfect! See you there 👍',
      timestamp: new Date(Date.now() - 7000000),
      senderId: '3'
    },
    pinned: true,
    muted: false
  },
  {
    id: 'group1',
    type: 'group',
    group: mockGroups[0],
    messages: [
      {
        id: 'm7',
        senderId: '2',
        text: 'Planning the weekend trip!',
        timestamp: new Date(Date.now() - 1800000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'm8',
        senderId: '3',
        text: 'Count me in! Where are we going?',
        timestamp: new Date(Date.now() - 1700000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'm9',
        senderId: '1',
        text: 'How about the beach house? It\'s perfect this time of year 🏖️',
        timestamp: new Date(Date.now() - 1600000),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 2,
    lastMessage: {
      text: 'How about the beach house? It\'s perfect this time of year 🏖️',
      timestamp: new Date(Date.now() - 1600000),
      senderId: '1'
    },
    pinned: false,
    muted: false
  }
];

export const mockStatus = [
  {
    id: 's1',
    userId: '2',
    user: mockContacts[0],
    content: {
      type: 'image',
      url: 'https://images.pexels.com/photos/950241/pexels-photo-950241.jpeg',
      text: 'Beautiful sunset today! 🌅'
    },
    timestamp: new Date(Date.now() - 3600000),
    views: ['1', '3', '4'],
    isViewed: true
  },
  {
    id: 's2',
    userId: '3',
    user: mockContacts[1],
    content: {
      type: 'text',
      text: 'Just finished an amazing workout! 💪 Feeling energized!',
      backgroundColor: '#25D366'
    },
    timestamp: new Date(Date.now() - 7200000),
    views: ['1', '2'],
    isViewed: false
  },
  {
    id: 's3',
    userId: '4',
    user: mockContacts[2],
    content: {
      type: 'image',
      url: 'https://images.pexels.com/photos/532566/pexels-photo-532566.jpeg',
      text: 'Coffee time! ☕'
    },
    timestamp: new Date(Date.now() - 10800000),
    views: ['1'],
    isViewed: true
  }
];

export const wallpapers = [
  {
    id: 'w1',
    name: 'Default',
    preview: 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg',
    url: 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg'
  },
  {
    id: 'w2',
    name: 'Abstract Blue',
    preview: 'https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg',
    url: 'https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg'
  },
  {
    id: 'w3',
    name: 'Geometric',
    preview: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg',
    url: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg'
  },
  {
    id: 'w4',
    name: 'Minimalist',
    preview: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NDc5NzM0NzZ8MA&ixlib=rb-4.1.0&q=85',
    url: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NDc5NzM0NzZ8MA&ixlib=rb-4.1.0&q=85'
  }
];