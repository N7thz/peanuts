import { link } from "fs"
import { z } from "zod"

export const FormLoginSchema = z.object({
    email: z.string()
        .email({
            message: "Invalid email"
        })
        .max(255, {
            message: "text is much large"
        }),
    password: z.string()
        .min(6, {
            message: "Password too short"
        })
        .max(255, {
            message: "text is much large"
        })
})

export const FormAddImageSchema = z.object({
    url: z
        .string()
        .min(10, {
            message: "url too short."
        })
        .max(255, {
            message: "text is much large"
        })
})

export const FormContactSchema = z.object({
    subject: z
        .string()
        .min(1, {
            message: "Subject is mandatory."
        })
        .max(255, {
            message: "text is much large"
        }),
    message: z
        .string()
        .min(1, {
            message: "Message is mandatory."
        }).max(255, {
            message: "text is much large"
        })
})

export const FormAddPostSchema = z.object({
    image_url: z
        .string()
        .max(255, {
            message: "iamge url  is much large"
        })
        .optional(),
    title: z
        .string()
        .min(1, {
            message: "Title is mandatory."
        })
        .max(255, {
            message: "text is much large"
        }),
    text: z
        .string()
        .min(1, {
            message: "text is mandatory."
        })
        .max(255, {
            message: "text is much large"
        }),
    links: z
        .array(
            z.object({
                title: z
                    .string()
                    .max(255, {
                        message: "title is much large"
                    }),
                link: z
                    .string()
                    .max(255, {
                        message: "link is much large"
                    })
            })
        )
})

export const FormUpdatePostSchema = z.object({
    image_url: z
        .string()
        .max(255, {
            message: "image url is much large"
        })
        .optional(),
    title: z
        .string()
        .max(255, {
            message: "title is much large"
        })
        .optional(),
    text: z
        .string()
        .max(255, {
            message: "text is much large"
        })
        .optional(),
    title_link: z
        .string()
        .max(255, {
            message: "title link is much large"
        })
        .optional(),
    link: z
        .string()
        .max(255, {
            message: "link is much large"
        })
        .optional(),
})