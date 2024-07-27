import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const validateToken = (request: NextRequest) => {

    const token = request.headers.get("authorization")

    if (!token) return null

    const KEY = process.env.JWT_KEY!

    const decoded = jwt.verify(token, KEY)

    console.log(decoded)

    return decoded
}
