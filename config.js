import  firebase from 'firebase'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyA2dA1tslFPgxz3Pw9nez9TQQo7boeCA3c",
  authDomain: "willy-8bd53.firebaseapp.com",
  projectId: "willy-8bd53",
  storageBucket: "willy-8bd53.appspot.com",
  messagingSenderId: "181004043066",
  appId: "1:181004043066:web:d41c57c627268bc0fe0603",
  measurementId: "G-PJWH8B4ELE"
};
  // Initialize Firebase
  if(!firebase.apps.length)
  {
  firebase.initializeApp(firebaseConfig);
  }
  export default firebase.firestore();
