// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/analytics"
import "firebase/auth"
import "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7sBpiLf9tHIGU0kfjBjNwvNc_SGkERKU",
  authDomain: "objectif-mention-stpaul.firebaseapp.com",
  projectId: "objectif-mention-stpaul",
  storageBucket: "objectif-mention-stpaul.appspot.com",
  messagingSenderId: "71537034897",
  appId: "1:71537034897:web:839b20ad1db3cd29662130",
  measurementId: "G-5KF1FJ1HKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });


  export default firebase;