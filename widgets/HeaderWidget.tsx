import { StatusBar, StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { BG_BLACK, BG_BLACK_LIGHT } from "../colors";

export default function HeaderWidget(){
    return(
        <View style={styles.header}>
            <StatusBar backgroundColor={BG_BLACK}/>
            <Image style={styles.image} source={require('../assets/nav_logo.png')} />
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: BG_BLACK,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BG_BLACK_LIGHT
    },
    image: {
        width: '25%'
    }
})