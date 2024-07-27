import axios from "axios"
import { getCookie } from "cookies-next"
import { getAuthorization } from "./get-authorization"
import { getCredentialUser } from "./login"
import { 
    getAllPosts, createPost, deletePost, getPostById, updatePost 
} from "./posts"
import { sendEmail } from "./send-email"
import { updateImageAvatar, postUser } from "./users"
import { getBanner } from "./get-banner"

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
    postUser,
    getBanner,
    getPostById, 
    updatePost 
}