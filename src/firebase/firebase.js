import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATEWwmxwOZjZHDGPnuTtd51ktVMh1Ox-k",
    authDomain: "shop-5100a.firebaseapp.com",
    databaseURL: "https://shop-5100a-default-rtdb.firebaseio.com",
    projectId: "shop-5100a",
    storageBucket: "shop-5100a.appspot.com",
    messagingSenderId: "174319357610",
    appId: "1:174319357610:web:31db2e9a86717d2a9e8ad3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const database = getDatabase(app);