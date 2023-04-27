import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { BG_BLACK, WHITE_LIGHT } from "../colors";
import { AuthContext } from "../context/AuthContextProvider";
import { searchUser } from "../helper/Util";
import { getAllUsersApi } from "../network/FirestoreApiCall";
import { FindFriendsScreenProps } from "../types/NavigationTypes";
import { User } from "../types/UserTypes";
import SearchWidget from "../widgets/SearchWidget";
import UserChatCardWidget from "../widgets/UserChatCardWidget";

export default function FindFriends({navigation}: FindFriendsScreenProps){
    const [users, setUsers] = useState<User[] | undefined>();
    const [usernameQuery, setUsernameQuery] = useState<string>('');
    const {currentUser} = useContext(AuthContext);

    // all user list will be filtered upon search
    const filteredUsers = users && searchUser(users, usernameQuery);

    useEffect(() => {
        (async () => {
            const allUsers = await getAllUsersApi(currentUser.uid)
            setUsers(allUsers);
        })();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <SearchWidget setUsernameQuery={setUsernameQuery} />
            <Text style={styles.heading}>Find Friends</Text>
            <FlatList data={filteredUsers} renderItem={({item}) => <UserChatCardWidget navigation={navigation} username={item.username} uid={item.uid} />} keyExtractor={item => item.uid} />
        </SafeAreaView>
    )
};

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