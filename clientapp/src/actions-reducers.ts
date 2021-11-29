import { Action, actions, DefaultState } from "./components/interface-enums";

export const defaultState: DefaultState = {
    userDetails: {},
    fbToken: '',
    fbId: '',
    isLoggedIn: false
};

export const fb_Reducer = (
    state: DefaultState = defaultState,
    action: Action
) => {
    switch (action.type) {
        case actions.ADD_FB_TOKEN: {
            return { ...state, fbToken: action.payload };
        }
        default: return state;
    }
};

export const login_reducer = (
    state: DefaultState = defaultState,
    action: Action
) => {
    switch (action.type) {
        case actions.USER_LOGIN: {
            return { ...state, isLoggedIn: action.payload };
        }
        default: return state;
    }
};