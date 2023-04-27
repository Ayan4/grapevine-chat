import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, IMessage, InputToolbar } from "react-native-gifted-chat";
import { database } from "../config/firebase";
import { ChatContext } from "../context/ChatContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import { BG_BLACK, BG_BLACK_LIGHT } from "../colors";

export default function Chat({}){
    const [messages, setMessages] = useState<IMessage[] | []>([]);
    const {data} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(database, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            if(doc.exists()){
                const result = doc.data().messages.map((item: any) => {
                    return {
                        ...item,
                        createdAt: new Date(item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000)
                    }
                });
                setMessages(result);
            }
        });

        return () => unSub();
    }, [data.chatId]);

    const onSend = useCallback(async (messages: IMessage[] = []) => {
        setMessages(prevMessage => GiftedChat.append(messages, prevMessage))

        const {_id, createdAt, text, user} = messages[0];
        await updateDoc(doc(database, 'chats', data.chatId), {
            messages: arrayUnion({
                _id,
                text,
                createdAt: new Date(createdAt),
                senderId: currentUser.uid,
                user
            })
        });

        await updateDoc(doc(database, 'userChats', currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(database, 'userChats', data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
      }, [])

    function renderInputToolbar (props: any) {
       return <InputToolbar {...props} textInputStyle={{color: 'white'}} containerStyle={{backgroundColor: BG_BLACK_LIGHT}} />
     }

    return <GiftedChat renderInputToolbar={renderInputToolbar} messages={messages} inverted={false} onSend={(messages) => onSend(messages)} user={{_id: currentUser.email, name: currentUser.displayName}} messagesContainerStyle={{backgroundColor: BG_BLACK}} />
};