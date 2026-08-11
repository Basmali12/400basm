import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Crown, Shield, Star, ChevronLeft, Zap, BadgeCheck, MessageCircle } from 'lucide-react';
import { MOCK_AVATARS, FEATURED_ROOMS, ACTIVE_ROOMS } from './data';

export default function HomeTab() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const banners = [1, 2, 3, 4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % banners.length;
        if (scrollRef.current) {
          const child = scrollRef.current.children[next] as HTMLElement;
          if (child) {
            child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="flex flex-col w-full h-full pb-28">
      <header className="flex justify-between items-center px-5 pt-8 pb-2">
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-200" />
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-200" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#B266FF] text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">3</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <h1 className="text-2xl font-black text-white tracking-wide">دَردشـتِي</h1>
            <Crown className="w-5 h-5 text-orange-400 absolute -top-4 -right-1 transform rotate-12 fill-orange-400" />
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">تواصل بحرية واحترام</p>
        </div>
        <div className="relative">
          <img src={MOCK_AVATARS[0]} alt="Profile" className="w-12 h-12 rounded-full border-[2.5px] border-[#8A2BE2] object-cover" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0B0914]"></div>
        </div>
      </header>

      <div className="relative mx-5 mt-4">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-[20px] border border-[#2D2A43] shadow-lg shadow-purple-900/10" style={{ scrollBehavior: 'smooth' }} onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const scrollPos = Math.abs(target.scrollLeft);
          const slideWidth = target.clientWidth;
          const newIndex = Math.round(scrollPos / slideWidth);
          if (newIndex !== currentSlide && newIndex < banners.length) setCurrentSlide(newIndex);
        }}>
          {banners.map((_, idx) => (
            <div key={idx} className="snap-center min-w-full relative h-[160px] bg-gradient-to-l from-[#180C33] to-[#2B1454] p-5 flex flex-col justify-center items-start overflow-hidden">
              <div className="absolute top-2 left-10 text-white/20 text-xl">✨</div>
              <div className="absolute bottom-4 right-1/2 text-white/10 text-xl">✨</div>
              <div className="absolute top-8 right-8 text-white/30 text-sm">✦</div>
              <h2 className="text-lg font-bold text-white z-10 flex items-center gap-2">مرحباً بك في دردشتي <span className="text-xl">👋</span></h2>
              <p className="text-xs text-gray-300 mt-1.5 max-w-[65%] leading-relaxed z-10">تواصل مع الأصدقاء واكتشف رومات جديدة ومميزة</p>
              <button className="mt-4 bg-purple-900/40 border border-purple-500/50 text-purple-200 text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-10 hover:bg-purple-800/60 transition font-bold">
                <Shield className="w-3.5 h-3.5" />قواعد الدردشة
              </button>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 drop-shadow-2xl opacity-95 pointer-events-none">
                <div className="relative w-28 h-28">
                   <div className="absolute top-3 right-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl rounded-tr-sm w-16 h-14 flex items-center justify-center shadow-[0_5px_15px_rgba(138,43,226,0.4)] transform -rotate-6 border border-purple-300/30"><MessageCircle className="text-white w-7 h-7 fill-white opacity-80" /></div>
                   <div className="absolute bottom-3 left-2 bg-gradient-to-br from-purple-500 to-purple-800 rounded-2xl rounded-tl-sm w-20 h-16 flex items-center justify-center shadow-[0_8px_20px_rgba(138,43,226,0.6)] transform rotate-3 border border-purple-400/30 z-10"><MessageCircle className="text-white w-9 h-9 fill-white opacity-90" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-4">
          {banners.map((_, idx) => <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-4 bg-[#8A2BE2]' : 'w-1.5 bg-[#2D2A43]'}`} />)}
        </div>
      </div>

      <div className="mx-5 mt-5 bg-[#14121F] rounded-2xl p-4 flex justify-between items-center border border-[#232035]">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span><span className="text-sm text-gray-300 font-medium">المتصلون الآن</span></div>
          <span className="text-[26px] font-bold text-[#B266FF] mt-1 leading-none">1,248</span>
        </div>
        <div className="flex items-center"><div className="flex items-center justify-end -space-x-3 space-x-reverse">
          {MOCK_AVATARS.map((src, i) => <img key={i} src={src} className="w-10 h-10 rounded-full border-[2px] border-[#14121F] object-cover relative" style={{ zIndex: 10 - i }} />)}
          <div className="w-10 h-10 rounded-full bg-[#2A2440] border-[2px] border-[#14121F] flex items-center justify-center text-[11px] font-bold text-[#B266FF] relative z-0">+243</div>
        </div></div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center px-5 mb-4"><div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><h2 className="text-lg font-bold text-white">الرومات المميزة</h2></div><button className="flex items-center gap-0.5 text-[#B266FF] text-sm font-medium">عرض الكل<ChevronLeft className="w-4 h-4" /></button></div>
        <div className="flex overflow-x-auto gap-4 px-5 pb-2 no-scrollbar">
          {FEATURED_ROOMS.map(room => (
            <div key={room.id} className="relative min-w-[145px] w-[145px] h-[210px] rounded-2xl overflow-hidden shadow-lg border border-[#2D2A43] flex-shrink-0">
              <img src={room.image} className="absolute inset-0 w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-[#0B0914]/50 to-transparent"></div>
              {room.hasCrown && <div className="absolute top-2 left-2"><Crown className="text-yellow-400 w-5 h-5 drop-shadow-md fill-yellow-400" /></div>}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1.5 border border-white/5"><span className="text-xs font-medium text-white">{room.viewers}</span><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span></div>
              <div className="absolute bottom-3 left-0 right-0 px-3 flex flex-col items-center text-center">
                <h3 className="text-white font-bold text-sm w-full truncate">{room.title}</h3><p className="text-[10px] text-gray-300 mb-2 mt-1 w-full truncate">{room.subtitle}</p>
                <div className="flex items-center justify-center -space-x-1.5 space-x-reverse">
                  {room.avatars.map((avatar, idx) => <img key={idx} src={avatar} className="w-6 h-6 rounded-full border-[1.5px] border-[#161423] object-cover relative" style={{ zIndex: 10 - idx }} />)}
                  <div className="w-6 h-6 rounded-full bg-[#2A2440] border-[1.5px] border-[#161423] flex items-center justify-center text-[8px] font-bold text-purple-300 relative z-0">+{room.extraCount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center px-5 mb-4"><div className="flex items-center gap-2"><Zap className="w-5 h-5 text-blue-500 fill-blue-500 text-white" /><h2 className="text-lg font-bold text-white">الرومات النشطة</h2></div><button className="flex items-center gap-0.5 text-[#B266FF] text-sm font-medium">عرض الكل<ChevronLeft className="w-4 h-4" /></button></div>
        <div className="flex flex-col gap-3 px-5">
          {ACTIVE_ROOMS.map(room => (
            <div key={room.id} className="bg-[#14121F] border border-[#232035] rounded-2xl p-3 flex justify-between items-center hover:bg-[#1A1829] transition">
              <div className="flex items-center gap-3 overflow-hidden"><div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#2D2A43]"><img src={room.image} className="w-full h-full object-cover" /><div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-black shadow-sm"></div></div><div className="flex flex-col items-start truncate"><div className="flex items-center gap-1.5"><h4 className="text-sm font-bold text-white truncate">{room.title}</h4>{room.verified && <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />}</div><p className="text-[11px] text-gray-400 mt-1 truncate">{room.subtitle}</p></div></div>
              <div className="flex items-center gap-3 flex-shrink-0"><div className="flex items-center justify-end -space-x-1.5 space-x-reverse"><div className="w-6 h-6 rounded-full bg-[#2A2440] border-[1.5px] border-[#14121F] flex items-center justify-center text-[9px] font-bold text-purple-300 relative z-0">+{room.extraCount}</div>{room.avatars.map((avatar, idx) => <img key={idx} src={avatar} className="w-6 h-6 rounded-full border-[1.5px] border-[#14121F] object-cover relative" style={{ zIndex: 10 - idx }} />)}</div><div className="bg-[#0B0914] rounded-full px-2 py-1 flex items-center gap-1.5 border border-[#2D2A43]"><span className="text-[11px] font-medium">{room.viewers}</span><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
