import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "responses-collection"));
    const responseData = querySnapshot.docs.map((doc) => doc.data());
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
