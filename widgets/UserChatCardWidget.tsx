import { StyleSheet, View, Text, Pressable } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { BG_BLACK_LIGHT, PRIMARY, WHITE_LIGHT } from "../colors";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { createChatApi } from "../network/FirestoreApiCall";

interface UserChatCardWidgetProps {
    username: string;
    uid: string;
  }

export default function UserChatCardWidget({username, uid}: UserChatCardWidgetProps){
    const {currentUser} = useContext(AuthContext);

    async function handleSelect(){
        await createChatApi(currentUser, username, uid);
    }

    return(
        <Pressable onPress={handleSelect} style={styles.container}>
            <View style={styles.iconWrapper}>
                <SimpleLineIcons style={styles.icon} name="user" size={24} color={PRIMARY} />
            </View>
            <Text style={styles.username}>{username}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: BG_BLACK_LIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: BG_BLACK_LIGHT,
        borderRadius: 10

    },
    username: {
        color: WHITE_LIGHT,
        fontSize: 20,
    },
    iconWrapper: {
        borderWidth: 1,
        borderColor: WHITE_LIGHT,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    icon: {
        padding: 12,
    }
})