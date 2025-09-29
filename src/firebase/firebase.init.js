// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUG46COqB5QBbw8x1e0MFUmKk99Vqv7es",
  authDomain: "bistro-boss-resturent-1c3d1.firebaseapp.com",
  projectId: "bistro-boss-resturent-1c3d1",
  storageBucket: "bistro-boss-resturent-1c3d1.firebasestorage.app",
  messagingSenderId: "881734179276",
  appId: "1:881734179276:web:71db394565cb58763f6569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);