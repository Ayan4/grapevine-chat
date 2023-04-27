import { useContext } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { BG_BLACK, BG_BLACK_LIGHT, PRIMARY, WHITE_LIGHT, WHITE_PRIMARY } from "../colors";
import { ChatContext } from "../context/ChatContextProvider";
import { SimpleLineIcons, AntDesign} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../helper/Util";


export default function ChatHeaderWidget(){
    const {data: {user}} = useContext(ChatContext);
    const navigation = useNavigation();

    return(
        <View style={[styles.header]}>
            <StatusBar backgroundColor={BG_BLACK}/>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={26} color={WHITE_LIGHT} />
            </TouchableOpacity>
            <View style={styles.iconWrapper}>
                <SimpleLineIcons style={styles.icon} name="user" size={30} color={PRIMARY} />
            </View>
            <Text style={styles.usernameText}>{capitalizeFirstLetter(user.username)}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: BG_BLACK,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BG_BLACK_LIGHT,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    iconWrapper: {
        borderWidth: 1,
        borderColor: WHITE_LIGHT,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    icon: {
        padding: 10
    },
    usernameText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: WHITE_LIGHT
    }
})