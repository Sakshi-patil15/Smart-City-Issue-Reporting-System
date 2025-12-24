import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4uYAGqR4_nYqkVI7KZ4A0mnFBw_g4Jr4",
  authDomain: "smartcityissuesystem.firebaseapp.com",
  projectId: "smartcityissuesystem",
  storageBucket: "smartcityissuesystem.appspot.com",
  messagingSenderId: "1004898693200",
  appId: "1:1004898693200:web:fe7f1950ec75daa367a155"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
