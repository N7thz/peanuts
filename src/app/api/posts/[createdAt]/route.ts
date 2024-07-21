import { prisma } from "@/lib/prisma"
import { validateToken } from "@/lib/validate-token"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface ContextProps {
    params: {
        createdAt: Prisma.PostWhereUniqueInput
    }
}

export async function DELETE(request: NextRequest, context: ContextProps) {

    console.log(context)

    const { params: { createdAt } } = context

    const decoded = validateToken(request)

    console.log(decoded)

    if (decoded) {
        const postDeleted = await prisma.post.delete({
            where: createdAt
        })

        console.log(postDeleted)

        if (postDeleted) return NextResponse.json(
            "Deleted",
            {
                status: 204,
                statusText: "Deleted"
            }
        )
    }
}