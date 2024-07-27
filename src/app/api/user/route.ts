import { UpdateImageAvatarRequest } from "@/@types"
import { prisma } from "@/lib/prisma"
import { validateToken } from "@/lib/validate-token"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

    const { email, password }: User = await request.json()

    const user = await prisma.user.findUnique({
        where: {
            role: "ADMIN"
        }
    })

    if (user) {
        return NextResponse.json("ADMIN already exist", {
            status: 400
        })
    }

    const newUser = await prisma.user.create({
        data: {
            email,
            password: await hash(password, 6),
            role: "ADMIN"
        }
    })

    return NextResponse.json(newUser)
}

export async function PUT(request: NextRequest) {

    const { email, avatarUrl }: UpdateImageAvatarRequest = await request.json()

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    await prisma.user.update({
        where: {
            email
        },
        data: {
            avatarUrl
        }
    })

    return NextResponse.json(
        "The image has been successfully updated.",
        {
            status: 200,
            statusText: "Image added successfully."
        }
    )
}