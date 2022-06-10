import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialStateAuthorizationType, ResponseDataLoginOrAuthMe, ResponseRegisterType} from "../types/authType";

let initialState: initialStateAuthorizationType = {
    user: {
        id: null,
        email: null,
        isActivated: null,
    },
    refreshToken: null,
    isAuth: false
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        setAuthUserDataAC(state, action: PayloadAction<{ data:ResponseRegisterType }>) {
            state.user = {...action.payload.data.user};
            state.refreshToken = action.payload.data.refreshToken;
            state.isAuth = true;
        },
        deleteUserDataAC(state, action: PayloadAction<{ user: ResponseDataLoginOrAuthMe }>) {
            state.user = {...action.payload.user};
            state.refreshToken = null;
            state.isAuth = false;
        },
        setCheckEmailAC(state, action: PayloadAction<{ email: string }>) {
            state.user.email = action.payload.email;
        },
    },
});

export const AuthorizationReducer = AuthSlice.reducer;

export const {setAuthUserDataAC, deleteUserDataAC, setCheckEmailAC} = AuthSlice.actions;