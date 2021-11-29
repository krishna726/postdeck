export interface DefaultState {
    [key: string | number | symbol]: any
}

export type Action = {
    type: string;
    payload: any
}

export const actions = {
    ADD_FB_TOKEN: 'ADD_FB_TOKEN',
    USER_LOGIN: 'USER_LOGIN'
}