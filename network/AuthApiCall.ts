import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/firebase";
import { setUserNameWithIdApi } from "./FirestoreApiCall";

export const signUpApi = (email: string, password: string, username: string): void => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCreds) => {
        await setUserNameWithIdApi(userCreds.user.uid, username);
        await updateProfile(userCreds.user, {displayName: username})
    })
    .catch((err) => Alert.alert("Sign Up Error", 'Something Went Wrong'));
}

export const loginApi = (email: string, password: string): void => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCreds) => userCreds)
    .catch((err) => Alert.alert("Login Error", 'Something Went Wrong'));
}