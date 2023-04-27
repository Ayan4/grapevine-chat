export type User = {
    uid: string,
    username: string
}

export type userChats = {
    date: {
      seconds: number;
      nanoseconds: number;
    };
    lastMessage: {
        text: string
    }
    userInfo: User;
};

export type userChatTree = [string, userChats];

export const ACTION_TYPE_CONSTANTS = {
    CHANGE_USER: "CHANGE_USER"
}

export const LOGIN_SIGNUP_CONSTANTS = {
    LOGIN: 'Login',
    SIGN_UP: 'Sign Up'
}