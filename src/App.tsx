import React, {useEffect} from 'react';
import {Loading} from "./components/common/loading/Loading";
import {AppWrapper} from "./components/stylesComponents/taskWrapper";
import {Snackbar} from "./components/common/snackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./reduxStore/store";
import {TodolistList} from "./components/table/PacksList";
import {AppInitialStateType} from "./types/reducersType";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {initialStateAuthorizationType} from "./types/authType";
import { PATH } from './utilsFunction/enumPath';
import { Header } from './components/common/header/Header';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/authComponents/login/login";
import {Register} from "./components/authComponents/registration/register";
import {CheckEmail} from "./components/authComponents/checkEmail/checkEmail";
import {AuthMeTC} from "./thunk/authThunk";

export const App = () => {

        const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
        const stateAuth = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
        const dispatch = useTypedDispatch();

        useEffect(() => {

                dispatch(AuthMeTC());

        }, []);

        i18n
            .use(initReactI18next)
            .init({
                resources: {
                    eng: {translation: {...stateApp.translation}},
                    rus: {translation: {...stateApp.translation}},
                },
                lng: stateApp.language,
            }).then(t => t)

        return (
            <AppWrapper>
                {stateApp.status === 'loading'
                    ? <Loading/>
                    : <>
                        {stateAuth.user.isActivated && <Header/>}
                        <Snackbar/>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={PATH.todolist}/>}/>
                            <Route path={PATH.login} element={<Login/>}/>
                            <Route path={PATH.registration} element={<Register/>}/>
                            <Route path={PATH.todolist} element={<TodolistList/>}/>
                            <Route path={PATH.checkEmail} element={<CheckEmail/>}/>
                        </Routes>
                    </>
                }
            </AppWrapper>
        )
    }
;