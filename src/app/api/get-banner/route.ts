import { NextResponse } from "next/server"
import { banners } from "@/data.json"

export async function GET() {

    const randonIndex = Math.floor(Math.random() * banners.length)
    const banner = banners[randonIndex]

    return NextResponse.json(banner)
}