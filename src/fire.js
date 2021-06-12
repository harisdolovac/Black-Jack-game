import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyACeYxU7Gc2IL7p4AbERvP_XFn2WSRgRV0",
  authDomain: "blackjack-a3b20.firebaseapp.com",
  projectId: "blackjack-a3b20",
  storageBucket: "blackjack-a3b20.appspot.com",
  messagingSenderId: "26054195177",
  appId: "1:26054195177:web:a58f83c65d7ca1a9c5fd78",
};
const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default fire;
