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