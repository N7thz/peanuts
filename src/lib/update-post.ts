import { UpdatePostRequest } from "@/@types"
import { prisma } from "./prisma"
import { Link, Post } from "@prisma/client"

export async function updatePost(
    id: string,
    request: UpdatePostRequest
) {

    let post: Post | null = null
    let newLink: Link | null = null

    const oldPost = await prisma.post.findUnique({
        where: {
            id
        }
    })

    const oldLink = await prisma.link.findUnique({
        where: {
            id: oldPost?.linkId
        }
    })

    if (!oldPost || !oldLink) return null

    const {
        image_url, text, title, link, title_link, linkId
    } = request

    if (image_url && image_url !== oldPost.bannerUrl) {
        post = await prisma.post.update({
            where: {
                id
            },
            data: {
                bannerUrl: image_url
            }
        })
    }

    if (title && title !== oldPost.title) {
        post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title
            }
        })
    }

    if (text && text !== oldPost.text) {
        post = await prisma.post.update({
            where: {
                id
            },
            data: {
                text
            }
        })
    }

    if (title_link && title_link !== oldLink.title) {
        newLink = await prisma.link.update({
            where: {
                id: linkId
            },
            data: {
                title: title_link
            }
        })
    }

    if (title_link && title_link !== oldLink.title) {
        newLink = await prisma.link.update({
            where: {
                id: linkId
            },
            data: {
                link
            }
        })
    }

    if (!post) {
        post = oldPost
    }

    if (!newLink) {
        newLink = oldLink
    }

    return {
        post, newLink
    }
}