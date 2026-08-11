import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Crown, Hash, Lock, Menu, Mic, MoreVertical, Search, Settings, Shield, Star, Users, X } from 'lucide-react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import { db } from './lib/firebase';
import { useAuth } from './lib/AuthContext';
import { MOCK_ROOMS, MOCK_ROOM_MESSAGES, MOCK_ROOM_MEMBERS, type Room, type RoomMessage, type RoomMember } from './roomsMockData';
import MessageComposer from './components/MessageComposer';
import VoiceMessagePlayer from './components/VoiceMessagePlayer';
import PremiumEntrance from './components/PremiumEntrance';

const CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'featured', label: 'المميزة' },
  { id: 'active', label: 'النشطة' },
  { id: 'private', label: 'الخاصة' },
];

export default function RoomsTab({ onChatOpen, onChatClose }: { onChatOpen?: () => void; onChatClose?: () => void }) {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [passwordRoom, setPasswordRoom] = useState<Room | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (activeRoom) onChatOpen?.(); else onChatClose?.();
    return () => onChatClose?.();
  }, [activeRoom, onChatOpen, onChatClose]);

  const filteredRooms = useMemo(() => MOCK_ROOMS.filter(room => {
    const categoryOk = category === 'all' || (category === 'private' ? room.type === 'private' : room.categoryId === category || (category === 'featured' && room.featured));
    const searchOk = !search.trim() || room.name.includes(search.trim()) || room.description.includes(search.trim());
    return categoryOk && searchOk;
  }), [category, search]);

  const openRoom = (room: Room) => {
    if (room.type === 'private') {
      setPasswordRoom(room);
      setPassword('');
      setPasswordError('');
      return;
    }
    setActiveRoom(room);
  };

  const submitPassword = () => {
    if (!passwordRoom) return;
    if (password === passwordRoom.accessCode) {
      setActiveRoom(passwordRoom);
      setPasswordRoom(null);
      setPassword('');
    } else {
      setPasswordError('رمز الدخول غير صحيح');
    }
  };

  if (activeRoom) return <RoomDetail room={activeRoom} onBack={() => setActiveRoom(null)} />;

  return (
    <div className="h-full flex flex-col bg-[#0B0914] pb-24">
      <header className="px-5 pt-10 pb-4 border-b border-[#232035] bg-[#0B0914]/95 backdrop-blur-xl z-10">
        <div className="flex items-center justify-between mb-5"><Menu className="w-7 h-7 text-gray-300" /><div className="flex items-center gap-2"><Hash className="w-6 h-6 text-[#B266FF]" /><h1 className="text-xl font-bold">الرومات</h1></div><MoreVertical className="w-6 h-6 text-gray-300" /></div>
        <div className="flex items-center gap-2 bg-[#14121F] border border-[#232035] rounded-xl px-3 py-2 mb-3"><Search className="w-4 h-4 text-gray-500" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن اسم الروم..." className="flex-1 bg-transparent outline-none text-sm" /></div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">{CATEGORIES.map(c => <button key={c.id} onClick={()=>setCategory(c.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs border ${category===c.id ? 'bg-[#8A2BE2] border-[#8A2BE2] text-white' : 'bg-[#14121F] border-[#232035] text-gray-400'}`}>{c.label}</button>)}</div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {filteredRooms.map(room => (
          <button key={room.id} onClick={()=>openRoom(room)} className="w-full text-right bg-[#12101C] border border-[#1C1A29] rounded-2xl p-3 flex gap-3 hover:border-[#8A2BE2]/40 transition">
            <img src={room.image} className="w-24 h-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div><div className="flex items-center gap-2"><h3 className="font-bold truncate">{room.name}</h3>{room.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}{room.type==='private' && <Lock className="w-4 h-4 text-[#B266FF]" />}</div><p className="text-xs text-gray-500 truncate mt-1">{room.description}</p></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-1 text-[11px] text-gray-400"><Users className="w-4 h-4" />{room.memberCount}</div><span className="text-[10px] text-green-400">متاح الآن</span></div>
            </div>
          </button>
        ))}
      </div>

      {passwordRoom && (
        <div className="absolute inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-[#171421] border border-[#2D2A43] rounded-2xl p-5">
            <div className="flex justify-between items-center"><h3 className="font-bold">روم خاص</h3><button onClick={()=>setPasswordRoom(null)}><X className="w-5 h-5" /></button></div>
            <p className="text-xs text-gray-400 mt-2">أدخل رمز الدخول إلى {passwordRoom.name}</p>
            <input value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submitPassword()} className="w-full mt-4 bg-[#0B0914] border border-[#2D2A43] rounded-xl px-3 py-3 outline-none text-center tracking-[.4em]" placeholder="••••" autoFocus />
            {passwordError && <p className="text-red-400 text-xs mt-2">{passwordError}</p>}
            <button onClick={submitPassword} className="w-full mt-4 bg-[#8A2BE2] rounded-xl py-3 font-bold">دخول</button>
          </div>
        </div>
      )}
    </div>
  );
}

function RoomDetail({ room, onBack }: { room: Room; onBack: () => void }) {
  const { profile } = useAuth();
  // IMPORTANT: define this before any hook dependency or callback references it.
  // The old code declared it later, which caused `Cannot access 'isOwner' before initialization`
  // and React rendered a completely blank/black room screen.
  const isOwner = room.ownerId === 'me' || (!!profile?.uid && room.ownerId === profile.uid);

  const [messages, setMessages] = useState<RoomMessage[]>(MOCK_ROOM_MESSAGES[room.id] || []);
  const [members, setMembers] = useState<RoomMember[]>(MOCK_ROOM_MEMBERS[room.id] || []);
  const [currentEntrance, setCurrentEntrance] = useState<{ userName: string; entranceEffect: string } | null>(null);
  const entranceQueue = useRef<{ userName: string; entranceEffect: string }[]>([]);
  const entranceTriggered = useRef(false);
  const joinedAt = useRef(Timestamp.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) return;
    setMembers(prev => {
      if (prev.some(m => m.userId === profile.uid || m.userId === 'me')) return prev;
      const premiumActive = profile.isPremium && (!profile.premiumExpiresAt || (typeof profile.premiumExpiresAt?.toDate === 'function' ? profile.premiumExpiresAt.toDate() > new Date() : new Date(profile.premiumExpiresAt) > new Date()));
      return [{ userId: profile.uid, name: profile.name, avatar: profile.photoURL, role: isOwner ? 'owner' : 'member', isPremium: premiumActive }, ...prev];
    });
  }, [profile, room.id, isOwner]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (!profile?.isPremium || entranceTriggered.current) return;
    const active = !profile.premiumExpiresAt || (typeof profile.premiumExpiresAt?.toDate === 'function' ? profile.premiumExpiresAt.toDate() > new Date() : new Date(profile.premiumExpiresAt) > new Date());
    if (!active) return;
    entranceTriggered.current = true;
    addDoc(collection(db, `rooms/${room.id}/entranceEvents`), {
      userId: profile.uid,
      userName: profile.name,
      entranceEffect: (profile.entrance === 'fade' || !profile.entrance) ? 'vip_entrance_alpha.webm' : profile.entrance,
      timestamp: serverTimestamp(),
    }).catch(err => console.warn('Entrance event write skipped:', err));
  }, [profile, room.id]);

  useEffect(() => {
    const q = query(collection(db, `rooms/${room.id}/entranceEvents`), where('timestamp', '>', joinedAt.current), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, snap => {
      snap.docChanges().forEach(change => {
        if (change.type !== 'added') return;
        const data = change.doc.data() as any;
        const item = { userName: data.userName || 'عضو مميز', entranceEffect: data.entranceEffect || 'vip_entrance_alpha.webm' };
        if (!currentEntrance) setCurrentEntrance(item); else entranceQueue.current.push(item);
      });
    }, err => console.warn('Entrance listener unavailable:', err));
    return unsub;
  }, [room.id, currentEntrance]);

  const finishEntrance = () => {
    const next = entranceQueue.current.shift();
    setCurrentEntrance(next || null);
  };

  const sendText = (content: string) => {
    if (!profile || !content.trim()) return;
    setMessages(prev => [...prev, { id: `local_${Date.now()}`, senderId: profile.uid, senderName: profile.name, senderAvatar: profile.photoURL, senderRole: isOwner ? 'owner' : 'member', isPremium: profile.isPremium, type: 'text', content, time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const sendVoice = (duration: string) => {
    if (!profile) return;
    setMessages(prev => [...prev, { id: `voice_${Date.now()}`, senderId: profile.uid, senderName: profile.name, senderAvatar: profile.photoURL, senderRole: isOwner ? 'owner' : 'member', isPremium: profile.isPremium, type: 'voice', content: 'رسالة صوتية', duration, time: 'الآن' }]);
  };

  const sendImage = (imageUrl: string, caption: string) => {
    if (!profile) return;
    setMessages(prev => [...prev, { id: `image_${Date.now()}`, senderId: profile.uid, senderName: profile.name, senderAvatar: profile.photoURL, senderRole: isOwner ? 'owner' : 'member', isPremium: profile.isPremium, type: 'image', content: caption || 'صورة', imageUrl, time: 'الآن' }]);
  };

  return (
    <div className="h-full flex flex-col bg-[#0B0914] relative z-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><img src={room.background} className="w-full h-full object-cover opacity-15" /><div className="absolute inset-0 bg-gradient-to-b from-[#0B0914]/85 via-[#0B0914]/90 to-[#0B0914]" /></div>
      <header className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#14121F]/90 backdrop-blur-xl border-b border-[#232035]">
        <div className="flex items-center gap-3"><button onClick={onBack}><ArrowRight className="w-6 h-6" /></button><img src={room.image} className="w-10 h-10 rounded-xl object-cover" /><div><div className="flex items-center gap-1"><h2 className="font-bold text-sm">{room.name}</h2>{isOwner && <Crown className="w-4 h-4 text-yellow-400 fill-current" />}</div><p className="text-[10px] text-green-400">{room.memberCount} عضو</p></div></div>
        <div className="flex items-center gap-3"><Mic className="w-5 h-5 text-gray-500" />{isOwner ? <Settings className="w-5 h-5 text-[#B266FF]" /> : <Shield className="w-5 h-5 text-gray-500" />}</div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {messages.map(msg => {
          const mine = msg.senderId === profile?.uid || msg.senderId === 'me';
          return <div key={msg.id} className={`flex gap-2 ${mine ? 'flex-row' : 'flex-row-reverse'}`}><img src={msg.senderAvatar} className="w-8 h-8 rounded-full object-cover shrink-0" /><div className={`max-w-[76%] ${mine ? 'items-start' : 'items-end'} flex flex-col`}><div className="flex items-center gap-1 mb-1"><span className={`text-[10px] ${msg.isPremium ? 'text-[#D4A5FF]' : 'text-gray-400'}`}>{msg.senderName}</span>{msg.senderRole==='owner'&&<Crown className="w-3 h-3 text-yellow-400 fill-current" />}</div><div className={`rounded-2xl px-3 py-2 ${mine ? 'bg-[#8A2BE2] rounded-tr-sm' : 'bg-[#1C1A29] border border-[#2D2A43] rounded-tl-sm'}`}>{msg.type==='voice' ? <VoiceMessagePlayer duration={msg.duration || '0:00'} isMe={mine} /> : msg.type==='image' ? <div><img src={msg.imageUrl || msg.content} className="max-h-56 rounded-xl object-cover" />{msg.content && msg.imageUrl && <p className="text-xs mt-2">{msg.content}</p>}</div> : <p className="text-sm leading-6 break-words">{msg.content}</p>}</div><span className="text-[9px] text-gray-600 mt-1">{msg.time}</span></div></div>;
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative z-10"><MessageComposer onSendText={sendText} onSendVoice={sendVoice} onSendImage={sendImage} placeholder={`اكتب في ${room.name}...`} /></div>

      {currentEntrance && <PremiumEntrance onComplete={finishEntrance} videoSrc={`${import.meta.env.BASE_URL}assets/entrance-effects/${currentEntrance.entranceEffect}`} userName={currentEntrance.userName} />}
    </div>
  );
}
