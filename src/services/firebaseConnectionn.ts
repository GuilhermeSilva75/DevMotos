import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getApps, getApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3bbrC3U7I4WulxtC2aOn41s33PeYI1Vo",
  authDomain: "webcarros-bd942.firebaseapp.com",
  projectId: "webcarros-bd942",
  storageBucket: "webcarros-bd942.appspot.com",
  messagingSenderId: "390302731750",
  appId: "1:390302731750:web:ba74ec6385b72bd4f6da27"
};


const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const Storage = getStorage(firebaseApp)


export { db, Storage, auth };