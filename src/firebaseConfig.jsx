
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import firebaseConfig from './env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)