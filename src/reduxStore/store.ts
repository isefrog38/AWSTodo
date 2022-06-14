import {todolistsReducer} from './todolistsReducer';
import {Action, AnyAction, combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppReducer} from "./appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {AuthorizationReducer} from "./authReducer";
import {ParamsReducer} from "./paramsReducer";

const rootReducer = combineReducers({
    todolistsReducer,
    AppReducer,
    AuthorizationReducer,
    ParamsReducer,
});

export const store = configureStore({
    reducer: {
        todolistsReducer,
        AppReducer,
        AuthorizationReducer,
        ParamsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})


export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
