import { UpdateImageAvatarRequest } from "@/@types"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {

    const { email, avatarUrl }: UpdateImageAvatarRequest = await request.json()

    const imageUpdated = await prisma.user.update({
        where: {
            email
        },
        data: {
            avatarUrl
        }
    })

    if (imageUpdated) {
        return new NextResponse(
            "The image has been successfully updated.",
            {
                status: 200,
                statusText: "Image added successfully."
            }
        )
    }

    return new NextResponse(
        "error",
        {
            status: 400,
            statusText: "Error updating image."
        }
    )
}