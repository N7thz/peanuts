import { ContextProps, UpdatePostRequest } from "@/@types"
import { prisma } from "@/lib/prisma"
import { updatePost } from "@/lib/update-post"
import { validateToken } from "@/lib/validate-token"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, context: ContextProps) {

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    const { params: { id } } = context

    const postRequest: UpdatePostRequest = await request.json()

    const object = await updatePost(id, postRequest)

    if (!object) return

    const { post, newLink } = object

    if (post || newLink) return NextResponse.json(
        post,
        {
            status: 200,
            statusText: "success"
        }
    )
}

export async function DELETE(request: NextRequest, context: ContextProps) {

    const { params: { id } } = context

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    const postDeleted = await prisma.post.delete({
        where: {
            id
        }
    })

    await prisma.link.delete({
        where: {
            id: postDeleted.id
        }
    })

    return NextResponse.json(
        null,
        {
            status: 200,
            statusText: "post deleted successfully"
        }
    )
}