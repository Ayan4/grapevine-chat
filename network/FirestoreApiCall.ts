import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../config/firebase";
import { User } from "../types/UserTypes";

const setUserChatsApi = async (uid: string) => {
    await setDoc(doc(database, 'userChats', uid), {});
}

export const setUserNameWithIdApi = async (uid: string, username: string) => {
    await setDoc(doc(database, 'users', uid), {uid, username})
    await setUserChatsApi(uid);
};

export const getAllUsersApi = async (uid: string | undefined): Promise<User[] | undefined> => {
    const userCollection = collection(database, 'users');
    const q = query(userCollection, where('uid', "!=", uid));
    const querySnapShot = await getDocs(q);
    const docs = querySnapShot.docs;
    if(docs.length === 0){
        // users not found
        return undefined
    }
    const userArray = docs.map(userDoc => {
        return userDoc.data() as User;
    })
    return userArray as User[];
}