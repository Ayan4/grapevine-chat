import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import { BG_BLACK, WHITE_LIGHT } from "../colors";
import { database } from "../config/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import { searchChatUser } from "../helper/Util";
import { getAllUsersApi } from "../network/FirestoreApiCall";
import { User, userChatTree, userChats } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";
import UserChatCardWidget from "../widgets/UserChatCardWidget";

export default function HomePage(){
    const [users, setUsers] = useState<User[] | undefined>();
    const [usernameQuery, setUsernameQuery] = useState<string>('');
    const [chats, setChats] = useState<userChatTree[] | undefined>([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const getChat = () => {
            const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
                setChats(Object.entries(doc.data() as userChats[]))
            });
            return () => unsub();
        };
        currentUser.uid && getChat();
    }, [currentUser.uid]);

    // all user list will be filtered upon search
    // const filteredUsers = users && searchUser(users, usernameQuery);
    const filteredUsers = chats && searchChatUser(chats, usernameQuery);

    useEffect(() => {
        (async () => {
            const allUsers = await getAllUsersApi(currentUser.uid)
            setUsers(allUsers);
        })();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <SearchWidget setUsernameQuery={setUsernameQuery} />
            <Text style={styles.heading}>Chats</Text>
            <FlatList data={filteredUsers} renderItem={({item}) => <UserChatCardWidget username={item[1].userInfo.username} uid={item[1].userInfo.uid} />} keyExtractor={item => item[0]} />
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