import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './screens/Chat';
import Auth from './screens/Auth';
import { RootStackParamList } from './typings/NavigationTypes';
import HeaderWidget from './widgets/HeaderWidget';

const Stack = createStackNavigator<RootStackParamList>();

function ChatStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Auth} options={{header: () => <HeaderWidget/>}} />
      <Stack.Screen name='Signup' component={Auth} options={{header: () => <HeaderWidget/>}} initialParams={{ isSignup: true }} />
    </Stack.Navigator>
  )
}

function RootNavigator(){
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <RootNavigator/>
  );
}
