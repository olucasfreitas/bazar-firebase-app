import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyBR9oDc8Ifa95tpCxMIjRh1U44X1Hpf1w0",
  authDomain: "bazar-87b82.firebaseapp.com",
  projectId: "bazar-87b82",
  storageBucket: "bazar-87b82.appspot.com",
  messagingSenderId: "100710569332",
  appId: "1:100710569332:web:cde39bf15fe9aa8ba60821"
};

const app = initializeApp(config);
export const auth = getAuth(app);