import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: 'sportler-redirects.firebaseapp.com',
  projectId: 'sportler-redirects',
  storageBucket: 'sportler-redirects.appspot.com',
  messagingSenderId: '691645968262',
  appId: '1:691645968262:web:ffd071bae9ecd7317a0607'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
