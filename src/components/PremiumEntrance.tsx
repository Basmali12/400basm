import React, { useRef, useEffect, useState } from 'react';

interface PremiumEntranceProps {
  onComplete: () => void;
  videoSrc?: string;
  userName?: string;
}

export default function PremiumEntrance({ 
  onComplete, 
  videoSrc = `${import.meta.env.BASE_URL}assets/entrance-effects/vip_entrance_alpha.webm`,
  userName 
}: PremiumEntranceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => onComplete();
    const handleError = () => {
      console.error("Video failed to load. Make sure the file exists in public/assets/entrance-effects/vip_entrance_alpha.webm");
      setError(true);
      onComplete(); // Skip effect on error
    }
    
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Safety net: never allow the entrance overlay to trap the room screen.
    const safetyTimer = window.setTimeout(onComplete, 12000);

    return () => {
      window.clearTimeout(safetyTimer);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('play', handlePlay);
    
    // Play with sound (user interacted with login/button)
    video.play().catch(e => {
       console.error("Autoplay failed:", e);
       // Try muted if sound is blocked
       video.muted = true;
       video.play().catch(console.error);
    });

    return () => {
      video.removeEventListener('play', handlePlay);
    };
  }, []);

  if (error) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        className={`w-full h-full object-cover bg-transparent transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {userName && isVideoLoaded && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-bottom-10 duration-1000 zoom-in-95 z-50">
          <div className="bg-gradient-to-r from-purple-900/80 via-black/80 to-purple-900/80 backdrop-blur-md px-8 py-4 rounded-full border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span className="text-white text-xl font-bold tracking-wide">
              دخل {userName} إلى الروم
            </span>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      )}
    </div>
  );
}
