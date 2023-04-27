import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './screens/Chat';
import Auth from './screens/Auth';
import { RootStackParamList } from './types/NavigationTypes';
import HeaderWidget from './widgets/HeaderWidget';
import HomePage from './screens/HomePage';
import { AuthContext, AuthContextProvider } from './context/AuthContextProvider';
import { ChatContextProvider } from './context/ChatContextProvider';
import ChatHeaderWidget from './widgets/ChatHeaderWidget';
import FindFriends from './screens/FindFriends';

const Stack = createStackNavigator<RootStackParamList>();

function ChatStack(){
  return (
    <Stack.Navigator initialRouteName={'HomePage'}>
      <Stack.Screen name='HomePage' component={HomePage} options={{header: (props) => <HeaderWidget {...props}/>}} />
      <Stack.Screen name='FindFriends' component={FindFriends} options={{header: (props) => <HeaderWidget {...props}/>}} />
      <Stack.Screen name='Chat' component={Chat} options={{header: () => <ChatHeaderWidget/>}} />
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
  const {currentUser} = useContext(AuthContext)

  return (
    <NavigationContainer>
      {currentUser ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <RootNavigator/>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}
