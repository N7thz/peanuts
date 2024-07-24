import axios from "axios"
import { getCookie } from "cookies-next"
import { getAuthorization } from "./get-authorization"
import { getCredentialUser } from "./login"
import { getAllPosts, createPost, deletePost } from "./posts"
import { sendEmail } from "./send-email"
import { updateImageAvatar, postUser } from "./users"

const token = getCookie("token")

export const api = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: token
    }
})

export {
    getCredentialUser,
    updateImageAvatar,
    getAuthorization,
    sendEmail,
    getAllPosts,
    createPost,
    deletePost,
    postUser
}