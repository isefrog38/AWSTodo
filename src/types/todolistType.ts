export type TodolistType = {
    taskId: string
    title: string
    date: string
    file?: 1 | 0
}

export type ResponseTaskType = {
    statusCode: number
    todolists: TodolistType[]
    totalCount: number
}

export type ResponsePostType = {
    body: { id: string }
    statusCode: number
}

export type LanguageResponseType = {
    "todolist_senamaSoft": string,
    "name_table": string,
    "date_table": string,
    "actions_table": string,
    "show": string,
    "task_per_page": string,
    "todolist_table": string,
    "add_button": string,
}

export type FileResponseType = {
    id: string
    taskId: string
    name: string | undefined,
    type: string | undefined,
    size: number | undefined,
    lastModified: number | undefined,
    path: string,
}

export type FileType = {
    name: string | undefined,
    type: string | undefined,
    size: number | undefined,
    lastModified: number | undefined,
    path: string,
}
