import {createTaskAC, setTodolistsAC, updateTaskAC} from "../reduxStore/todolistsReducer";
import {
    setAppStatusAC,
    setAppSuccessMessageAC,
    setIsFetchingAC,
    setLanguageFileAC,
    setTotalPageCountTaskAC
} from "../reduxStore/appReducer";
import {AppRootStateType, AppThunkType} from "../reduxStore/store";
import {handleServerAppError, handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {todolistsAPI} from "../api/api";
import {FileType} from "../types/todolistType";

export const getTodolistsTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setIsFetchingAC({isFetching: true}));

        try {
            let {params} = getState().AppReducer;
            const response = await todolistsAPI.getTodolists(params);
            if (response.status > 200 || response.status < 400) {
                dispatch(setTodolistsAC({todolists: response.data.todolists}));
                dispatch(setTotalPageCountTaskAC({totalCount: response.data.totalCount}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsFetchingAC({isFetching: false}));
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }


export const resetTodolistsTC = (text: string): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        try {
            let {params} = getState().AppReducer;
            const response = await todolistsAPI.getTodolists(params);
            if (response.status > 200 || response.status < 400) {
                dispatch(setTodolistsAC({todolists: response.data.todolists}));
                dispatch(setTotalPageCountTaskAC({totalCount: response.data.totalCount}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsFetchingAC({isFetching: false}));
                dispatch(setAppSuccessMessageAC({success: text}));
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }


export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.removeTodolist(todolistId);
        if (response.status > 200 || response.status < 400) {
            dispatch(resetTodolistsTC("Task removed !"));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}


export const createTodolistTC = (title: string, date: Date, file?: FileType, id?: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    if (id) {
        try {
            const {data} = await todolistsAPI.createTodolist(title, date, file, id);
            if (data.statusCode > 200 || data.statusCode < 400) {
                dispatch(updateTaskAC({title, date, file, taskId: data.body.id}));
                dispatch(setAppSuccessMessageAC({success: "Task updated !"}));
                dispatch(setIsFetchingAC({isFetching: false}));
            } else {
                handleServerAppError(data.body.info, dispatch);
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }
    try {
        const {data} = await todolistsAPI.createTodolist(title, date, file);
        if (data.statusCode > 200 || data.statusCode < 400) {
            dispatch(createTaskAC({title, date, file, taskId: data.body.id}));
            dispatch(setAppSuccessMessageAC({success: "Task created !"}));
            dispatch(setIsFetchingAC({isFetching: false}));
        } else {
            handleServerAppError(data.body.info, dispatch);
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}

export const getFile = (id: string): AppThunkType => async dispatch => {
    try {
        const response = await todolistsAPI.getFile(id);
        if (response.status > 200 || response.status < 400) {
            let file = response.data.file;
            if (file?.name) {
                let download = document.createElement('a');
                download.href = file?.path;
                download.setAttribute('download', file?.name);
                download.click();
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}

export const getLanguageTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC({status: 'loading'}));

        try {
            const {language} = getState().AppReducer
            const response = await todolistsAPI.getLanguage(language);
            if (response.data.statusCode > 200 || response.data.statusCode < 400) {
                if (response.data.data.Rus) {
                    dispatch(setLanguageFileAC({translation: response.data.data.Rus}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    dispatch(setLanguageFileAC({translation: response.data.data.Eng}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                }
            } else {
                handleServerAppError(response.data.body.info, dispatch);
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }
