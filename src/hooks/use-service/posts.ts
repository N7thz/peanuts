import { FormAddPostType } from "@/@types"
import { Post } from "@prisma/client"
import { AxiosResponse } from "axios"
import { api } from "."

export function getAllPosts(): Promise<AxiosResponse<Post[]>> {

    const url = "/posts"

    return api.get(url)
}

export function createPost(post: FormAddPostType): Promise<AxiosResponse<Post>> {

    const url = "/posts"

    return api.post(url, post)
}

export function deletePost(createdAt: Date): Promise<AxiosResponse<void>>  {

    const url = `/posts/${createdAt}`

    return api.delete(url)
}