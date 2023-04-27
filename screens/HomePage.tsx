import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { BG_BLACK, PRIMARY, WHITE_LIGHT } from "../colors";
import { database } from "../config/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import { searchChatUser } from "../helper/Util";
import { HomeScreenProps } from "../types/NavigationTypes";
import { userChatTree, userChats } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";
import UserChatCardWidget from "../widgets/UserChatCardWidget";
import { MaterialIcons } from '@expo/vector-icons';

export default function HomePage({navigation}: HomeScreenProps){
    const [usernameQuery, setUsernameQuery] = useState<string>('');
    const [chats, setChats] = useState<userChatTree[] | undefined>([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const getChat = () => {
            const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
                doc.exists() && setChats(Object.entries(doc.data() as userChats[]))
            });
            return () => unsub();
        };
        currentUser.uid && getChat();
    }, [currentUser.uid]);

    // all user list will be filtered upon search
    const filteredUsers = chats && searchChatUser(chats, usernameQuery);
    return (
        <SafeAreaView style={styles.container}>
            <SearchWidget setUsernameQuery={setUsernameQuery} />
            <Text style={styles.heading}>Chats</Text>
            <FlatList data={filteredUsers} renderItem={({item}) => <UserChatCardWidget navigation={navigation} username={item[1].userInfo.username} uid={item[1].userInfo.uid} lastText={item[1].lastMessage?.text} />} keyExtractor={item => item[0]} />
            <TouchableOpacity onPress={() => navigation.navigate('FindFriends')} style={styles.floatingButton}>
                <MaterialIcons name="chat" size={35} color={WHITE_LIGHT} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_BLACK,
        height: '100%',
        position: 'relative'
    },
    heading: {
        fontSize: 22,
        color: WHITE_LIGHT,
        fontWeight: 'bold',
        margin: 10
    },
    floatingButton: {
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        backgroundColor: PRIMARY,
        padding: 18,
        borderRadius: 40
    }
})