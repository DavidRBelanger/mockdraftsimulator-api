const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "footballdraftprospects.firebaseapp.com",
  projectId: "footballdraftprospects",
  storageBucket: "footballdraftprospects.firebasestorage.app",
  messagingSenderId: "477707131195",
  appId: "1:477707131195:web:7c30894780fe2cb0c63f1e"
};

const app = initializeApp(firebaseConfig);

module.exports = { app };