import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    Login: undefined;
    Signup: { isSignup: boolean } | undefined;
    HomePage: undefined;
    Chat: undefined;
    FindFriends: undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomePage'>;
export type FindFriendsScreenProps = StackScreenProps<RootStackParamList, 'FindFriends'>;
export type ChatScreenProps = StackScreenProps<RootStackParamList, 'Chat'>;