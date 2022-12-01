import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAYbzhQskUl-x8RJ0_s3wn-ujscO9jouW4',
  authDomain: 'vape-juice-shop.firebaseapp.com',
  projectId: 'vape-juice-shop',
  storageBucket: 'vape-juice-shop.appspot.com',
  messagingSenderId: '1097666772434',
  appId: '1:1097666772434:web:86913e1e2754f474f65c0b',
  measurementId: 'G-7VC4N4P0CX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
