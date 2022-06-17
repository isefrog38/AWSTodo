import {Dispatch} from 'redux';
import {setAppErrorMessageAC, setAppStatusAC, setIsFetchingAC} from "../reduxStore/appReducer";

export const handleServerAppError = (message: string, dispatch: Dispatch) => {
    if (message) {
        dispatch(setAppErrorMessageAC({error: message}));
    } else {
        dispatch(setAppErrorMessageAC({error: 'Some error occurred'}));
    }
    dispatch(setAppStatusAC({status: 'failed'}));
    dispatch(setIsFetchingAC({isFetching: false}));
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(setAppErrorMessageAC({error: error}));
    dispatch(setAppStatusAC({status: 'failed'}));
    dispatch(setIsFetchingAC({isFetching: false}));
}

export const fileToBase64 = (file: File | null, cb: any) => {
    const reader = new FileReader()
    if (file) reader.readAsDataURL(file)
    reader.onload = function () {
        cb(null, reader.result)
    }
    reader.onerror = function (error) {
        cb(error, null)
    }
};


export const returnFileSize = (n: number) => {
    if (n < 1024) {
        return n + 'bytes';
    } else if (n > 1024 && n < 1048576) {
        return (n / 1024).toFixed(2) + 'KB';
    } else if (n > 1048576) {
        return (n / 1048576).toFixed(2) + 'MB';
    }
};