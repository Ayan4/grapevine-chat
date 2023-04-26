import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    Login: undefined;
    Signup: { isSignup: boolean } | undefined;
    Home: undefined;
    Chat: undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type ChatScreenProps = StackScreenProps<RootStackParamList, 'Chat'>;