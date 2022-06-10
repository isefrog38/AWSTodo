import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppInitialStateType, FilterType, LanguageType, RequestStatusType} from "../types/reducersType";
import {LanguageResponseType} from "../types/todolistType";

const initialState: AppInitialStateType = {
    params: {
        page: 1,
        pageSize: 10,
        search: '',
        filter: '0',
    },
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
    totalCount: null,
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
        setPageCountAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.params.pageSize = action.payload.pageCount;
        },
        setSearchTodoAC(state, action: PayloadAction<{ searchTodo: string }>) {
            state.params.search = action.payload.searchTodo;
        },
        getPageAC(state, action: PayloadAction<{ page: number }>) {
            state.params.page = action.payload.page;
        },
        setTotalPageCountTaskAC(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalCount = action.payload.totalCount;
        },
        setFilterAC(state, action: PayloadAction<{ filter: FilterType }>) {
            state.params.filter = action.payload.filter;
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
    setLanguageAC, setFilterAC, setTotalPageCountTaskAC, getPageAC, setLanguageFileAC, setAppSuccessMessageAC,
    setIsFetchingAC, setSearchTodoAC, setPageCountAC, setAppStatusAC, setAppErrorMessageAC,
} = AppSlice.actions;
