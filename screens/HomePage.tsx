import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { BG_BLACK, WHITE_LIGHT, WHITE_PRIMARY } from "../colors";
import { AuthContext } from "../context/AuthContextProvider";
import { getAllUsersApi } from "../network/FirestoreApiCall";
import { User } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";
import UserChatCardWidget from "../widgets/UserChatCardWidget";

export default function HomePage(){
    const {currentUser} = useContext(AuthContext);
    const [users, setUsers] = useState<User[] | undefined>();
    const [usernameQuery, setUsernameQuery] = useState<string>('');

    function searchUsers(users: User[], query: string) {
        return users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
      }

    const filteredUsers = users && searchUsers(users, usernameQuery);

    useEffect(() => {
        (async () => {
            const allUsers = await getAllUsersApi(currentUser.uid)
            setUsers(allUsers);
        })();
    }, [])

    console.log(users);

    return (
        <SafeAreaView style={styles.container}>
            <SearchWidget setUsernameQuery={setUsernameQuery} />
            <Text style={styles.heading}>Chats</Text>
            {filteredUsers?.map(user => {
                return <UserChatCardWidget key={user.uid} username={user.username} />
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_BLACK,
        height: '100%'
    },
    heading: {
        fontSize: 22,
        color: WHITE_LIGHT,
        fontWeight: 'bold',
        margin: 10
    }
})