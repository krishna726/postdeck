export interface DefaultState {
    [key: string | number | symbol]: any
}

export interface User {
    email: string,
    password: string,
    token?: string
}

export type Action = {
    type: string;
    payload: any
}

export const actions = {
    ADD_FB_TOKEN: 'ADD_FB_TOKEN',
    USER_LOGIN: 'USER_LOGIN',
    REGISTER: 'REGISTER'
}