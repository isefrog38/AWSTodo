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

export type initialStateAuthorizationType = {
    user: {
        email: null | string,
        isActivated: boolean | null
    },
    refreshToken: string | null
    isAuth: boolean
};

export type CongnitoResponseType = {
    accessToken: {}
    clockDrift: number
    idToken: {}
    refreshToken: {}
}