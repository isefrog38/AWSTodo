import React, {useEffect} from 'react';
import "./SnackBar.css";
import {useDispatch,} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TypedDispatch, useAppSelector} from "../../../reduxStore/store";
import {setAppErrorMessageAC, setAppSuccessMessageAC} from "../../../reduxStore/appReducer";
import {AppInitialStateType} from "../../../types/reducersType";


export const Snackbar = () => {

    const appState = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useDispatch<TypedDispatch>();

    useEffect(() => {
        toast.error(appState.error);
        dispatch(setAppErrorMessageAC({error: null}));
    },[appState.error]);

    useEffect(() => {
        toast.success(appState.success);
        dispatch(setAppSuccessMessageAC({success: null}));
    },[appState.success]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable={true}
            />
        </>
    );
};