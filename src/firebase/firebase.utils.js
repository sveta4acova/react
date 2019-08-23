import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBSYY_F550Z3z3T6anMhi0TJJJKzwtG2AI",
  authDomain: "crown-db-14df9.firebaseapp.com",
  databaseURL: "https://crown-db-14df9.firebaseio.com",
  projectId: "crown-db-14df9",
  storageBucket: "",
  messagingSenderId: "132771278539",
  appId: "1:132771278539:web:f338237cda955124"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;