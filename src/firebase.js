import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyAKOJSncfmshcLycEjzh5el5IeX1v0PcW0",
  authDomain: "whatsapp-88827.firebaseapp.com",
  databaseURL: "https://whatsapp-88827.firebaseio.com",
  projectId: "whatsapp-88827",
  storageBucket: "whatsapp-88827.appspot.com",
  messagingSenderId: "373976942320",
  appId: "1:373976942320:web:260e32b55455d841426435",
  measurementId: "G-11Q471WVS0"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
