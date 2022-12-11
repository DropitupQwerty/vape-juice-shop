import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCaoTkfo0U34NtUm1cCAO4KpRTDCQ87McU',
  authDomain: 'realstate-online.firebaseapp.com',
  projectId: 'realstate-online',
  storageBucket: 'realstate-online.appspot.com',
  messagingSenderId: '884170692779',
  appId: '1:884170692779:web:8b6267ddcc37e6f80b7fee',
  measurementId: 'G-04JMTDSLYF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);
