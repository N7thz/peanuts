import { ContextProps } from "@/@types"
import { getLinkId } from "@/lib/get-link-id"
import { prisma } from "@/lib/prisma"
import { validateToken } from "@/lib/validate-token"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, context: ContextProps) {

    const { params: { id } } = context

    

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    
}

export async function DELETE(request: NextRequest, context: ContextProps) {

    const { params: { id } } = context

    const decoded = validateToken(request)

    if (!decoded) return NextResponse.json(
        "unauthorized", {
        status: 401,
        statusText: "Error in request"
    })

    await prisma.post.delete({
        where: {
            id
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