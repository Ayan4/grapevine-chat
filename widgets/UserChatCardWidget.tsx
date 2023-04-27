import { StyleSheet, View, Text } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { BG_BLACK_LIGHT, PRIMARY, WHITE_LIGHT } from "../colors";

interface UserChatCardWidgetProps {
    username: string;
  }

export default function UserChatCardWidget({username}: UserChatCardWidgetProps){
    return(
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <SimpleLineIcons style={styles.icon} name="user" size={24} color={PRIMARY} />
            </View>
            <Text style={styles.username}>{username}</Text>
        </View>
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
        // alignSelf: 'flex-start'
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