import React, {useEffect} from 'react';
import {AllTasks} from "./AllPacks";
import {GeneralProfileWrapper} from '../stylesComponents/generalWapper';
import {getTodolistsTC} from "../../thunk/todolistThunk";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {ParamsInitialStateType} from "../../types/reducersType";
import {initialStateAuthorizationType} from "../../types/authType";
import {Header} from "../common/header/Header";
import {NotAuthRedirect} from "../../utilsFunction/redirectFunction";

export const TodolistList = NotAuthRedirect(() => {

    const stateParams = useAppSelector<ParamsInitialStateType>(state => state.ParamsReducer);
    const stateAuth = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [stateParams.params]);

    return (
        <GeneralProfileWrapper>
            {stateAuth.isAuth && <Header/>}
            <AllTasks/>
        </GeneralProfileWrapper>
    )
});