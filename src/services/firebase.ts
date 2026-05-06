// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOyZb_wMd02E6PMC_wmCSn3PKHslX0qSs',
  authDomain: 'expense-tracker-f945d.firebaseapp.com',
  projectId: 'expense-tracker-f945d',
  storageBucket: 'expense-tracker-f945d.firebasestorage.app',
  messagingSenderId: '441966628674',
  appId: '1:441966628674:web:42c37408e8050108ef82db',
  measurementId: 'G-1H76PJ3L8G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
