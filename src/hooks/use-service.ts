import {
    FormLoginType,
    GetAuthorizationRequest,
    getCredentialUserResponse,
    UpdateImageAvatarRequest,
} from "@/@types"
import { User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"
import { Dispatch, SetStateAction } from "react"

const token = getCookie("token")

export const api = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: token
    }
})

export function useService() {

    async function getAuthorization({ setUser }: GetAuthorizationRequest): Promise<AxiosResponse<User>> {

        const url = "/get-authorization"

        return api.get(url)
    }

    function getCredentialUser(data: FormLoginType): Promise<AxiosResponse<getCredentialUserResponse>> {

        const url = "/login"

        return api.post(url, data)
    }

    function updateImageAvatar({ email, avatarUrl }: UpdateImageAvatarRequest): Promise<AxiosResponse<any>> {

        const url = "/update-image"

        return api.put(url, { email, avatarUrl })
    }

    return {
        getCredentialUser,
        updateImageAvatar,
        getAuthorization
    }
}