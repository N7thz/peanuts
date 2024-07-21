import { SendEmailRequest } from "@/@types"
import { api } from "."

export function sendEmail({ message, subject }: SendEmailRequest) {

    const url = "/send-email"

    return api.post(url, { message, subject })
}