import { SendEmailRequest } from '@/@types'
import { EmailTemplate } from '@/components/email-template'
import { NextRequest } from 'next/server'
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {

    const body: SendEmailRequest = await req.json()

    const { message, subject } = body

    try {
        const data = await resend.emails.send({
            from: 'Nathan <onboarding@resend.dev>',
            to: ["nathanferreiradev@gmail.com"],
            subject: subject,
            react: EmailTemplate({ message, subject }) as React.ReactElement,
        })

        return Response.json(data)
    } catch (error) {
        return Response.json({ error: Error })
    }
}