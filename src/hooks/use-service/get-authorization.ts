import { GetAuthorizationRequest } from "@/@types"
import { User } from "@prisma/client"
import { AxiosResponse } from "axios"
import { api } from "."

export function getAuthorization({ setUser }: GetAuthorizationRequest): Promise<AxiosResponse<User>> {

    const url = "/get-authorization"

    return api.get(url)
}