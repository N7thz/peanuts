import { api } from "."
import { Link } from "@prisma/client"

export async function getLinkById(id: string): Promise<Link> {

    const url = `/links/${id}`

    const response: Link = await api
        .get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response
}