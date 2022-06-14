import React, {useEffect} from 'react';
import {AllTasks} from "./AllPacks";
import {GeneralProfileWrapper} from '../stylesComponents/generalWapper';
import {getTodolistsTC} from "../../thunk/todolistThunk";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {AppInitialStateType} from "../../types/reducersType";
import {initialStateAuthorizationType} from "../../types/authType";
import {Header} from "../common/header/Header";
import {NotAuthRedirect} from "../../utilsFunction/redirectFunction";

export const TodolistList = NotAuthRedirect(() => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const stateAuth = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [stateApp.params]);

    return (
        <GeneralProfileWrapper>
            {stateAuth.isAuth && <Header/>}
            <AllTasks/>
        </GeneralProfileWrapper>
    )
});