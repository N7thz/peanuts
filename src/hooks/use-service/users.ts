import { FormLoginType, UpdateImageAvatarRequest } from "@/@types"
import { AxiosResponse } from "axios"
import { api } from "."
import { User } from "@prisma/client"

const url = "/user"

export function postUser({
    email, password
}: FormLoginType): Promise<AxiosResponse<User>> {
    
    return api.post(url, { email, password })
}

export function updateImageAvatar({
    email, avatarUrl
}: UpdateImageAvatarRequest): Promise<AxiosResponse<void>> {

    return api.put(url, { email, avatarUrl })
}