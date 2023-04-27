import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Text } from "react-native";
import { AuthContext } from "../context/AuthContextProvider";
import { getAllUsersApi } from "../network/FirestoreApiCall";
import { User } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";

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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    }
})