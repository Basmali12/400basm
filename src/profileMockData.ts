export const PROFILE_MOODS = [
  { id: 'happy', icon: '😊', text: 'سعيد' },
  { id: 'cool', icon: '😎', text: 'رايق' },
  { id: 'gaming', icon: '🎮', text: 'ألعب' },
  { id: 'music', icon: '🎵', text: 'أستمع للموسيقى' },
  { id: 'busy', icon: '☕', text: 'مشغول' },
  { id: 'quiet', icon: '🌙', text: 'هادئ' },
  { id: 'coding', icon: '💻', text: 'أبرمج' },
  { id: 'optimistic', icon: '✨', text: 'متفائل' }
];

export const MOCK_ACHIEVEMENTS = [
  { id: 'a1', title: 'عضو نشط', description: 'شارك في المجتمع باستمرار', icon: '🔥', unlocked: true, progress: 100 },
  { id: 'a2', title: 'اجتماعي', description: 'شارك في العديد من المحادثات', icon: '💬', unlocked: true, progress: 100 },
  { id: 'a3', title: 'محبوب', description: 'كوّن شبكة أصدقاء (50 صديق)', icon: '👥', unlocked: true, progress: 100 },
  { id: 'a4', title: 'مالك روم', description: 'يمتلك رومًا خاصًا أو عامًا', icon: '👑', unlocked: true, progress: 100 },
  { id: 'a5', title: 'عضو مميز', description: 'حصل على العضوية المميزة', icon: '💎', unlocked: true, progress: 100 },
  { id: 'a6', title: 'صانع محتوى', description: 'شارك 100 صورة في الدردشات', icon: '📸', unlocked: false, progress: 45 },
  { id: 'a7', title: 'أسطورة', description: 'تواجد في التطبيق لمدة سنة', icon: '🌟', unlocked: false, progress: 12 },
];

export const MOCK_USER_MEDIA = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=400&h=400&fit=crop',
];

export const MOCK_FRIENDS = [
  { id: 'f1', name: 'محمد', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', isOnline: true, isPremium: false, username: '@mohamed_99' },
  { id: 'f2', name: 'نور', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isOnline: true, isPremium: true, username: '@noor_star' },
  { id: 'f3', name: 'سارة', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', isOnline: false, isPremium: true, username: '@sara_art' },
  { id: 'f4', name: 'أحمد', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', isOnline: true, isPremium: false, username: '@ahmed_tech' },
  { id: 'f5', name: 'زيد', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', isOnline: false, isPremium: false, username: '@zaid_k' },
];

export const MOCK_USER_ROOMS = [
  {
    id: 'r_my_room',
    name: 'رومي التجريبي',
    description: 'غرفة الإدارة الخاصة بي',
    image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=200&h=150&fit=crop',
    type: 'public',
    memberCount: 5,
    userRole: 'owner'
  },
  {
    id: 'r1',
    name: 'مجلس السهر',
    description: 'دردشة وناسة بدون قيود',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=150&fit=crop',
    type: 'public',
    memberCount: 128,
    userRole: 'moderator'
  },
  {
    id: 'r2',
    name: 'عالم التقنية',
    description: 'كل ما يخص التكنولوجيا',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=150&fit=crop',
    type: 'public',
    memberCount: 92,
    userRole: 'member'
  }
];

export const ENTRANCE_EFFECTS = [
  { id: 'e1', name: 'دخلة بنفسجية', icon: '✨', description: 'تأثير متوهج باللون البنفسجي' },
  { id: 'e2', name: 'دخلة ملكية', icon: '👑', description: 'تاج ذهبي مع أمطار ضوئية' },
  { id: 'e3', name: 'دخلة نارية', icon: '🔥', description: 'لهب متوهج من أسفل الشاشة' },
  { id: 'e4', name: 'دخلة وردية', icon: '🌸', description: 'بتلات أزهار تتساقط بنعومة' },
  { id: 'e5', name: 'سيارة ذهبية', icon: '🚗', description: 'سيارة رياضية تعبر الشاشة' },
];

export const PROFILE_FRAMES = [
  { id: 'f1', name: 'بنفسجي متوهج', colors: ['#8A2BE2', '#4B0082'] },
  { id: 'f2', name: 'ذهبي فاخر', colors: ['#FFD700', '#FFA500'], isPremium: true },
  { id: 'f3', name: 'ماسي', colors: ['#00FFFF', '#E0FFFF'], isPremium: true },
  { id: 'f4', name: 'ناري', colors: ['#FF4500', '#FF8C00'] },
  { id: 'f5', name: 'مجرة', colors: ['#8A2BE2', '#FF1493', '#FFD700', '#8A2BE2'], isPremium: true, animated: true },
];

export const INITIAL_USER_PROFILE = {
  id: 'u_me',
  name: 'باسم علي',
  username: '@basm_ali',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&fit=crop',
  bio: 'كن جميلاً ترى الوجود جميلاً ✨\nأحب البرمجة والتقنية والسفر والتعرف على أصدقاء جدد.',
  location: 'العراق - ميسان',
  status: 'متصل الآن',
  mood: PROFILE_MOODS[7], // متفائل
  points: '2.4K',
  friendsCount: 312,
  roomsCount: 18,
  selectedFrame: 'f5',
  selectedEntrance: 'e1',
};
