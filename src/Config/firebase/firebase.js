import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

  import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot, query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";


  import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage";
    



      import { initializeApp } from "firebase/app";
import swal from "sweetalert";
    
        const firebaseConfig = {
          apiKey: "AIzaSyA_pyrZR_Yt2Hw5cVJeWOTs43fiXEJkWFo",
          authDomain: "hacatone-f7a3c.firebaseapp.com",
          projectId: "hacatone-f7a3c",
          storageBucket: "hacatone-f7a3c.appspot.com",
          messagingSenderId: "852578302592",
          appId: "1:852578302592:web:c54647ae5aada04df9c465",
          measurementId: "G-5RE7F7WLJ3"
      
      };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



  const addUserToDB = async () => {
    const uid = auth.currentUser.uid;
    var userProfile = { email: "", name: "", photoURL: "" };
    userProfile.email = auth.currentUser.email;
    userProfile.name = auth.currentUser.displayName;
    userProfile.photoURL = auth.currentUser.photoURL;
  
    return setDoc(doc(db, "users", uid), userProfile);
  };

  
  function signinFirebase(loginEmail, loginPassword) {
    return signInWithEmailAndPassword(auth, loginEmail, loginPassword)

}


function keeploggined() {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          console.log("User is loggined");
      } else {
          console.log("User is signed out");
      }
  });
}
keeploggined()
  export { addDoc, addUserToDB, auth, collection, createUserWithEmailAndPassword, db, doc, getAuth, getDocs, getDownloadURL, keeploggined, onAuthStateChanged, onSnapshot, query, ref, serverTimestamp, setDoc, signInWithPopup, signinFirebase, storage, swal, updateDoc, uploadBytes, where };
