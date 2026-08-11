import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Image as ImageIcon, X } from 'lucide-react';

interface MessageComposerProps {
  onSendText: (text: string) => void;
  onSendVoice: (duration: string, file?: File) => void;
  onSendImage: (imageUrl: string, caption: string, file?: File) => void;
  onShowAlert?: (title: string, msg: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function MessageComposer({ 
  onSendText, 
  onSendVoice, 
  onSendImage,
  onShowAlert,
  placeholder = "اكتب رسالة...",
  disabled = false
}: MessageComposerProps) {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{url: string, file: File} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendText = () => {
    if (selectedImage) {
      onSendImage(selectedImage.url, inputText.trim(), selectedImage.file);
      setSelectedImage(null);
      setInputText('');
      return;
    }
    if (inputText.trim()) {
      onSendText(inputText.trim());
      setInputText('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onShowAlert && !file.type.startsWith('image/')) {
         onShowAlert('خطأ', 'يرجى اختيار صورة صالحة');
         return;
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({url: imageUrl, file});
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  // Adjust height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  return (
    <div className="bg-[#14121F] border-t border-[#232035] p-3 pb-6 relative z-30 flex flex-col gap-2">
      {/* Image Preview Area */}
      {selectedImage && (
        <div className="relative self-start mb-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#8A2BE2]/50">
            <img src={selectedImage.url} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Composer Row */}
      {isRecording ? (
        <div className="flex items-center justify-between bg-[#1C1A29] rounded-full p-2 pr-4 border border-[#8A2BE2]/40 shadow-[0_0_15px_rgba(138,43,226,0.1)]">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
              <span className="text-white font-mono text-sm">{formatTime(recordingTime)}</span>
           </div>
           
           {/* Fake Waveform */}
           <div className="flex-1 flex items-center justify-center gap-1 px-4 h-6">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1 bg-[#8A2BE2] rounded-full waveform-bar" style={{ animationDelay: `${i * 0.1}s`, height: '80%' }}></div>
              ))}
           </div>

           <div className="flex items-center gap-2">
              <button onClick={() => setIsRecording(false)} className="text-gray-400 hover:text-red-400 p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  onSendVoice(formatTime(recordingTime));
                  setIsRecording(false);
                }} 
                className="bg-[#8A2BE2] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:bg-[#9B45E6] hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4 -mr-0.5" />
              </button>
           </div>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="text-gray-400 hover:text-[#B266FF] p-2.5 transition shrink-0 mb-0.5">
            <ImageIcon className="w-6 h-6" />
          </button>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          
          <div className="flex-1 bg-[#1C1A29] border border-[#2D2A43] rounded-3xl flex items-center px-4 focus-within:border-[#8A2BE2]/50 transition-colors shadow-inner min-h-[44px]">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder-gray-500 py-3 resize-none max-h-[120px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {inputText.trim() || selectedImage ? (
            <button 
              onClick={handleSendText}
              className="bg-[#8A2BE2] text-white w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.4)] hover:bg-[#9B45E6] shrink-0 transition-all hover:scale-105 mb-0.5 animate-in zoom-in"
            >
              <Send className="w-5 h-5 -mr-1" />
            </button>
          ) : (
            <button 
              onClick={() => setIsRecording(true)}
              className="bg-[#2A2440] text-gray-300 w-[44px] h-[44px] rounded-full flex items-center justify-center border border-[#3D3A53] hover:text-[#8A2BE2] shrink-0 transition-colors mb-0.5"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
