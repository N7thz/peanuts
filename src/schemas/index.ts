import { z } from "zod"

export const FormLoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email"
    }),
    password: z.string().min(6, {
        message: "Password too short"
    })
})

export const FormAddImageSchema = z.object({
    url: z.string().min(10, {
        message: "url too short."
    })
})

export const FormContactSchema = z.object({
    subject: z.string().min(1, {
        message: "Subject is mandatory."
    }),
    message: z.string().min(1, {
        message: "Message is mandatory."
    })
})