import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    collection,onSnapshot,query,where,getDocs,serverTimestamp
  } from "firebase/firestore";


  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
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
  export {
    getAuth,
    signInWithPopup,
    swal,
    createUserWithEmailAndPassword,
    addUserToDB,auth,
    signinFirebase,doc,setDoc,collection,getDocs,db,
    storage,ref,uploadBytes,getDownloadURL,
    onAuthStateChanged,
    keeploggined,where,query,onSnapshot,addDoc,
    updateDoc,
    serverTimestamp
    
  }  