import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDQW5gLzAOJixv1UnLf8pfh0VRVt5yDt2U",
  authDomain: "nodemcu-daa94.firebaseapp.com",
  databaseURL: "https://nodemcu-daa94-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nodemcu-daa94",
  storageBucket: "nodemcu-daa94.firebasestorage.app",
  messagingSenderId: "53570654648",
  appId: "1:53570654648:web:6cf1041ee23003a3afff4d",
  measurementId: "G-3X2Y5FPGR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
