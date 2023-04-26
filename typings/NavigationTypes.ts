import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    Login: undefined;
    Signup: { isSignup: boolean } | undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;