import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfI3J14AXDk5ghFNis3JTrMvNE0a6K8Bc",
  authDomain: "instagram-clone-bb4cf.firebaseapp.com",
  projectId: "instagram-clone-bb4cf",
  storageBucket: "instagram-clone-bb4cf.appspot.com",
  messagingSenderId: "973012556351",
  appId: "1:973012556351:web:47b7575e16e8ab94faf68a",
  measurementId: "G-SRWCCPL82C"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }