import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { ACTION_TYPE_CONSTANTS } from "../types/UserTypes";
import { AuthContext } from "./AuthContextProvider";

export const ChatContext = createContext();

export function ChatContextProvider({children}){
    const {currentUser} = useContext(AuthContext);
    const INITIAL_CHAT_STATE = {
        chatId: 'null',
        user: {}
    };

    const chatReducer = (state, action) => {
        switch(action.type){
            case ACTION_TYPE_CONSTANTS.CHANGE_USER:
                return{
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

    return(
        <ChatContext.Provider value={{data: state, dispatchAction: dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}