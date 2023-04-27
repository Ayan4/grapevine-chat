import { signOut } from "firebase/auth";
import { useContext } from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
import { View, Image } from "react-native";
import { BG_BLACK, BG_BLACK_LIGHT, PRIMARY, WHITE_PRIMARY } from "../colors";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { capitalizeFirstLetter } from "../helper/Util";

export default function HeaderWidget(props: any){
    const {currentUser} = useContext(AuthContext);
    const routeName = props?.route?.name;

    return(
        <View style={[styles.header, routeName && styles.headerHome]}>
            <StatusBar backgroundColor={BG_BLACK}/>
            <Image style={styles.image} source={require('../assets/nav_logo.png')} />
            <View style={styles.headerHome}>
                {routeName && <View style={styles.iconWrapper}>
                    <FontAwesome style={styles.icon} name="user-o" size={17} color={PRIMARY} />
                </View>}
                {routeName && <Text style={styles.username}>{capitalizeFirstLetter(currentUser.displayName)}</Text>}
                {routeName && <MaterialIcons style={styles.icon} name="logout" onPress={() => signOut(auth)} size={30} color={PRIMARY} />} 
            </View>
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
        justifyContent: 'space-between'
    },
    headerHome: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        color: WHITE_PRIMARY,
        fontSize: 17,
        paddingHorizontal: 10,
    },
    image: {
        width: '25%'
    },
    iconWrapper: {
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    icon: {
        paddingVertical: 5,
        paddingHorizontal: 6
    }
})