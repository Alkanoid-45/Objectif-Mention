import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(  {
    apiKey: "AIzaSyAkedT0XedGHTUhxcJjcdToYsx4JZuWnRw",
    authDomain: "objectif-mention-17a48.firebaseapp.com",
    databaseURL: "https://objectif-mention-17a48-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "objectif-mention-17a48",
    storageBucket: "objectif-mention-17a48.appspot.com",
    messagingSenderId: "575509147435",
    appId: "1:575509147435:web:4d75f80a5cac090adadf6e",
    measurementId: "G-2NNPF733H1"
  });

const auth = getAuth(firebaseApp);