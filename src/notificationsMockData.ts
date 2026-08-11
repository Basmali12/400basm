export type NotificationType = 'friend_request' | 'message' | 'room' | 'system';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  userId?: string; 
  userAvatar?: string;
  isPremium?: boolean;
  isOnline?: boolean;
  roomId?: string; 
  roomImage?: string;
  extraData?: {
    mutualFriendsCount?: number;
    mutualFriendsAvatars?: string[];
    messageType?: 'text' | 'voice' | 'image';
    duration?: string;
    imageUrl?: string;
    roomAction?: 'promoted' | 'joined' | 'activity';
    iconType?: 'update' | 'dnd' | 'privacy';
  };
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'friend_request',
    title: 'سارة محمد',
    description: '12 أصدقاء مشتركين',
    timestamp: 'الآن',
    isRead: false,
    userId: 'u1',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    isPremium: true,
    isOnline: true,
    extraData: {
      mutualFriendsCount: 12,
      mutualFriendsAvatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'
      ]
    }
  },
  {
    id: 'n2',
    type: 'friend_request',
    title: 'نور الدين',
    description: '7 أصدقاء مشتركين',
    timestamp: '5 س',
    isRead: false,
    userId: 'u2',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    isOnline: true,
    extraData: {
      mutualFriendsCount: 7,
      mutualFriendsAvatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
      ]
    }
  },
  {
    id: 'n3',
    type: 'friend_request',
    title: 'أحمد علي',
    description: '5 أصدقاء مشتركين',
    timestamp: '1 ي',
    isRead: true,
    userId: 'u3',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    isOnline: false,
    extraData: {
      mutualFriendsCount: 5,
      mutualFriendsAvatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
      ]
    }
  },
  {
    id: 'n4',
    type: 'message',
    title: 'محمد',
    description: 'أرسل لك رسالة جديدة\nسلام عليكم، شلونك؟',
    timestamp: 'الآن',
    isRead: false,
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    isOnline: true,
    extraData: { messageType: 'text' }
  },
  {
    id: 'n5',
    type: 'message',
    title: 'نور',
    description: 'أرسلت لك رسالة صوتية',
    timestamp: '10 م',
    isRead: false,
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    isPremium: true,
    extraData: { messageType: 'voice', duration: '0:18' }
  },
  {
    id: 'n6',
    type: 'message',
    title: 'فريق الدعم',
    description: 'تم حل المشكلة، شكراً لتواصلك',
    timestamp: '45 م',
    isRead: true,
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    extraData: { messageType: 'text' }
  },
  {
    id: 'n7',
    type: 'message',
    title: 'سارة',
    description: 'أرسلت لك صورة',
    timestamp: '2 س',
    isRead: true,
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    extraData: { messageType: 'image', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop' }
  },
  {
    id: 'n8',
    type: 'room',
    title: 'مجلس السهر',
    description: 'تم ترقيتك إلى مشرف في الروم',
    timestamp: '30 م',
    isRead: false,
    roomImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=150&h=150&fit=crop',
    extraData: { roomAction: 'promoted' }
  },
  {
    id: 'n9',
    type: 'room',
    title: 'أهل الذوق',
    description: 'انضم 5 أعضاء جدد إلى الروم',
    timestamp: '1 س',
    isRead: true,
    roomImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop',
    extraData: { roomAction: 'joined' }
  },
  {
    id: 'n10',
    type: 'system',
    title: 'تم تحديث التطبيق إلى الإصدار 2.3.0',
    description: 'استمتع بالمميزات الجديدة والأداء المحسن',
    timestamp: '3 س',
    isRead: false,
    extraData: { iconType: 'update' }
  },
  {
    id: 'n11',
    type: 'system',
    title: 'تذكير: تم تفعيل وضع عدم الإزعاج من 11:00 م إلى 7:00 ص',
    description: 'لن تتلقى إشعارات خلال هذه الفترة',
    timestamp: '1 ي',
    isRead: true,
    extraData: { iconType: 'dnd' }
  }
];
