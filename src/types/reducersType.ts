import {LanguageResponseType, TodolistType} from "./todolistType";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type FilterType = '0' | '1';

export type LanguageType = "rus" | "eng";

export type AppInitialStateType = {
    success: null | string,
    language: LanguageType
    translation:LanguageResponseType
    status: RequestStatusType
    error: null | string
    isFetching: boolean
};


export type FilterValuesType = 'All' | 'Active' | 'Completed';


export type InitialStateTodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

export type ParamsInitialStateType = {
    params : {
        search: string
        pageSize: number
        page: number
        filter: FilterType
    }
    totalCount: number | null
}