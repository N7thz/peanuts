import { UpdateImageAvatarRequest } from "@/@types"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {

    const { email, avatarUrl }: UpdateImageAvatarRequest = await request.json()

    const newUser = await prisma.user.update({
        where: {
            email
        },
        data: {
            avatarUrl
        }
    })

    if (newUser) {
        return new NextResponse(
            "The image has been successfully updated.",
            {
                status: 200,
                statusText: "Image added successfully."
            }
        )
    } else {
        return new NextResponse(
            "error",
            {
                status: 500,
                statusText: "Error updating image."
            }
        )
    }
}