import { doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { database } from "../config/firebase";
import { User, userChats } from "../types/UserTypes";

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

export const createChatApi = async (currentUser: any, username: string, uid: string): Promise<void> => {
    const combinedId = currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;
        try{
            const res = await getDoc(doc(database, 'chats', combinedId));
            if(!res.exists()){
                // create a chat in new common chat collection if empty.
                await setDoc(doc(database, 'chats', combinedId), {messages: []})
                // update userChats collection of authenticated user.
                await updateDoc(doc(database, 'userChats', currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid,
                        username
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                // update userChats collection for the other user.
                await updateDoc(doc(database, 'userChats', uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        username: currentUser.displayName
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        }catch(err){
            console.log('Chat creation error', err)
        }
};