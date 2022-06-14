import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialStateAuthorizationType, ResponseDataLoginOrAuthMe} from "../types/authType";

let initialState: initialStateAuthorizationType = {
    email: null,
    isActivated: null,
    isAuth: false
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        setAuthUserDataAC(state, action: PayloadAction< ResponseDataLoginOrAuthMe >) {
            state.email = action.payload.email;
            state.isActivated = action.payload.isActivated;
            state.isAuth = true;
        },
        deleteUserDataAC(state, action: PayloadAction< ResponseDataLoginOrAuthMe >) {
            state.email = action.payload.email;
            state.isActivated = action.payload.isActivated;
            state.isAuth = false;
        },
        setCheckEmailAC(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email;
        },
    },
});

export const AuthorizationReducer = AuthSlice.reducer;

export const {setAuthUserDataAC, deleteUserDataAC, setCheckEmailAC} = AuthSlice.actions;