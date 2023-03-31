import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyC55Krk3J9MZdtqXbx1CIvgQHMoFHFa48c",
    authDomain: "mymoney2xdo.firebaseapp.com",
    projectId: "mymoney2xdo",
    storageBucket: "mymoney2xdo.appspot.com",
    messagingSenderId: "261185668506",
    appId: "1:261185668506:web:e13746ea18ada9f5de6623"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }