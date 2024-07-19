import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react"
import {
    FormAddImageSchema, 
    FormAddPostSchema, 
    FormContactSchema, 
    FormLoginSchema
} from "@/schemas"
import {
    Target, VariantLabels, TargetAndTransition, Transition, AnimationControls
} from "framer-motion"
import { User } from "@prisma/client"
import { z } from "zod"

export type FormLoginType = z.infer<typeof FormLoginSchema>
export type FormAddImageType = z.infer<typeof FormAddImageSchema>
export type FormContactType = z.infer<typeof FormContactSchema>
export type FormAddPostType = z.infer<typeof FormAddPostSchema>

export interface getCredentialUserResponse {
    token: string
    email: string
}

export interface HasFileProps extends ComponentProps<"div"> {
    file: File,
    setFile: Dispatch<SetStateAction<File | null>>
}

export interface NotHasFileProps {
    setFile: Dispatch<SetStateAction<File | null>>
    isError: boolean
}

export interface AnimationProps extends ComponentProps<"div"> {
    children: ReactNode
    initial?: boolean | Target | VariantLabels
    whileInView?: VariantLabels | TargetAndTransition
    exit?: TargetAndTransition | VariantLabels
    transition?: Transition
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
}

export interface UpdateImageAvatarRequest {
    email: string
    avatarUrl: string
}

export interface AvatarAdminProps extends ComponentProps<"img"> {
    fallBack: string
}

export interface GetAuthorizationRequest {
    setUser: Dispatch<SetStateAction<User | null>>
}

export interface SendEmailRequest {
    subject: string
    message: string
}

export interface ToasterProps extends ComponentProps<"div"> {
    toaster_title: string
    toaster_message: string
    variant: "default" | "destructive" | undefined
}