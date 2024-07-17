import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {

    const token = request.headers.get("authorization")

    if (!token) return new NextResponse(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    const KEY = process.env.JWT_KEY!

    const decoded = jwt.verify(token, KEY)

    if (decoded) {
        const users = await prisma.user.findMany()

        const [user] = users

        return NextResponse.json(user)
    }
}