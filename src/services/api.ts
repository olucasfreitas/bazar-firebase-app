import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB6tx2uKQH86lgXdUem0PmaYQOYXjWNuZA",
  authDomain: "bazar-cd12e.firebaseapp.com",
  projectId: "bazar-cd12e",
  storageBucket: "bazar-cd12e.appspot.com",
  messagingSenderId: "527020146391",
  appId: "1:527020146391:web:b5e00c786c36d58c4f3a92",
};

const app = initializeApp(config);
export const auth = getAuth(app);
