import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistType";
import {InitialStateTodolistDomainType} from "../types/reducersType";

const initialState: Array<InitialStateTodolistDomainType> = [];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(tl => tl._id !== action.payload.todolistId);
        });
        builder.addCase(changeTodolistTitleAC, (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            return state.map(tl => tl._id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        });
    },
});

export const todolistsReducer = TodolistSlice.reducer;

export const setTodolistsAC = createAction<{ todolists: Array<TodolistType> }>('SET_TODOLISTS');
export const removeTodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST');
export const changeTodolistTitleAC = createAction<{ todolistId: string, title: string }>('CHANGE_TODOLIST_TITLE');