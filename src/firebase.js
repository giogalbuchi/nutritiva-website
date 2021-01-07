import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/functions"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBYGEo_UL_JB46hi_BlTxHw4eiFapPtiAY",
  authDomain: "nutritiva-website.firebaseapp.com",
  projectId: "nutritiva-website",
  storageBucket: "nutritiva-website.appspot.com",
  messagingSenderId: "459307658741",
  appId: "1:459307658741:web:f6d9117441e4419b2684bc"
})

export const auth = app.auth()
export const db = app.firestore()
export const st = app.storage().ref()
export const functions = app.functions()
export const provider =  new firebase.auth.GoogleAuthProvider();
export default app
  



