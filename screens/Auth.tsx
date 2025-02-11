import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { BG_BLACK, BG_BLACK_LIGHT, PRIMARY, WHITE_PRIMARY } from '../colors';
import { loginApi, signUpApi } from '../network/AuthApiCall';
import { LoginScreenProps, SignupScreenProps } from '../types/NavigationTypes';
import { LOGIN_SIGNUP_CONSTANTS } from '../types/UserTypes';
const bgImage = require("../assets/backImage.png");

export default function Auth({route, navigation}: LoginScreenProps | SignupScreenProps){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const isSignupScreen: boolean | undefined = route.params?.isSignup;
    const headerText = isSignupScreen ? LOGIN_SIGNUP_CONSTANTS.SIGN_UP : LOGIN_SIGNUP_CONSTANTS.LOGIN;

    function handleSubmit(){
        if(email && password){
            if(isSignupScreen){
                signUpApi(email, password, username);
            }else{
                loginApi(email, password);
            }
        }
    }

    const userNameTextInput = isSignupScreen && (
        <TextInput
            style={styles.input}
            placeholder='Enter a username'
            placeholderTextColor="#606060"
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            value={username}
            onChangeText={(text) => setUsername(text)}
        />
    )

    return(
        <View style={styles.container}>
            <Image source={bgImage} style={styles.bgImage} />
            <View style={styles.contentSection}>
                <SafeAreaView>
                    <Text style={styles.title}>{headerText}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your email'
                        placeholderTextColor="#606060"
                        autoCapitalize='none'
                        keyboardType='default'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {userNameTextInput}
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your password'
                        placeholderTextColor="#606060"
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{headerText}</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpSection}>
                        <Text style={styles.signUpSectionText}>{isSignupScreen ? 'Already have an account?' : 'Don\'t have an account?'}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(isSignupScreen ? 'Login' : 'Signup')}>
                            <Text style={styles.signUpLink}>{isSignupScreen ? LOGIN_SIGNUP_CONSTANTS.LOGIN : LOGIN_SIGNUP_CONSTANTS.SIGN_UP}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: 340,
        position: 'absolute',
        top: 0
    },
    contentSection: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: BG_BLACK,
        borderTopLeftRadius: 60,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: PRIMARY,
        alignSelf: 'center',
        paddingVertical: 50
    },
    input: {
        height: 58,
        fontSize: 16,
        padding: 12,
        color: WHITE_PRIMARY,
        marginBottom: 20,
        backgroundColor: BG_BLACK_LIGHT,
        borderRadius: 10
    },
    button: {
        backgroundColor: PRIMARY,
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: BG_BLACK_LIGHT,
        fontSize: 18,
        fontWeight: "bold"
    },
    signUpSection: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center"
    },
    signUpSectionText: {
        color: WHITE_PRIMARY,
    },
    signUpLink: {
        color: PRIMARY,
        marginHorizontal: 5
    }
})