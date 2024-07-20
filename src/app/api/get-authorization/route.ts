import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/validate-token"

export async function GET(request: NextRequest) {

    const decoded = validateToken(request)

    if (decoded) {
        const users = await prisma.user.findMany()

        const [user] = users

        return NextResponse.json(user)
    }
}