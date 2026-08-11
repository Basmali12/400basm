import { useMemo, useState } from 'react';
import { Bell, Check, Search, Trash2, UserPlus, MessageSquare, Users, Settings } from 'lucide-react';
import type { NotificationItem, NotificationType } from './notificationsMockData';

export default function NotificationsTab({ notifications, setNotifications, onNavigate }: any) {
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [search, setSearch] = useState('');

  const items = useMemo(() => notifications.filter((n: NotificationItem) => {
    const matchesFilter = filter === 'all' || n.type === filter;
    const q = search.trim();
    const matchesSearch = !q || n.title.includes(q) || n.description.includes(q);
    return matchesFilter && matchesSearch;
  }), [notifications, filter, search]);

  const markRead = (id: string) => setNotifications((prev: NotificationItem[]) => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const remove = (id: string) => setNotifications((prev: NotificationItem[]) => prev.filter(n => n.id !== id));

  const iconFor = (type: NotificationType) => {
    if (type === 'friend_request') return <UserPlus className="w-5 h-5" />;
    if (type === 'message') return <MessageSquare className="w-5 h-5" />;
    if (type === 'room') return <Users className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  return (
    <div className="flex h-full flex-col bg-[#0B0914] pb-24">
      <header className="px-5 pt-10 pb-4 border-b border-[#232035] bg-[#0B0914]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#B266FF]" />
            <h1 className="text-xl font-bold">الإشعارات</h1>
          </div>
          <button onClick={() => setNotifications((prev: NotificationItem[]) => prev.map(n => ({ ...n, isRead: true })))} className="text-xs text-[#D4A5FF] flex items-center gap-1">
            <Check className="w-4 h-4" /> الكل مقروء
          </button>
        </div>
        <div className="flex items-center gap-2 bg-[#14121F] border border-[#232035] rounded-xl px-3 py-2 mb-3">
          <Search className="w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في الإشعارات..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {([
            ['all','الكل'], ['friend_request','طلبات الصداقة'], ['message','الرسائل'], ['room','الرومات'], ['system','النظام']
          ] as const).map(([id,label]) => (
            <button key={id} onClick={() => setFilter(id as NotificationType | 'all')} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs border ${filter === id ? 'bg-[#8A2BE2]/25 text-[#D4A5FF] border-[#8A2BE2]' : 'bg-[#14121F] text-gray-400 border-[#232035]'}`}>{label}</button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {items.length === 0 ? (
          <div className="h-60 flex flex-col items-center justify-center text-gray-500"><Bell className="w-10 h-10 mb-3 opacity-40" /><p>لا توجد إشعارات هنا</p></div>
        ) : items.map((n: NotificationItem) => (
          <div key={n.id} onClick={() => markRead(n.id)} className={`relative rounded-2xl border p-4 flex gap-3 ${n.isRead ? 'bg-[#12101C] border-[#1C1A29]' : 'bg-[#171223] border-[#8A2BE2]/40'}`}>
            <div className="w-11 h-11 rounded-full bg-[#2A2440] text-[#D4A5FF] flex items-center justify-center shrink-0 overflow-hidden">
              {n.userAvatar ? <img src={n.userAvatar} className="w-full h-full object-cover" /> : n.roomImage ? <img src={n.roomImage} className="w-full h-full object-cover" /> : iconFor(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2"><h3 className="font-bold text-sm truncate">{n.title}</h3><span className="text-[10px] text-gray-500 shrink-0">{n.timestamp}</span></div>
              <p className="text-xs text-gray-400 mt-1 whitespace-pre-line line-clamp-2">{n.description}</p>
              <div className="flex gap-2 mt-3">
                {n.type === 'friend_request' && <button onClick={(e) => { e.stopPropagation(); remove(n.id); }} className="px-3 py-1.5 rounded-lg bg-[#8A2BE2] text-xs font-bold">قبول</button>}
                {n.type === 'message' && <button onClick={(e) => { e.stopPropagation(); onNavigate?.('chats'); markRead(n.id); }} className="px-3 py-1.5 rounded-lg bg-[#2A2440] text-xs">فتح الدردشة</button>}
                {n.type === 'room' && <button onClick={(e) => { e.stopPropagation(); onNavigate?.('rooms'); markRead(n.id); }} className="px-3 py-1.5 rounded-lg bg-[#2A2440] text-xs">فتح الرومات</button>}
                <button onClick={(e) => { e.stopPropagation(); remove(n.id); }} className="p-1.5 text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            {!n.isRead && <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#B266FF]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
