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

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    const postRequest: FormAddPostType = await request.json()

    const { title, text, image_url, links: [link] } = postRequest

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