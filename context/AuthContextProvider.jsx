import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}