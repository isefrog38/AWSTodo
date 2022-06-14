import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileType, TodolistType} from "../types/todolistType";
import {InitialStateTodolistDomainType} from "../types/reducersType";

const initialState: Array<InitialStateTodolistDomainType> = [];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {
        createTaskAC(state, action: PayloadAction<{ title: string, date: Date, file: FileType | undefined, taskId: string }>) {
            let {title, date, taskId, file} = action.payload;
            state.push({
                title,
                date: `${date.toLocaleDateString().split(".").join("-")}`,
                file: file ? 1 : 0,
                taskId,
                entityStatus: 'idle',
                filter: 'All'
            });
        },
        updateTaskAC(state, action: PayloadAction<{ title: string, date: Date, file: FileType | undefined, taskId: string }>) {
            let {title, date, taskId, file} = action.payload;
            state.map(el => el.taskId === taskId
                ? {
                    ...el,
                    title,
                    date: `${date.toLocaleDateString().split(".").join("-")}`,
                    file: file ? 1 : 0,
                }
                : el);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(tl => tl.taskId !== action.payload.todolistId);
        });
    },
});

export const todolistsReducer = TodolistSlice.reducer;
export const {createTaskAC, updateTaskAC} = TodolistSlice.actions;

export const setTodolistsAC = createAction<{ todolists: Array<TodolistType> }>('SET_TODOLISTS');
export const removeTodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST');