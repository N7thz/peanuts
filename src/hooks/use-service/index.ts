import {
    FormAddPostType,
    FormLoginType,
    GetAuthorizationRequest,
    getCredentialUserResponse,
    SendEmailRequest,
    UpdateImageAvatarRequest,
} from "@/@types"
import { Post, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

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

    function sendEmail({ message, subject }: SendEmailRequest) {

        const url = "/send-email"

        return api.post(url, { message, subject })
    }

    function getAllPosts(): Promise<AxiosResponse<Post>> {

        const url = "/posts"

        return api.get(url)
    }

    function createPost(post: FormAddPostType): Promise<AxiosResponse<Post>> {

        const url = "/posts"

        return api.post(url, post)
    }

    return {
        getCredentialUser,
        updateImageAvatar,
        getAuthorization,
        sendEmail,
        getAllPosts,
        createPost
    }
}