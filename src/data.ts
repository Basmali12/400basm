export const MOCK_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"
];

export const FEATURED_ROOMS = [
  {
    id: 1,
    title: "مجلس السهر",
    subtitle: "دردشة وناسة بدون قيود",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=400&fit=crop",
    viewers: 128,
    avatars: MOCK_AVATARS.slice(0, 4),
    extraCount: 45,
    hasCrown: true
  },
  {
    id: 2,
    title: "أهل الذوق",
    subtitle: "نقاش راقي ومواضيع متنوعة",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=400&fit=crop",
    viewers: 96,
    avatars: MOCK_AVATARS.slice(1, 5),
    extraCount: 32,
    hasCrown: false
  },
  {
    id: 3,
    title: "رحّالون",
    subtitle: "تجارب وأسفار حول العالم",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=300&h=400&fit=crop",
    viewers: 74,
    avatars: MOCK_AVATARS.slice(0, 3),
    extraCount: 20,
    hasCrown: false
  }
];

export const ACTIVE_ROOMS = [
  {
    id: 1,
    title: "عالم التقنية",
    subtitle: "كل ما يخص التكنولوجيا والبرامج",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop",
    viewers: 56,
    avatars: MOCK_AVATARS.slice(0, 4),
    extraCount: 51,
    verified: true
  },
  {
    id: 2,
    title: "سوالف عامة",
    subtitle: "مواضيع عامة ونقاشات حرة",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop",
    viewers: 42,
    avatars: MOCK_AVATARS.slice(1, 5),
    extraCount: 37,
    verified: true
  },
  {
    id: 3,
    title: "ألعاب للجميع",
    subtitle: "العاب ومسابقات ممتعة",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=150&fit=crop",
    viewers: 35,
    avatars: MOCK_AVATARS.slice(0, 3),
    extraCount: 30,
    verified: true
  },
  {
    id: 4,
    title: "دروس ومذاكرة",
    subtitle: "مشاركة الدروس والملاحظات",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150&h=150&fit=crop",
    viewers: 28,
    avatars: MOCK_AVATARS.slice(2, 5),
    extraCount: 23,
    verified: true
  }
];
