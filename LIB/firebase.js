import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAiWxruuiLRwxqvdjKh_BIo-MSD2-i8484",
    authDomain: "spense-ecom.firebaseapp.com",
    projectId: "spense-ecom",
    storageBucket: "spense-ecom.appspot.com",
    messagingSenderId: "898567239925",
    appId: "1:898567239925:web:d077b08391b1cd9dae6dbc"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = getStorage(firebaseApp);


export { auth, provider, storage};
export default db;