import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileType, TodolistType} from "../types/todolistType";
import {InitialStateTodolistDomainType} from "../types/reducersType";

const initialState: Array<InitialStateTodolistDomainType> = [];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {
        createTaskAC(state, action: PayloadAction<{ title: string, date: Date, file: FileType | undefined, taskId: string }>) {
            let {title, date, taskId, file} = action.payload;
            state.unshift({
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
            return state.map(el => el.taskId === taskId
                ? {
                    ...el,
                    title,
                    date: `${date.toLocaleDateString().split(".").join("-")}`,
                    file: file ? 1 : 0,
                }
                : el);
        },
        deleteTaskAC(state, action: PayloadAction<{ taskId: string }>) {
            return state.filter(el => el.taskId !== action.payload.taskId);
        },
        setTasksAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        },
    },
});

export const todolistsReducer = TodolistSlice.reducer;
export const {createTaskAC, updateTaskAC, deleteTaskAC, setTasksAC} = TodolistSlice.actions;