import { UpdateImageAvatarRequest } from "@/@types"
import { AxiosResponse } from "axios"
import { api } from "."

export function updateImageAvatar({
    email, avatarUrl
}: UpdateImageAvatarRequest): Promise<AxiosResponse<any>> {

    const url = "/user"

    return api.put(url, { email, avatarUrl })
}