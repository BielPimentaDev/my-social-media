
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkAy_A89b-1Ud4U1mKiFzDmzpCRPJnUIM",
  authDomain: "my-social-media-20e42.firebaseapp.com",
  projectId: "my-social-media-20e42",
  storageBucket: "my-social-media-20e42.appspot.com",
  messagingSenderId: "1071291024896",
  appId: "1:1071291024896:web:50fe733c2a10d4f52b3ae5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)