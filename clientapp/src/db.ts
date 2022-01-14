import { User } from "./components/interface-enums";

export class LocalDB {
    users: User[] = [];
    setUsers(user: User) {
        this.users.push({
            email: user.email,
            password: user.password,
            token: user.token
        });
    }
    getUsers() {
        return this.users.length;
    }
    checkUserAvailable(user: User) {
        const filtered = this.users.find(item => item.email === user.email && item.password === user.password);
        if(filtered) {
            return true;
        }
        return false;
    }
}