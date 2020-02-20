import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDwE6QFJHVk9hYaPmP5cL8sY07xgmvQKX4",
    authDomain: "click-90fe4.firebaseapp.com",
    databaseURL: "https://click-90fe4.firebaseio.com",
    projectId: "click-90fe4",
    storageBucket: "click-90fe4.appspot.com",
    messagingSenderId: "758195935837",
    appId: "1:758195935837:web:b37e6d0af02172c8fe0bb4",
    measurementId: "G-PZCDXSKN5C"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();
export default firebase;