import { useState, useRef, useEffect, useMemo } from 'react';
import { Menu, Edit, ArrowRight, MoreVertical, Paperclip, Mic, Send, Play, Pause, Image as ImageIcon, X, Star, Users, ShieldAlert } from 'lucide-react';
import { User } from './chatMockData';
import MessageComposer from './components/MessageComposer';
import VoiceMessagePlayer from './components/VoiceMessagePlayer';
import { useAuth, UserProfile } from './lib/AuthContext';
import { db } from './lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, doc, getDoc, setDoc, where } from 'firebase/firestore';
import { ChatMessage, uploadMedia, Conversation } from './lib/chatUtils';

const GLOBAL_CHAT_ID = 'general';

export default function ChatsTab({ onChatOpen, onChatClose }: { onChatOpen?: () => void, onChatClose?: () => void }) {
  const { user: currentUser, profile } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'all' | 'groups' | 'blocked'>('all');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    if (activeChatId) onChatOpen?.(); else onChatClose?.();
    return () => onChatClose?.();
  }, [activeChatId, onChatOpen, onChatClose]);
  
  const [users, setUsers] = useState<Record<string, UserProfile>>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      const usersData: Record<string, UserProfile> = {};
      snap.forEach(d => { usersData[d.id] = d.data() as UserProfile; });
      setUsers(usersData);
    });
    return unsub;
  }, [currentUser]);

  const globalConversation: Conversation = useMemo(() => ({ id: GLOBAL_CHAT_ID, participants: [], updatedAt: null, isGroup: true, title: 'دردشة عامة' }), []);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, 'conversations'), where('participants', 'array-contains', currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const convs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
      setConversations(convs);
    });
    return unsub;
  }, [currentUser]);

  const getFilteredConversations = () => {
    const allConvs = [globalConversation, ...conversations];
    if (activeFilter === 'groups') return allConvs.filter(c => c.isGroup);
    if (activeFilter === 'blocked') return [];
    return allConvs;
  };

  const getParticipant = (conv: Conversation) => {
    if (conv.isGroup) return null;
    const partnerId = conv.participants.find(p => p !== currentUser?.uid);
    return partnerId ? users[partnerId] : null;
  };

  if (activeChatId && currentUser) {
    let conversation = activeChatId === GLOBAL_CHAT_ID ? globalConversation : conversations.find(c => c.id === activeChatId);
    if (!conversation) return null;
    const participant = getParticipant(conversation);
    return <ChatDetail conversation={conversation} participant={participant} currentUser={currentUser} onBack={() => setActiveChatId(null)} />;
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#0B0914] pb-24">
      <header className="px-5 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-300 hover:text-white transition"><Menu className="w-7 h-7" /></button>
          <h1 className="text-xl font-bold text-white">الدردشة</h1>
          <button className="text-gray-300 hover:text-white transition"><Edit className="w-6 h-6" /></button>
        </div>
        <div className="flex bg-[#14121F] rounded-xl p-1 border border-[#232035]">
          {[{ id: 'all', label: 'الكل' }, { id: 'groups', label: 'المجموعات' }, { id: 'blocked', label: 'المحظورات' }].map(filter => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id as any)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeFilter === filter.id ? 'bg-[#2A1B4E] text-[#D4A5FF] shadow-[0_0_10px_rgba(138,43,226,0.2)]' : 'text-gray-400 hover:text-gray-200'}`}>{filter.label}</button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-3 pb-4">
        {getFilteredConversations().map(conv => {
          const participant = getParticipant(conv);
          return (
            <div key={conv.id} onClick={() => setActiveChatId(conv.id)} className="bg-[#12101C] rounded-2xl p-3 flex items-center gap-4 border border-[#1C1A29] shadow-md transition cursor-pointer hover:bg-[#181524]">
              <div className="relative flex-shrink-0">
                {conv.isGroup ? (
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#4B0082] flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.3)] border border-[#B266FF]/30"><Users className="w-7 h-7 text-white" /></div>
                ) : participant ? (
                  participant.isPremium ? (
                    <div className="premium-avatar-wrapper w-[56px] h-[56px]"><img src={participant.photoURL || ''} className="w-full h-full rounded-full object-cover border-2 border-[#0B0914]" /><div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0B0914] z-10"></div></div>
                  ) : (
                    <div className="w-[52px] h-[52px] relative">
                      {participant.photoURL ? <img src={participant.photoURL} className="w-full h-full rounded-full object-cover" /> : <div className="w-full h-full rounded-full bg-[#8A2BE2] flex items-center justify-center text-white font-bold text-xl">{participant.name.charAt(0)}</div>}
                      {participant.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0B0914]"></div>}
                    </div>
                  )
                ) : null}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                <div className="flex justify-between items-center mb-1"><div className="flex items-center gap-1.5 truncate"><h3 className={`font-bold text-[15px] truncate ${participant?.isPremium ? 'text-[#D4A5FF]' : 'text-white'}`}>{conv.title || participant?.name || 'مستخدم'}</h3>{participant?.isPremium && <Star className="w-3.5 h-3.5 text-[#D4A5FF] fill-[#D4A5FF]" />}</div></div>
                <div className="flex justify-between items-center"><div className="text-gray-400 text-sm truncate flex-1 pl-2"><p className="truncate">انقر لفتح المحادثة</p></div></div>
              </div>
            </div>
          );
        })}
        {getFilteredConversations().length === 0 && <div className="text-center text-gray-500 mt-10">لا توجد محادثات هنا.</div>}
      </div>
    </div>
  );
}

function ChatDetail({ conversation, participant, currentUser, onBack }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const isGlobal = conversation.id === GLOBAL_CHAT_ID;

  useEffect(() => {
    const q = isGlobal ? query(collection(db, 'global_messages'), orderBy('createdAt', 'desc'), limit(50)) : query(collection(db, 'conversations', conversation.id, 'messages'), orderBy('createdAt', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      setMessages(msgs.reverse());
    });
    return unsub;
  }, [conversation.id, isGlobal]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (content: string, type: 'text' | 'voice' | 'image' = 'text', extra?: any) => {
    if (!content.trim() && type === 'text') return;
    let finalContent = content;
    setIsUploading(true);
    try {
      if (type === 'image' && extra?.file) {
        const path = `chat_media/${currentUser.uid}/${Date.now()}`;
        finalContent = await uploadMedia(extra.file, path);
      } else if (type === 'image' && extra?.content) {
        finalContent = extra.content;
      }
      const newMessage = { senderId: currentUser.uid, type, content: finalContent, duration: extra?.duration || null, createdAt: serverTimestamp() };
      if (isGlobal) {
        await addDoc(collection(db, 'global_messages'), newMessage);
      } else {
        await addDoc(collection(db, 'conversations', conversation.id, 'messages'), newMessage);
        await setDoc(doc(db, 'conversations', conversation.id), { updatedAt: serverTimestamp() }, { merge: true });
      }
    } catch (e) {
      console.error(e);
      alert('خطأ في إرسال الرسالة');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0B0914] relative z-20">
      <header className="flex items-center justify-between px-4 py-4 bg-[#14121F] border-b border-[#232035] shadow-md z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-300 hover:text-white p-1"><ArrowRight className="w-6 h-6" /></button>
          <div className="flex items-center gap-2.5">
            {conversation.isGroup ? <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#4B0082] flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div> : participant ? <div className="relative">{participant.photoURL ? <img src={participant.photoURL} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-[#8A2BE2] flex items-center justify-center text-white font-bold">{participant.name?.charAt(0) || '?'}</div>}{participant.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#14121F]"></div>}</div> : null}
            <div className="flex flex-col"><div className="flex items-center gap-1"><span className={`font-bold text-sm ${participant?.isPremium ? 'text-[#D4A5FF]' : 'text-white'}`}>{conversation.title || participant?.name || 'مستخدم'}</span>{participant?.isPremium && <Star className="w-3 h-3 text-[#D4A5FF] fill-[#D4A5FF]" />}</div><span className="text-[10px] text-gray-400">{conversation.isGroup ? 'دردشة عامة' : (participant?.isOnline ? 'متصل الآن' : 'غير متصل')}</span></div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-6 relative">
        {messages.map((msg: ChatMessage) => {
          const isMe = msg.senderId === currentUser.uid;
          return <div key={msg.id} className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}><div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMe ? 'bg-gradient-to-bl from-[#8A2BE2] to-[#6014AD] text-white rounded-tr-sm shadow-[0_4px_15px_rgba(138,43,226,0.15)]' : 'bg-[#1C1A29] text-gray-100 rounded-tl-sm border border-[#2D2A43]'}`}>{msg.type === 'text' && <p className="text-[15px] leading-relaxed break-words">{msg.content}</p>}{msg.type === 'voice' && <VoiceMessagePlayer duration={msg.duration || '0:00'} isMe={isMe} />}{msg.type === 'image' && <div className="rounded-xl overflow-hidden"><img src={msg.content} alt="Attachment" className="max-w-full h-auto max-h-48 object-cover rounded-lg" loading="lazy" /></div>}</div></div>;
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageComposer onSendText={(text) => handleSend(text, 'text')} onSendVoice={(duration, file) => handleSend('رسالة صوتية', 'voice', { duration, file })} onSendImage={(imageUrl, caption, file) => handleSend(caption || 'صورة مرفقة', 'image', { content: imageUrl, file })} placeholder="اكتب رسالة..." disabled={isUploading} />
    </div>
  );
}
