import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {

    const { email, password }: User = await request.json()

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) return NextResponse.json(
        "error",
        {
            status: 400,
            statusText: "Invalid email or password"
        }
    )

    const isPasswordCorretly = await compare(password, user.password)

    if (user && isPasswordCorretly) {

        const { email } = user

        const KEY = process.env.JWT_KEY!

        const token = jwt.sign({ role: user.role }, KEY)

        return NextResponse.json({
            token,
            email
        })
    }
}   