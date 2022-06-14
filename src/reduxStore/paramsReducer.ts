import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType, ParamsInitialStateType} from "../types/reducersType";

const initialState: ParamsInitialStateType = {
    params: {
        page: 1,
        pageSize: 10,
        search: '',
        filter: '0',
    },
    totalCount: null,
}

const ParamsSlice = createSlice({
    name: "ParamsSlice",
    initialState: initialState,
    reducers: {

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
    },
});

export const ParamsReducer = ParamsSlice.reducer;

export const {
     setFilterAC, setTotalPageCountTaskAC,
    getPageAC, setSearchTodoAC, setPageCountAC,
} = ParamsSlice.actions;
