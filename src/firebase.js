import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCca4gyPdEl_dgsNdSuzlq3lWY1kaJhi-g",
  authDomain: "slack-clone-c9ae8.firebaseapp.com",
  projectId: "slack-clone-c9ae8",
  storageBucket: "slack-clone-c9ae8.appspot.com",
  messagingSenderId: "1067983535948",
  appId: "1:1067983535948:web:3e7f2411de02c8038859e9",
  measurementId: "G-Y1GHR5PQWF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
