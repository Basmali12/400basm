export type User = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isPremium?: boolean;
  isFriend?: boolean;
  lastSeen?: string;
};

export type MessageType = 'text' | 'voice' | 'image';

export type Message = {
  id: string;
  senderId: string;
  type: MessageType;
  content: string;
  time: string;
  duration?: string;
};

export type Conversation = {
  id: string;
  isGroup?: boolean;
  participantId?: string;
  title?: string;
  subtitle?: string;
  lastMessage: Message;
  unreadCount: number;
};

export const MOCK_USERS: Record<string, User> = {
  'me': { id: 'me', name: 'أنا', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isOnline: true },
  'u1': { id: 'u1', name: 'أحمد', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', isOnline: true, isFriend: true },
  'u2': { id: 'u2', name: 'سارة', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', isOnline: true, isPremium: true, isFriend: true },
  'u3': { id: 'u3', name: 'محمد', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', isOnline: true, isFriend: false },
  'u4': { id: 'u4', name: 'نور', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isOnline: true, isFriend: true },
  'support': { id: 'support', name: 'فريق الدعم', avatar: '', isOnline: true, isFriend: true }
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'general',
    isGroup: true,
    title: 'دردشة عامة',
    subtitle: 'أهلاً وسهلاً بالجميع في دردشتنا',
    lastMessage: { id: 'm0', senderId: 'u1', type: 'text', content: 'أهلاً وسهلاً بالجميع في دردشتنا', time: '9:30 PM' },
    unreadCount: 12
  },
  {
    id: 'c1',
    participantId: 'u1',
    lastMessage: { id: 'm1', senderId: 'u1', type: 'text', content: 'مساء الخير جميعاً', time: '9:28 PM' },
    unreadCount: 2
  },
  {
    id: 'c2',
    participantId: 'u2',
    lastMessage: { id: 'm2', senderId: 'u2', type: 'text', content: 'كل يوم وأنتم بخير', time: '9:25 PM' },
    unreadCount: 1
  },
  {
    id: 'c3',
    participantId: 'u3',
    lastMessage: { id: 'm3', senderId: 'u3', type: 'text', content: 'جاهز للعبة الليلة؟', time: '9:20 PM' },
    unreadCount: 0
  },
  {
    id: 'c4',
    participantId: 'u4',
    lastMessage: { id: 'm4', senderId: 'u4', type: 'voice', content: 'voice_data', time: '9:15 PM', duration: '0:18' },
    unreadCount: 0
  },
  {
    id: 'c_support',
    participantId: 'support',
    lastMessage: { id: 'm5', senderId: 'support', type: 'text', content: 'نحن هنا لمساعدتك، شكراً لتواصلك', time: '9:10 PM' },
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'general': [
    { id: 'msg0', senderId: 'u2', type: 'text', content: 'أهلاً وسهلاً بالجميع في دردشتنا', time: '9:30 PM' },
  ],
  'c1': [
    { id: 'msg1', senderId: 'u1', type: 'text', content: 'مساء الخير جميعاً', time: '9:28 PM' }
  ],
  'c2': [
     { id: 'msg1', senderId: 'u2', type: 'text', content: 'كل يوم وأنتم بخير', time: '9:25 PM' }
  ],
  'c3': [
     { id: 'msg1', senderId: 'u3', type: 'text', content: 'جاهز للعبة الليلة؟', time: '9:20 PM' }
  ],
  'c4': [
     { id: 'msg1', senderId: 'u4', type: 'voice', content: 'voice_data', time: '9:15 PM', duration: '0:18' }
  ],
  'c_support': [
     { id: 'msg1', senderId: 'support', type: 'text', content: 'نحن هنا لمساعدتك، شكراً لتواصلك', time: '9:10 PM' }
  ]
};
