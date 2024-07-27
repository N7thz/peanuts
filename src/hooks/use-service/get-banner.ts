import { api } from "."

export async function getBanner(): Promise<string> {

    const url = "/get-banner"

    const response = await api
        .get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response
}