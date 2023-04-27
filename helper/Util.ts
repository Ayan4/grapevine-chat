import { User } from "../types/UserTypes";


export function searchUser(users: User[], query: string) {
    return users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
}