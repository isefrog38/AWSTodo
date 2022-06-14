import axios from "axios";
import {FileResponseType, FileType, ResponsePostType, ResponseTaskType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";

const instanceAWS = axios.create({baseURL: 'https://hnwqd3lfo9.execute-api.eu-west-3.amazonaws.com/prod/'});

export const todolistsAPI = {

    getTodolists(params: { pageSize: number, page: number, filter: FilterType, search?: string }) {
        return instanceAWS.get<ResponseTaskType>(`task`);
    },

    createTodolist(title: string, date: Date, file?: FileType, id?: string) {
        if (id) return instanceAWS.post<ResponsePostType>(`task`, {title, date, file, id});
        return instanceAWS.post<ResponsePostType>(`task`, {title, date, file});
    },

    removeTodolist(id: string) {
        return instanceAWS.delete(`task?taskId=${id}`);
    },

    getFile(id: string) {
        return instanceAWS.get<{ file: FileResponseType }>(`/file?id=${id}`);
    },

    getLanguage(lang: LanguageType) {
        return instanceAWS.get(`language?lang=${lang}`);
    },
}

