import { ContextProps } from "@/@types"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: ContextProps) {

    const { params: { id } } = context

    const link = await prisma.link.findUnique({
        where: {
            id
        }
    })

    if (link) return NextResponse.json(
        link,
        {
            status: 200,
            statusText: "success"
        }
    )
}