import axios, {AxiosResponse} from "axios";
import {FileResponseType, FileType, ResponsePostType, TodolistType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";
import {ResponseRegisterType} from "../types/authType";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7574/',
});

const instanceAWS = axios.create({baseURL: 'https://hnwqd3lfo9.execute-api.eu-west-3.amazonaws.com/prod/'});

instance.interceptors.request.use((config) => {
        if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
});

instance.interceptors.response.use((config) => {
        return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const res = await instance.get<ResponseRegisterType>(`auth/refresh`);
            localStorage.setItem('token', res.data.accessToken);
            return instance.request(originalRequest);
        } catch (error) {
            console.log('Not authorized')
        }
    }
    throw error;
});

export const todolistsAPI = {
    // getTodolists(params: { pageSize: number, page: number, filter: FilterType, search?: string }) {
    //     return instance.get<{ todolists: TodolistType[], totalCount: number }>(`todolists`, {params});
    // },

    getTodolists(params: { pageSize: number, page: number, filter: FilterType, search?: string }) {
        return instanceAWS.get<{ todolists: TodolistType[], totalCount: number }>(`task`);
    },

    // createTodolist(title: string, date: Date, file?: FileType, id?: string) {
    //     if (id) return instance.post<AxiosResponse<{ id: string }>>(`todolists/${id}`, {title, date, file});
    //     else return instance.post<AxiosResponse<{ id: string }>>(`todolists`, {title, date, file});
    // },

    createTodolist(title: string, date: Date, file?: FileType) {
        // if (id) return instance.post<AxiosResponse<{ id: string }>>(`todolists/${id}`, {title, date, file});
        return instanceAWS.post<ResponsePostType>(`task`, {title, date, file});
    },


    removeTodolist(id: string) {
        return instance.delete(`todolists/${id}`);
    },

    getFile(id: string) {
        return instance.get<{ file: FileResponseType }>(`todolists/file/${id}`);
    },

    getLanguage(lang: LanguageType) {
        // return instance.get(`todolists/language/${lang}`);
        return instanceAWS.get(`language?lang=${lang}`);
    },
}


export const authAPI = {
    authMe() {
        return instance.get<ResponseRegisterType>(`auth/refresh`)
    },
    authLogin(email: string, password: string, rememberMe: boolean) {
        return instance.post<{email: string, password: string, rememberMe: boolean}, AxiosResponse<ResponseRegisterType>>(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.post(`auth/logout`)
    },
    register(email: string, password: string) {
        return instance.post<{email: string, password: string}, AxiosResponse<ResponseRegisterType>>(`auth/register`, {email, password})
    },
}

