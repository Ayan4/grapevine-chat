import { userChatTree } from "../types/UserTypes";

export function searchChatUser(users: userChatTree[], query: string) {
    return users.filter(user => user[1].userInfo.username.toLowerCase().includes(query.toLowerCase()));
}