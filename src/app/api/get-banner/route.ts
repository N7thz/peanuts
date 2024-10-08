import { NextResponse } from "next/server"
import { banners } from "@/data.json"

export async function GET() {

    const randonIndex = Math.floor(Math.random() * 8)
    const banner = banners[randonIndex]

    return NextResponse.json(banner)
}