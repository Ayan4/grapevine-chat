import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './screens/Chat';
import Auth from './screens/Auth';
import { RootStackParamList } from './types/NavigationTypes';
import HeaderWidget from './widgets/HeaderWidget';
import HomePage from './screens/HomePage';
import { auth } from './config/firebase';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import {useAuthState} from 'react-firebase-hooks/auth';

const Stack = createStackNavigator<RootStackParamList>();

function ChatStack(){
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen name='Home' component={HomePage} options={{header: () => <HeaderWidget/>}} />
      <Stack.Screen name='Chat' component={Chat} options={{header: () => <HeaderWidget/>}} />
    </Stack.Navigator>
  )
}

function AuthStack(){
  return(
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name='Login' component={Auth} options={{header: () => <HeaderWidget/>}} />
      <Stack.Screen name='Signup' component={Auth} options={{header: () => <HeaderWidget/>}} initialParams={{ isSignup: true }} />
    </Stack.Navigator>
  )
}

function RootNavigator(){
  const [user, loading] = useAuthState(auth);

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <RootNavigator/>
  );
}
