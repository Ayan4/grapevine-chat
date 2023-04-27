import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { BG_BLACK_LIGHT, GRAY, PRIMARY, WHITE_LIGHT } from "../colors";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { createChatApi } from "../network/FirestoreApiCall";
import { ChatContext } from "../context/ChatContextProvider";
import { ACTION_TYPE_CONSTANTS } from "../types/UserTypes";
import { capitalizeFirstLetter } from "../helper/Util";

interface UserChatCardWidgetProps {
    username: string;
    uid: string;
    navigation: any;
    lastText?: string
  }

export default function UserChatCardWidget({username, uid, navigation, lastText}: UserChatCardWidgetProps){
    const {currentUser} = useContext(AuthContext);
    const {dispatchAction} = useContext(ChatContext);

    async function handleSelect(){
        await createChatApi(currentUser, username, uid);
        dispatchAction({type: ACTION_TYPE_CONSTANTS.CHANGE_USER, payload: {uid, username}});
        navigation.navigate('Chat')
    }

    return(
        <TouchableOpacity onPress={handleSelect} style={styles.container}>
            <View style={styles.iconWrapper}>
                <FontAwesome5 style={styles.icon} name="user-alt" size={24} color={PRIMARY} />
            </View>
            <View style={styles.nameAndTextWrapper}>
                <Text style={styles.username}>{capitalizeFirstLetter(username)}</Text>
                {lastText && <Text style={styles.message}>{lastText}</Text>}
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: BG_BLACK_LIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        backgroundColor: BG_BLACK_LIGHT,
        borderRadius: 10

    },
    username: {
        color: WHITE_LIGHT,
        fontSize: 20,
    },
    iconWrapper: {
        borderWidth: 2,
        borderColor: PRIMARY,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    icon: {
        padding: 12,
    },
    message: {
        color: GRAY
    },
    nameAndTextWrapper: {
        justifyContent: 'center'
    }
})