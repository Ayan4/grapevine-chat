import { useState } from "react";
import { StyleSheet, View} from "react-native";
import { TextInput } from "react-native";
import { BG_BLACK_LIGHT, WHITE_LIGHT, WHITE_PRIMARY } from "../colors";
import { searchUserByUsernameApi } from "../network/FirestoreApiCall";
import { User } from "../types/UserTypes";
import { FontAwesome } from '@expo/vector-icons';

export default function SearchWidget(){
    const [username, setUsername] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    async function handleUserSearch(){
        const returnVal = await searchUserByUsernameApi(username);
        returnVal && setUser(returnVal);
    }

    return(
        <View style={styles.container}>
            <FontAwesome style={styles.icon} name="search" size={24} color={WHITE_LIGHT} />
            <TextInput returnKeyType="search" onChangeText={setUsername} onSubmitEditing={handleUserSearch} placeholder="Search for a Friend" placeholderTextColor={WHITE_LIGHT} style={styles.searchInput}/>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'relative'
    },
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: BG_BLACK_LIGHT,
        color: WHITE_LIGHT,
        paddingLeft: 42,
        paddingRight: 10,
        backgroundColor: BG_BLACK_LIGHT,
        fontSize: 18,
        margin: 10,
        borderRadius: 10,
        width: '100%',
    },
    icon: {
        position: 'absolute',
        top: 22,
        left: 20,
        zIndex: 1
    }
})