export type ResponseDataLoginOrAuthMe = {
        id: null | string,
        email: null | string,
        isActivated: boolean | null
}

export type ResponseRegisterType = {
    accessToken: string,
    refreshToken: string,
    user: ResponseDataLoginOrAuthMe
}

export type initialStateAuthorizationType ={
    user: {
        id: null | string,
        email: null | string,
        isActivated: boolean | null
    },
    refreshToken: string | null
    isAuth: boolean
};