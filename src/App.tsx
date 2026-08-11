import { useState, useMemo, useEffect } from 'react';
import { User, Bell, Home, Hash, MessageSquare, LogIn } from 'lucide-react';
import HomeTab from './Home';
import ChatsTab from './ChatsTab';
import RoomsTab from './RoomsTab';
import NotificationsTab from './NotificationsTab';
import ProfileTab from './ProfileTab';
import { INITIAL_NOTIFICATIONS } from './notificationsMockData';
import { useAuth } from './lib/AuthContext';
import PremiumEntrance from './components/PremiumEntrance';

export default function App() {
  const [activeTab, setActiveTab] = useState('profile'); // Set default to profile for preview
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [hideNav, setHideNav] = useState(false);
  const { user, profile, loading, login } = useAuth();
  
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    if (profile && profile.isPremium) {
      const hasShown = sessionStorage.getItem('hasShownEntrance');
      if (!hasShown) {
        setShowEntrance(true);
        sessionStorage.setItem('hasShownEntrance', 'true');
      }
    }
  }, [profile]);

  useEffect(() => {
    const handleTestEntrance = () => setShowEntrance(true);
    window.addEventListener('testPremiumEntrance', handleTestEntrance);
    return () => window.removeEventListener('testPremiumEntrance', handleTestEntrance);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  // RTL order: Profile (Right) to Chats (Left)
  const navItems = [
    { id: 'profile', icon: User, label: 'الملف الشخصي' },
    { id: 'notifications', icon: Bell, label: 'الإشعارات', badge: unreadCount > 0 ? unreadCount.toString() : undefined },
    { id: 'home', icon: Home, label: 'الرئيسية', isCenter: true },
    { id: 'rooms', icon: Hash, label: 'الرومات' },
    { id: 'chats', icon: MessageSquare, label: 'الدردشات' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black w-full">
        <div className="w-full max-w-[412px] h-[100dvh] bg-[#0B0914] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#8A2BE2]/30 border-t-[#8A2BE2] rounded-full animate-spin mb-4"></div>
          <p className="text-white/60">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black w-full overflow-hidden">
        <div className="w-full max-w-[412px] h-[100dvh] bg-[#0B0914] flex flex-col items-center justify-center p-8 relative shadow-2xl sm:border-x sm:border-[#232035]">
          <div className="w-24 h-24 bg-gradient-to-br from-[#8A2BE2] to-[#B266FF] rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(138,43,226,0.3)] mb-8 transform rotate-12">
            <MessageSquare className="w-12 h-12 text-white -rotate-12" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">أهلاً بك</h1>
          <p className="text-gray-400 text-center mb-10 text-sm leading-relaxed">سجل دخولك الآن وتواصل مع أصدقائك في بيئة آمنة ومميزة</p>
          
          <button 
            onClick={login}
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-lg active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            <span>المتابعة باستخدام Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black w-full overflow-hidden">
      {showEntrance && <PremiumEntrance onComplete={() => setShowEntrance(false)} userName={profile?.name || 'مستخدم مميز'} />}
      <div className="w-full max-w-[412px] h-[100dvh] bg-[#0B0914] text-white overflow-hidden font-sans relative shadow-2xl shadow-[#8A2BE2]/10 sm:border-x sm:border-[#232035] flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
          {activeTab === 'home' ? (
            <div className="overflow-y-auto flex-1"><HomeTab /></div>
          ) : activeTab === 'chats' ? (
             <ChatsTab onChatOpen={() => setHideNav(true)} onChatClose={() => setHideNav(false)} />
          ) : activeTab === 'rooms' ? (
             <RoomsTab onChatOpen={() => setHideNav(true)} onChatClose={() => setHideNav(false)} />
          ) : activeTab === 'notifications' ? (
             <NotificationsTab 
               notifications={notifications} 
               setNotifications={setNotifications} 
               onNavigate={(tab: string) => setActiveTab(tab)} 
             />
          ) : activeTab === 'profile' ? (
             <ProfileTab onNavigate={(tab: string) => setActiveTab(tab)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#8A2BE2]/20 flex items-center justify-center border border-[#8A2BE2]/40">
                {navItems.find(n => n.id === activeTab)?.icon({ className: "w-8 h-8 text-[#B266FF]" })}
              </div>
              <h1 className="text-xl font-bold text-white">قريباً</h1>
              <p className="text-sm text-gray-400">هذه الصفحة قيد التطوير</p>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        {!hideNav && (
          <nav className="absolute bottom-0 left-0 right-0 bg-[#0B0914]/95 backdrop-blur-xl border-t border-[#232035] px-2 pb-6 pt-2 z-50">
            <div className="flex justify-between items-center relative h-16">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                if (item.isCenter) {
                  return (
                    <div key={item.id} className="relative flex flex-col items-center justify-center w-[20%]" onClick={() => setActiveTab(item.id)}>
                      <div className="absolute -top-10 flex flex-col items-center cursor-pointer group">
                        <div className="w-[58px] h-[58px] bg-[#8A2BE2] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.5)] transform rotate-3 transition-transform group-hover:scale-105">
                          <div className="-rotate-3">
                            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} fill="currentColor" />
                          </div>
                        </div>
                        <span className="text-[#B266FF] text-[10px] mt-2 font-bold">{item.label}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="flex flex-col items-center justify-center gap-1.5 w-[20%] cursor-pointer rounded-xl py-1 transition-colors relative group"
                  >
                    <div className="relative">
                      <Icon className={`w-[22px] h-[22px] ${isActive ? 'text-[#B266FF]' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-2 bg-[#B266FF] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#0B0914]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium ${isActive ? 'text-[#B266FF]' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
