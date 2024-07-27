import { FormAddPostType, FormUpdatePostType } from "@/@types"
import { Post } from "@prisma/client"
import { AxiosResponse } from "axios"
import { api } from "."

export async function getAllPosts() {

    const url = "/posts"

    const response: Post[] = await api
        .get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response
}

export async function getPostById(id: string): Promise<Post> {

    const url = `/posts/${id}`

    const response: Post = await api
        .get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response
}

export function createPost(post: FormAddPostType): Promise<AxiosResponse<Post>> {

    const url = "/posts"

    return api.post(url, post)
}

export function updatePost(post: FormUpdatePostType, id: string): Promise<AxiosResponse<Post>> {

    const url = `/posts/${id}`

    return api.put(url, post)
}

export function deletePost(id: string) {

    const url = `/posts/${id}`

    return api.delete(url)
}