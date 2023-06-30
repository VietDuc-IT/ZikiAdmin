import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAyCx6OH5gDwh4ADOIRRVQS2J57VCWrSVU",
    authDomain: "foodapp-97729.firebaseapp.com",
    databaseURL: "https://foodapp-97729-default-rtdb.firebaseio.com",
    projectId: "foodapp-97729",
    storageBucket: "foodapp-97729.appspot.com",
    messagingSenderId: "501233836987",
    appId: "1:501233836987:web:c9520c1d5d2e3e26bfda9e",
    measurementId: "G-Q3SHNVRR6E"
  };
  // Initialize Firebase
  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();