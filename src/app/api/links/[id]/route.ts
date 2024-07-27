import { ContextProps } from "@/@types"
import { prisma } from "@/lib/prisma"
import { validateToken } from "@/lib/validate-token"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: ContextProps) {

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    const { params: { id } } = context

    const link = await prisma.link.findUnique({
        where: {
            id
        }
    })

    console.log(link)

    if (link) return NextResponse.json(
        link,
        {
            status: 200,
            statusText: "success"
        }
    )
}