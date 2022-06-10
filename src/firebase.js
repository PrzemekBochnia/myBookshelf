import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVrNoDX7HpxMo7fRnGYpCN-97R4txZq78",
  authDomain: "mybookshelfapp-97cc5.firebaseapp.com",
  projectId: "mybookshelfapp-97cc5",
  storageBucket: "mybookshelfapp-97cc5.appspot.com",
  messagingSenderId: "400368238963",
  appId: "1:400368238963:web:4d01791ca08c8c48b10506"
};

const app = initializeApp(firebaseConfig);
export default app
export const auth = getAuth(app)
export const storage = getStorage(app);