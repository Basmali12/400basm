export type RoomRole = 'owner' | 'moderator' | 'member';

export type RoomMember = {
  userId: string;
  name: string;
  avatar: string;
  role: RoomRole;
  isPremium?: boolean;
};

export type RoomMessage = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: RoomRole;
  isPremium?: boolean;
  type?: 'text' | 'voice' | 'image';
  content: string;
  duration?: string;
  imageUrl?: string;
  time: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  type: 'public' | 'private';
  accessCode?: string;
  ownerId: string;
  memberCount: number;
  featured?: boolean;
  active?: boolean;
  categoryId: string;
  previewAvatars: string[];
};

export const MOCK_ROOM_BACKGROUNDS = [
  { id: 'bg1', name: 'مجلس ليلي', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=1200&fit=crop' },
  { id: 'bg2', name: 'شاطئ وغروب', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1200&fit=crop' },
  { id: 'bg3', name: 'جبال ونجوم', url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=1200&fit=crop' },
  { id: 'bg4', name: 'عالم تقني', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=1200&fit=crop' },
  { id: 'bg5', name: 'غرفة ألعاب', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1200&fit=crop' },
  { id: 'bg6', name: 'تصميم ملكي', url: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800&h=1200&fit=crop' },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'r_my_room',
    name: 'رومي التجريبي',
    description: 'غرفة الإدارة الخاصة بي',
    image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=200&h=150&fit=crop',
    background: MOCK_ROOM_BACKGROUNDS[5].url,
    type: 'public',
    ownerId: 'me',
    memberCount: 5,
    featured: true,
    categoryId: 'featured',
    previewAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    ]
  },
  {
    id: 'r1',
    name: 'مجلس السهر',
    description: 'دردشة وناسة بدون قيود',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=150&fit=crop',
    background: MOCK_ROOM_BACKGROUNDS[0].url,
    type: 'public',
    ownerId: 'u1',
    memberCount: 128,
    featured: true,
    categoryId: 'featured',
    previewAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'
    ]
  },
  {
    id: 'r2',
    name: 'أهل الذوق',
    description: 'نقاش راقي ومواضيع متنوعة',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop',
    background: MOCK_ROOM_BACKGROUNDS[1].url,
    type: 'public',
    ownerId: 'u2',
    memberCount: 96,
    featured: true,
    categoryId: 'featured',
    previewAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    ]
  },
  {
    id: 'r3',
    name: 'ألعاب للجميع',
    description: 'العاب ومسابقات ممتعة',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=150&fit=crop',
    background: MOCK_ROOM_BACKGROUNDS[4].url,
    type: 'private',
    accessCode: '1234',
    ownerId: 'u3',
    memberCount: 53,
    categoryId: 'active',
    previewAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'
    ]
  }
];

export const MOCK_ROOM_MEMBERS: Record<string, RoomMember[]> = {
  'r_my_room': [
    { userId: 'me', name: 'أنا', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'owner', isPremium: true },
    { userId: 'u1', name: 'أحمد', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'member' },
    { userId: 'u2', name: 'سارة', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', role: 'moderator', isPremium: true },
  ],
  'r1': [
    { userId: 'u1', name: 'أحمد', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'owner' },
    { userId: 'me', name: 'أنا', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'member', isPremium: true },
  ],
  'r2': [],
  'r3': [],
};

export const MOCK_ROOM_MESSAGES: Record<string, RoomMessage[]> = {
  'r_my_room': [
    { id: 'm1', senderId: 'me', senderName: 'أنا', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', senderRole: 'owner', isPremium: true, content: 'أهلاً بكم في رومي التجريبي!', time: '10:00 PM' },
    { id: 'm2', senderId: 'u2', senderName: 'سارة', senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', senderRole: 'moderator', isPremium: true, content: 'شكراً للاستضافة', time: '10:05 PM' },
  ],
  'r1': [
    { id: 'm1', senderId: 'u1', senderName: 'أحمد', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', senderRole: 'owner', content: 'يا هلا بالجميع في مجلس السهر', time: '9:00 PM' },
  ]
};
