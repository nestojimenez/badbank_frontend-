// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_hN6JLmrEGrkRWxP_uKvx3Z7EGpIp57o",
  authDomain: "mit-course-d64f2.firebaseapp.com",
  databaseURL: "https://mit-course-d64f2-default-rtdb.firebaseio.com",
  projectId: "mit-course-d64f2",
  storageBucket: "mit-course-d64f2.appspot.com",
  messagingSenderId: "139397356658",
  appId: "1:139397356658:web:0b48039d74bdbdf99ef6eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
