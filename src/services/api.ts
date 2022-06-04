import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {};

const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);
