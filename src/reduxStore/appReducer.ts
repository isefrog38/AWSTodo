import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppInitialStateType, FilterType, LanguageType, RequestStatusType} from "../types/reducersType";
import {LanguageResponseType} from "../types/todolistType";

const initialState: AppInitialStateType = {
    translation: {
        "todolist_senamaSoft": "Todolist SenamaSoft Company",
        "name_table": "Name",
        "date_table": "Added Date",
        "actions_table": "Actions",
        "show": "Show",
        "task_per_page": "Task per page",
        "todolist_table": "Todolist",
        "add_button": "Add New Task",
    } as LanguageResponseType,
    language: 'eng' as LanguageType,
    status: 'loading',
    error: null,
    success: null,
    isFetching: true,
}

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorMessageAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error;
        },
        setIsFetchingAC(state, action: PayloadAction<{ isFetching: boolean }>) {
            state.isFetching = action.payload.isFetching;
        },
        setLanguageAC(state, action: PayloadAction<{ language: LanguageType }>) {
            state.language = action.payload.language;
        },
        setLanguageFileAC(state, action: PayloadAction<{ translation: LanguageResponseType }>) {
            state.translation = action.payload.translation;
        },
        setAppSuccessMessageAC(state, action: PayloadAction<{ success: null | string }>) {
            state.success = action.payload.success;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {
    setLanguageAC, setLanguageFileAC, setAppSuccessMessageAC,
    setIsFetchingAC, setAppStatusAC, setAppErrorMessageAC,
} = AppSlice.actions;
