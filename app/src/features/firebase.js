import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzXVi__LO4evciGMuJRUTKaKmm08dt9CM",
    authDomain: "phamgia-e.firebaseapp.com",
    projectId: "phamgia-e",
    storageBucket: "phamgia-e.appspot.com",
    messagingSenderId: "692155702695",
    appId: "1:692155702695:web:c4d7045619b9e59f81aa82",
    measurementId: "G-1G80VHYLFZ",
    databaseURL: "YOUR_Database_URL"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;

