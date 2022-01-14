import { LocalDB } from "../db";

const db = new LocalDB();

export const setUsersInLocalDB = (email: string, password: string, token: string) => {
    const user = {
        email,
        password,
        token
    }
    db.setUsers(user);
}

export const checkLogin = (email: string, password: string) => {
    return db.checkUserAvailable({email, password});
}

export const getUsersInLocalDB = () => {
    return db.getUsers();
}