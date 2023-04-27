import { signOut } from "firebase/auth";
import { Button, StatusBar, StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { BG_BLACK, BG_BLACK_LIGHT, PRIMARY } from "../colors";
import { auth } from "../config/firebase";

export default function HeaderWidget(props: any){
    const routeName = props?.route?.name;
    return(
        <View style={[styles.header, routeName && styles.headerHome]}>
            <StatusBar backgroundColor={BG_BLACK}/>
            <Image style={styles.image} source={require('../assets/nav_logo.png')} />
            {routeName && <Button title='Logout' onPress={() => signOut(auth)} color={PRIMARY} />} 
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
        flexDirection: 'row'
    },
    image: {
        width: '25%'
    }
})