// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import constant from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: constant.manifest?.extra?.apiKey,
  authDomain: constant.manifest?.extra?.authDomain,
  projectId: constant.manifest?.extra?.projectId,
  storageBucket: constant.manifest?.extra?.storageBucket,
  messagingSenderId: constant.manifest?.extra?.messagingSenderId,
  appId: constant.manifest?.extra?.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore(app);