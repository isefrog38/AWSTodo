import axios from "axios";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC, setAppSuccessMessageAC} from "../reduxStore/appReducer";
import {deleteUserDataAC, setAuthUserDataAC} from "../reduxStore/authReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {tokenInStorage} from "../components/authComponents/Common";


export const AuthMeTC = (getSession: () => Promise<any>): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        let key = localStorage.getItem(`${tokenInStorage}`);
        if (key) {
            let {idToken} = await getSession().then(el => el);
            dispatch(setAuthUserDataAC({email: idToken.payload.email, isActivated: idToken.payload.email_verified}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
            dispatch(setAppStatusAC({status: 'failed'}));
        }
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}))
    }
};

export const LogOutTC = (logout: () => void): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        logout();
            dispatch(deleteUserDataAC({email: null, isActivated: null}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setAppSuccessMessageAC({success: "LogOut succeeded"}));

    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}));

        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
