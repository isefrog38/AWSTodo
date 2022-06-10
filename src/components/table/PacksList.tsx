import React, {useEffect} from 'react';
import {AllTasks} from "./AllPacks";
import {GeneralProfileWrapper} from '../stylesComponents/generalWapper';
import {Header} from "../common/header/Header";
import {NotAuthRedirect} from "../../utilsFunction/redirectFunction";
import {getTodolistsTC} from "../../thunk/todolistThunk";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {AppInitialStateType} from "../../types/reducersType";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utilsFunction/enumPath";

export const TodolistList = NotAuthRedirect(() => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const isActivated = useAppSelector<boolean | null>(state => state.AuthorizationReducer.user.isActivated);
    const dispatch = useTypedDispatch();


    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [stateApp.params]);



    if (!isActivated) return <Navigate to={PATH.checkEmail}/>
    return (
        <GeneralProfileWrapper>
            <Header/>
            <AllTasks/>
        </GeneralProfileWrapper>
    )
});