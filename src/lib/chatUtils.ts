import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, storage } from './firebase';
import { useAuth } from './AuthContext';
import { collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

export type MessageType = 'text' | 'voice' | 'image';

export interface ChatMessage {
  id: string;
  senderId: string;
  type: MessageType;
  content: string;
  duration?: string;
  createdAt: any;
}

export interface Conversation {
  id: string;
  participants: string[];
  updatedAt: any;
  lastMessage?: ChatMessage;
  unreadCount?: number;
  isGroup?: boolean;
  title?: string;
}

export const uploadMedia = async (file: File, path: string): Promise<string> => {
  let finalFile = file;
  if (file.type.startsWith('image/')) {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    finalFile = await imageCompression(file, options);
  }
  
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, finalFile);
  return await getDownloadURL(storageRef);
};
