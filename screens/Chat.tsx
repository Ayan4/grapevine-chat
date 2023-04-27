import React, { useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { ChatContext } from "../context/ChatContextProvider";

export default function Chat({}){
    const {data} = useContext(ChatContext);
    console.log(data);
    return <GiftedChat/>
}