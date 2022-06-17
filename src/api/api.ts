import axios from "axios";
import {FileResponseType, FileType, ResponsePostType, ResponseTaskType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";

const instanceAWS = axios.create({baseURL: 'https://hnwqd3lfo9.execute-api.eu-west-3.amazonaws.com/prod/'});

export const todolistsAPI = {

    getTasks(params: { pageSize: number, page: number, filter: FilterType, search?: string }) {
        return instanceAWS.get<ResponseTaskType>(`task`, {params});
    },

    createTask(title: string, date: Date, file?: FileType) {
            return instanceAWS.post<ResponsePostType>(`task`, {title, date, file});
    },

    updateTask(title: string, date: Date, file?: FileType, taskId?: string) {
         return instanceAWS.put<ResponsePostType>(`task`, {title, date, file, taskId});
    },

    removeTask(id: string) {
        return instanceAWS.delete(`task?taskId=${id}`);
    },

    getFile(id: string) {
        return instanceAWS.get<{ statusCode: number, file: FileResponseType }>(`/file?id=${id}`);
    },

    getLanguage(lang: LanguageType) {
        return instanceAWS.get(`language?lang=${lang}`);
    },
///////////////////////////////// S3
    getFileS3(id: string) {
        return instanceAWS.get<{ statusCode: number, file: FileResponseType }>(`/s3file?id=${id}`);
    },

    createTaskS3(title: string, date: Date, file: FileType) {
        return instanceAWS.post<ResponsePostType>(`s3file`, {title, date, file});
    },

    removeTaskS3(id: string) {
        return instanceAWS.delete(`s3file?id=${id}`);
    },
}

