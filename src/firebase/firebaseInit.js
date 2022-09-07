import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDzJC2T4caoDCynCAPUzPxBgvKo4PXYYk8",
  authDomain: "crud-vue-71dc7.firebaseapp.com",
  databaseURL: "https://crud-vue-71dc7-default-rtdb.firebaseio.com",
  projectId: "crud-vue-71dc7",
  storageBucket: "crud-vue-71dc7.appspot.com",
  messagingSenderId: "450611813153",
  appId: "1:450611813153:web:2d4a4593928104623c3c60"
};

const firebaseApp = initializeApp(firebaseConfig)


export default getFirestore(firebaseApp);