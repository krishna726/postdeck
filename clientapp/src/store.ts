import { createStore } from "@reduxjs/toolkit";
import { fb_Reducer, login_reducer, register_reducer } from "./actions-reducers";
import { combineReducers } from "redux";

const rootReducers = combineReducers({fb_Reducer, login_reducer, register_reducer});
const store = createStore(rootReducers);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
