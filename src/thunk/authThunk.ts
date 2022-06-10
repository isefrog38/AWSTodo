import {Dispatch} from "redux";
import axios from "axios";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC, setAppSuccessMessageAC} from "../reduxStore/appReducer";
import {deleteUserDataAC, setAuthUserDataAC, setCheckEmailAC} from "../reduxStore/authReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {authAPI} from "../api/api";
import {PATH} from "../utilsFunction/enumPath";
import {NavigateFunction} from "react-router-dom";


export const AuthMeTC = (): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const {data} = await authAPI.authMe()
        if (data) {
            localStorage.setItem('token', data.accessToken);
            dispatch(setAuthUserDataAC({data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}))
    }
};

export const LoginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const {data} = await authAPI.authLogin(email, password, rememberMe);
        if (data.user) {
            localStorage.setItem('token', data.accessToken);
            dispatch(setAuthUserDataAC({data}));
            dispatch(setAppSuccessMessageAC({success: `Hi mister ${data.user.email}`}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};

export const LogOutTC = (): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.logOut()
        if (response) {

            localStorage.removeItem('token');

            let resetUser = {id: null, email: null, isActivated: null};
            dispatch(deleteUserDataAC({user: resetUser}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setAppSuccessMessageAC({success: "LogOut succeeded"}));
        }
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}));

        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};


export const RegisterTC = (email: string, password: string, navigate: NavigateFunction): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.register(email, password);
        if (response.data) {
            dispatch(setCheckEmailAC({email}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setAppSuccessMessageAC({success: " Congratulations ! You are created account"}));

            navigate(PATH.checkEmail);

            setTimeout(() => { navigate(PATH.login) },5000);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
