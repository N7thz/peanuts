import { prisma } from "@/lib/prisma"
import { FormAddPostType } from "@/@types"
import { NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/validate-token"
import { getLinkId } from "@/lib/get-link-id"

export async function GET() {

    const posts = await prisma.post.findMany()

    return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {

    const decoded = validateToken(request)

    if (decoded) {

        const postRequest: FormAddPostType = await request.json()

        const { title, text, image_url, links: [link] } = postRequest

        console.log(postRequest)

        const linkId = await getLinkId(link)

        const post = {
            title,
            text,
            linkId,
            bannerUrl: image_url ?? null,
            createdAt: new Date()
        }

        const postCreated = await prisma.post.create({
            data: post
        })

        if (postCreated) return NextResponse.json(
            postCreated,
            {
                status: 200,
                statusText: "success"
            }
        )
    }
}

export async function PUT(request: NextRequest) {

    const decoded = validateToken(request)

    if (decoded) {

        const postRequest = await request.json()

        const { id, title, text, image_url, links: [link] } = postRequest

        const linkId = await getLinkId(link)

        const post = {
            id,
            title,
            text,
            linkId,
            bannerUrl: image_url ?? null,
            createdAt: new Date()
        }

        const postUpdated = await prisma.post.update({
            where: {
                id
            },
            data: post
        })

        if (postUpdated) return NextResponse.json(
            postUpdated,
            {
                status: 200,
                statusText: "Updated"
            }
        )
    }
}

export async function DELETE(request: NextRequest) {

    const { id } = await request.json()

    const decoded = validateToken(request)

    if (decoded) {

        const postDeleted = await prisma.post.delete({
            where: id
        })

        if (postDeleted) return NextResponse.json(
            "Deleted",
            {
                status: 204,
                statusText: "Deleted"
            }
        )
    }
}