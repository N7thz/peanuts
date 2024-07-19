import { z } from "zod"

export const FormLoginSchema = z.object({
    email: z.string()
        .email({
            message: "Invalid email"
        })
        .max(255, {
            message: "text much large"
        }),
    password: z.string()
        .min(6, {
            message: "Password too short"
        })
        .max(255, {
            message: "text much large"
        })
})

export const FormAddImageSchema = z.object({
    url: z
        .string()
        .min(10, {
            message: "url too short."
        })
        .max(255, {
            message: "text much large"
        })
})

export const FormContactSchema = z.object({
    subject: z
        .string()
        .min(1, {
            message: "Subject is mandatory."
        })
        .max(255, {
            message: "text much large"
        }),
    message: z
        .string()
        .min(1, {
            message: "Message is mandatory."
        }).max(255, {
            message: "text much large"
        })
})

export const FormAddPostSchema = z.object({
    image_url: z
        .string()
        .max(255, {
            message: "text much large"
        })
        .optional(),
    title: z
        .string()
        .min(1, {
            message: "Title is mandatory."
        })
        .max(255, {
            message: "text much large"
        }),
    text: z
        .string()
        .min(1, {
            message: "text is mandatory."
        })
        .max(255, {
            message: "text much large"
        })
})