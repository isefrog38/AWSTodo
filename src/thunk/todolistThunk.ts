import {createTaskAC, deleteTaskAC, setTasksAC, updateTaskAC} from "../reduxStore/todolistsReducer";
import {setAppStatusAC, setAppSuccessMessageAC, setIsFetchingAC, setLanguageFileAC} from "../reduxStore/appReducer";
import {AppRootStateType, AppThunkType} from "../reduxStore/store";
import {handleServerAppError, handleServerNetworkError, returnFileSize} from "../utilsFunction/Error-Utils";
import {todolistsAPI} from "../api/api";
import {FileType, ResponsePostType} from "../types/todolistType";
import {setTotalPageCountTaskAC} from "../reduxStore/paramsReducer";

export const getTasksTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setIsFetchingAC({isFetching: true}));

        try {
            let {params} = getState().ParamsReducer;
            const {data} = await todolistsAPI.getTasks(params);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                dispatch(setTasksAC({todolists: data.todolists}));
                dispatch(setTotalPageCountTaskAC({totalCount: data.totalCount}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsFetchingAC({isFetching: false}));
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }


export const removeTaskTC = (taskId: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    const code = taskId.slice(0,7);
    if (code === "BIGFILE") {
        try {
            const {data} = await todolistsAPI.removeTaskS3(taskId);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                dispatch(deleteTaskAC({taskId}));
                dispatch(setIsFetchingAC({isFetching: false}));
                dispatch(setAppSuccessMessageAC({success: "Task removed !"}));
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    } else {
        try {
            const {data} = await todolistsAPI.removeTask(taskId);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                dispatch(deleteTaskAC({taskId}));
                dispatch(setIsFetchingAC({isFetching: false}));
                dispatch(setAppSuccessMessageAC({success: "Task removed !"}));
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }
}


export const createTaskTC = (title: string, date: Date, file?: FileType, id?: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));
        /// update  task
    if (id) {
        try {
            const {data} = await todolistsAPI.updateTask(title, date, id, file);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                dispatch(updateTaskAC({title, date, file, taskId: data.data.id}));
                dispatch(setAppSuccessMessageAC({success: "Task updated !"}));
                dispatch(setIsFetchingAC({isFetching: false}));
            } else {
                handleServerAppError(data.data.info, dispatch);
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    } else {
        ///create task
        if (!file) {
            try {
                const {data} = await todolistsAPI.createTask(title, date, file);
                if (data.statusCode >= 200 && data.statusCode < 400) {
                    dispatch(createTaskAC({title, date, file, taskId: data.data.id}));
                    dispatch(setAppSuccessMessageAC({success: "Task created !"}));
                    dispatch(setIsFetchingAC({isFetching: false}));
                } else {
                    handleServerAppError(data.data.info, dispatch);
                }
            } catch (e) {
                if (e instanceof Error) {
                    handleServerNetworkError(e.message, dispatch);
                }
            }
        } else {
            ///create in S3 base
            if (file && file?.size) {
                if (file.size > 528576) {
                    try {
                        const {data} = await todolistsAPI.createTaskS3(title, date, file);
                        if (data.statusCode >= 200 && data.statusCode < 400) {
                            dispatch(createTaskAC({title, date, file, taskId: data.data.id}));
                            dispatch(setAppSuccessMessageAC({success: "Task created !"}));
                            dispatch(setIsFetchingAC({isFetching: false}));
                        } else {
                            handleServerAppError(data.data.info, dispatch);
                        }
                    } catch (e) {
                        if (e instanceof Error) {
                            handleServerNetworkError(e.message, dispatch);
                        }
                    }
                } else {
                    /// create in DynamoDB base
                    try {
                        const {data} = await todolistsAPI.createTask(title, date, file);
                        if (data.statusCode >= 200 && data.statusCode < 400) {
                            dispatch(createTaskAC({title, date, file, taskId: data.data.id}));
                            dispatch(setAppSuccessMessageAC({success: "Task created !"}));
                            dispatch(setIsFetchingAC({isFetching: false}));
                        } else {
                            handleServerAppError(data.data.info, dispatch);
                        }
                    } catch (e) {
                        if (e instanceof Error) {
                            handleServerNetworkError(e.message, dispatch);
                        }
                    }
                }
            }
        }
    }
}

export const getFileTC = (id: string): AppThunkType => async dispatch => {

    const code = id.slice(0,7);
    if (code === "BIGFILE") {
        try {
            const {data} = await todolistsAPI.getFileS3(id);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                let file = data.file;
                if (file?.name) {
                    let download = document.createElement('a');
                    download.href = file?.path;
                    download.setAttribute('download', file?.name);
                    download.click();
                }
            } else {
                throw new Error("File is not defined")
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    } else {
        try {
            const {data} = await todolistsAPI.getFile(id);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                let file = data.file;
                if (file?.name) {
                    let download = document.createElement('a');
                    download.href = file?.path;
                    download.setAttribute('download', file?.name);
                    download.click();
                }
            } else {
                throw new Error("File is not defined")
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }
}

export const getLanguageTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC({status: 'loading'}));

        try {
            const {language} = getState().AppReducer
            const {data} = await todolistsAPI.getLanguage(language);
            if (data.statusCode >= 200 && data.statusCode < 400) {
                if (data.data.Rus) {
                    dispatch(setLanguageFileAC({translation: data.data.Rus}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    dispatch(setLanguageFileAC({translation: data.data.Eng}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                }
            } else {
                throw new Error(data.body.info);
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }