import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBx-AQdGi7ggAWP5f1dN8bsefPrYzlK6Ag",
  authDomain: "webmart-9c452.firebaseapp.com",
  projectId: "webmart-9c452",
  storageBucket: "webmart-9c452.appspot.com",
  messagingSenderId: "959980252317",
  appId: "1:959980252317:web:05c508b3bf5088f4c67874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//export const auth = getAuth(app)
export default app