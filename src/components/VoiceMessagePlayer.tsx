import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VoiceMessagePlayer({ duration, isMe }: { duration: string, isMe: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-3 w-48 py-1">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-9 h-9 flex items-center justify-center rounded-full shrink-0 shadow-md transition ${
          isMe ? 'bg-white text-[#8A2BE2]' : 'bg-[#8A2BE2] text-white'
        }`}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>
      
      <div className="flex-1 flex items-center gap-0.5 h-6">
        {[...Array(15)].map((_, i) => {
           // Create a static wave pattern
           const height = 30 + Math.abs(Math.sin(i * 0.5)) * 70;
           return (
             <div 
               key={i} 
               className={`w-1 rounded-full ${isMe ? 'bg-white/70' : 'bg-[#8A2BE2]/70'} ${isPlaying ? 'waveform-bar' : ''}`} 
               style={{ 
                 height: `${height}%`,
                 animationDelay: isPlaying ? `${i * 0.1}s` : '0s'
               }}
             />
           )
        })}
      </div>
      
      <span className={`text-[10px] font-mono shrink-0 ${isMe ? 'text-white/80' : 'text-gray-400'}`}>
        {duration}
      </span>
    </div>
  );
}
