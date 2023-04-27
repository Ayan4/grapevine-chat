import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Text } from "react-native";
import { BG_BLACK } from "../colors";
import { AuthContext } from "../context/AuthContextProvider";
import { getAllUsersApi } from "../network/FirestoreApiCall";
import { User } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";
import UserChatCardWidget from "../widgets/UserChatCardWidget";

export default function HomePage(){
    const {currentUser} = useContext(AuthContext);
    const [users, setUsers] = useState<User[] | undefined>();

    useEffect(() => {
        (async () => {
            const allUsers = await getAllUsersApi(currentUser.uid)
            setUsers(allUsers);
        })();
    }, [])

    console.log(users);

    return (
        <SafeAreaView style={styles.container}>
            <SearchWidget/>
            {users?.map(user => {
                return <UserChatCardWidget key={user.uid} username={user.username} />
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_BLACK,
        height: '100%'
    }
})