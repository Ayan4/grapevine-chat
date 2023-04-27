export type User = {
    uid: string,
    username: string
}

export type userChats = {
    date: {
      seconds: number;
      nanoseconds: number;
    };
    userInfo: User;
};

export type userChatTree = [string, userChats];

export const ACTION_TYPE_CONSTANTS = {
    CHANGE_USER: "CHANGE_USER"
}