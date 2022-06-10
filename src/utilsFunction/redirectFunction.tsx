import {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {PATH} from "./enumPath";
import {useAppSelector} from "../reduxStore/store";

export function NotAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: any) => {

        const isAuth = useAppSelector<boolean>(state => state.AuthorizationReducer.isAuth);

        if (!isAuth) return (<Navigate to={PATH.login}/>);

        return <Component {...props as T}/>

    }

    return RedirectComponent
}

export function IsAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: any) => {

        const isAuth = useAppSelector<boolean>(state => state.AuthorizationReducer.isAuth);

        if (isAuth) return (<Navigate to={PATH.todolist}/>);

        return <Component {...props as T}/>

    }

    return RedirectComponent
}