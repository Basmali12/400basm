import { useState } from 'react';
import { Crown, Edit3, LogOut, MessageSquare, Users, Settings, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from './lib/AuthContext';
import { MOCK_ACHIEVEMENTS, MOCK_FRIENDS, MOCK_USER_MEDIA } from './profileMockData';

export default function ProfileTab({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { profile, logout, updateProfileData } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');

  if (!profile) return null;

  const save = async () => {
    await updateProfileData({ name: name.trim() || profile.name, bio });
    setEditing(false);
  };

  const premiumActive = profile.isPremium && (!profile.premiumExpiresAt || (typeof profile.premiumExpiresAt?.toDate === 'function' ? profile.premiumExpiresAt.toDate() > new Date() : new Date(profile.premiumExpiresAt) > new Date()));

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#0B0914] pb-28">
      <div className="relative h-40 bg-gradient-to-br from-[#31115E] via-[#171126] to-[#0B0914]">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:'radial-gradient(circle at 30% 20%, #8A2BE2 0, transparent 30%), radial-gradient(circle at 80% 30%, #4169E1 0, transparent 25%)'}} />
      </div>
      <div className="px-5 -mt-14 relative z-10">
        <div className="flex items-end justify-between">
          <div className="relative">
            <div className={`w-28 h-28 rounded-full p-[3px] ${premiumActive ? 'bg-gradient-to-br from-yellow-300 via-[#B266FF] to-blue-500' : 'bg-[#2D2A43]'}`}>
              <div className="w-full h-full rounded-full bg-[#0B0914] p-1"><img src={profile.photoURL} className="w-full h-full rounded-full object-cover" /></div>
            </div>
            {premiumActive && <div className="absolute -top-2 -right-1 bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg"><Crown className="w-5 h-5 fill-current" /></div>}
          </div>
          <button onClick={() => setEditing(v => !v)} className="mb-2 bg-[#1C1A29] border border-[#2D2A43] rounded-xl px-4 py-2 text-sm flex items-center gap-2"><Edit3 className="w-4 h-4" /> تعديل</button>
        </div>

        {editing ? (
          <div className="mt-5 bg-[#14121F] rounded-2xl p-4 border border-[#232035] space-y-3">
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-[#1C1A29] border border-[#2D2A43] rounded-xl px-3 py-2 outline-none" />
            <textarea value={bio} onChange={e=>setBio(e.target.value)} className="w-full bg-[#1C1A29] border border-[#2D2A43] rounded-xl px-3 py-2 outline-none min-h-24" />
            <button onClick={save} className="w-full bg-[#8A2BE2] rounded-xl py-2 font-bold">حفظ</button>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-center gap-2"><h1 className="text-2xl font-black">{profile.name}</h1>{premiumActive && <ShieldCheck className="w-5 h-5 text-[#D4A5FF]" />}</div>
            <p className="text-xs text-gray-500 mt-1">{profile.email}</p>
            <p className="text-sm text-gray-300 whitespace-pre-line mt-3 leading-6">{profile.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[['الأصدقاء', MOCK_FRIENDS.length, Users], ['الصور', MOCK_USER_MEDIA.length, Sparkles], ['الإنجازات', MOCK_ACHIEVEMENTS.filter(a=>a.unlocked).length, Crown]].map(([label,count,Icon]: any) => (
            <div key={label} className="bg-[#14121F] border border-[#232035] rounded-2xl p-3 text-center"><Icon className="w-5 h-5 text-[#B266FF] mx-auto mb-1" /><div className="font-bold">{count}</div><div className="text-[10px] text-gray-500">{label}</div></div>
          ))}
        </div>

        {premiumActive && (
          <div className="mt-5 rounded-2xl p-4 border border-yellow-400/30 bg-gradient-to-l from-yellow-500/10 to-[#8A2BE2]/15">
            <div className="flex items-center gap-2 text-yellow-300 font-bold"><Crown className="w-5 h-5 fill-current" /> عضو مميز</div>
            <p className="text-xs text-gray-300 mt-2">إطار مميز، دخلة خاصة، وصلاحيات المزايا المميزة.</p>
            <button onClick={() => window.dispatchEvent(new Event('testPremiumEntrance'))} className="mt-3 bg-[#8A2BE2] rounded-xl px-4 py-2 text-xs font-bold">تجربة الدخلة 🎬</button>
          </div>
        )}

        <div className="mt-5 space-y-2">
          <button onClick={() => onNavigate?.('chats')} className="w-full bg-[#14121F] border border-[#232035] rounded-xl p-4 flex items-center gap-3"><MessageSquare className="w-5 h-5 text-[#B266FF]" /><span>الدردشات</span></button>
          <button onClick={() => onNavigate?.('rooms')} className="w-full bg-[#14121F] border border-[#232035] rounded-xl p-4 flex items-center gap-3"><Users className="w-5 h-5 text-[#B266FF]" /><span>الرومات</span></button>
          <button className="w-full bg-[#14121F] border border-[#232035] rounded-xl p-4 flex items-center gap-3"><Settings className="w-5 h-5 text-gray-400" /><span>الإعدادات</span></button>
          <button onClick={logout} className="w-full bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-center gap-3"><LogOut className="w-5 h-5" /><span>تسجيل الخروج</span></button>
        </div>
      </div>
    </div>
  );
}
