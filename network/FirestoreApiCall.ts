import { doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc, serverTimestamp, onSnapshot, arrayUnion } from "firebase/firestore";
import { IMessage } from "react-native-gifted-chat";
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

export const updateChatCollectionsApi = async (messages: IMessage[], userData: any, currentUser: any): Promise<void> => {
    const {_id, createdAt, text, user} = messages[0];
        await updateDoc(doc(database, 'chats', userData.chatId), {
            messages: arrayUnion({
                _id,
                text,
                createdAt: new Date(createdAt),
                senderId: currentUser.uid,
                user
            })
        });

        // update last message and time for both, sender and receiver
        await updateDoc(doc(database, 'userChats', currentUser.uid), {
            [userData.chatId + ".lastMessage"]: {
                text
            },
            [userData.chatId + ".date"]: serverTimestamp(),
        })
        // update for receiver
        await updateDoc(doc(database, 'userChats', userData.user.uid), {
            [userData.chatId + ".lastMessage"]: {
                text
            },
            [userData.chatId + ".date"]: serverTimestamp()
        })
}