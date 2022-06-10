import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileType, TodolistType} from "../types/todolistType";
import {InitialStateTodolistDomainType} from "../types/reducersType";

const initialState: Array<InitialStateTodolistDomainType> = [];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {
        createTaskAC(state, action: PayloadAction<{title: string, date: Date, file: FileType | undefined, taskId: string}>) {
            let {title, date, taskId, file} = action.payload;
            state.push({title, date: `${date.toString().slice(0, 10).split("-").reverse().join("-")}`, file: file ? 1 : 0, taskId,  entityStatus: 'idle', filter: 'All'});
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(tl => tl.taskId !== action.payload.todolistId);
        });
        builder.addCase(changeTodolistTitleAC, (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            return state.map(tl => tl.taskId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        });
    },
});

export const todolistsReducer = TodolistSlice.reducer;
export const {createTaskAC} = TodolistSlice.actions;

export const setTodolistsAC = createAction<{ todolists: Array<TodolistType> }>('SET_TODOLISTS');
export const removeTodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST');
export const changeTodolistTitleAC = createAction<{ todolistId: string, title: string }>('CHANGE_TODOLIST_TITLE');