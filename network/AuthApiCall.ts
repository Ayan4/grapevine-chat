import { doc, setDoc } from "firebase/firestore";
import { database } from "../config/firebase";

export const setUserNameWithId = async (uid: string, username: string) => {
    await setDoc(doc(database, 'users', uid), {uid, username})
};