import { FormLoginType, getCredentialUserResponse } from "@/@types"
import { AxiosResponse } from "axios"
import { api } from "."

export function getCredentialUser(data: FormLoginType): Promise<AxiosResponse<getCredentialUserResponse>> {

    const url = "/login"

    return api.post(url, data)
}