import { User, userChatTree } from "../types/UserTypes";

export function searchChatUser(users: userChatTree[], query: string): userChatTree[] {
    return users.filter(user => user[1].userInfo?.username.toLowerCase().includes(query.toLowerCase()));
}

export function searchUser(users: User[], query: string): User[] {
    return users.filter(user => user?.username.toLowerCase().includes(query.toLowerCase()));
}

export function capitalizeFirstLetter(username: string | undefined): string | undefined{
    const str = username ? username.charAt(0).toUpperCase() + username.slice(1) : undefined;
    return str;
}