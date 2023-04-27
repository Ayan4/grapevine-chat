import { useState } from "react";
import { StyleSheet} from "react-native";
import { TextInput } from "react-native";
import { BG_BLACK_LIGHT } from "../colors";
import { searchUserByUsernameApi } from "../network/FirestoreApiCall";
import { User } from "../types/UserTypes";

export default function SearchWidget(){
    const [username, setUsername] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    async function handleUserSearch(){
        const returnVal = await searchUserByUsernameApi(username);
        returnVal && setUser(returnVal);
    }

    return <TextInput returnKeyType="search" onChangeText={setUsername} onSubmitEditing={handleUserSearch} placeholder="Search for a Friend" style={styles.searchInput}/>
}

const styles = StyleSheet.create({
    searchInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: BG_BLACK_LIGHT,
        color: 'black',
        paddingHorizontal: 10
    }
})