import firebase from "firebase";

export const firebaseConfig = {
    apiKey: "AIzaSyAqjHK6ILQ4G7hGVajd6BogdQpeYY-3dnM",
    authDomain: "hr-sample-b3c2d.firebaseapp.com",
    databaseURL: "https://hr-sample-b3c2d-default-rtdb.firebaseio.com",
    projectId: "hr-sample-b3c2d",
    storageBucket: "hr-sample-b3c2d.appspot.com",
    messagingSenderId: "130188187366",
    appId: "1:130188187366:web:c66a558ced1a3a65e3cd27"
};

export const fireBaseClientApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
