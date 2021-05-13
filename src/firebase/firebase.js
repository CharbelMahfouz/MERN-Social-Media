import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQaYm8_fIq6hHm1zCYjZVg5IHGVFc3YJg",
  authDomain: "mern-social-media-4eeab.firebaseapp.com",
  projectId: "mern-social-media-4eeab",
  storageBucket: "mern-social-media-4eeab.appspot.com",
  messagingSenderId: "60915514300",
  appId: "1:60915514300:web:5d127de0101c2350cd89b9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
