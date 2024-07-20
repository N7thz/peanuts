import { getLinkIdProps } from "@/@types"
import { prisma } from "./prisma"

export async function getLinkId(link: getLinkIdProps) {

    const linkCreated = await prisma.link.create({
        data: link
    })

    return linkCreated.id
}