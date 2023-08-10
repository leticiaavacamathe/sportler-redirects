import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC6ONGugUbLmKZISH-u7y3Evdk08_kRrCo',
  authDomain: 'sportler-redirects.firebaseapp.com',
  projectId: 'sportler-redirects',
  storageBucket: 'sportler-redirects.appspot.com',
  messagingSenderId: '691645968262',
  appId: '1:691645968262:web:ffd071bae9ecd7317a0607'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
