import {
    ComponentProps,
    Dispatch,
    ReactNode,
    SetStateAction
} from "react"
import {
    FormAddImageSchema,
    FormAddPostSchema,
    FormContactSchema,
    FormLoginSchema,
    FormUpdatePostSchema
} from "@/schemas"
import {
    Target,
    VariantLabels,
    TargetAndTransition,
    Transition,
    AnimationControls
} from "framer-motion"
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFormRegister,
    FieldErrors
} from "react-hook-form"
import { Post, User } from "@prisma/client"
import { z } from "zod"

export type FormLoginType = z.infer<typeof FormLoginSchema>
export type FormAddImageType = z.infer<typeof FormAddImageSchema>
export type FormContactType = z.infer<typeof FormContactSchema>
export type FormAddPostType = z.infer<typeof FormAddPostSchema>
export type FormUpdatePostType = z.infer<typeof FormUpdatePostSchema>

export interface UpdatePostRequest extends FormUpdatePostType {
    linkId: string
}

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
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean
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

export interface ItemLinkArrayProps {
    fields: FieldArrayWithId<FormAddPostType, "links", "id">[]
    remove: UseFieldArrayRemove
    register: UseFormRegister<FormAddPostType>
    errors: FieldErrors<FormAddPostType>
}

export interface PostProps extends ComponentProps<"div"> {
    post: Post
}

export interface getLinkIdProps {
    title: string
    link: string
}

export interface DialogOptionsPostProps extends ComponentProps<"div"> {
    trigger: ReactNode
    title: string
    description?: string
}

export interface DeletePostButtonProps extends PostProps {
    setIsDeleted:  Dispatch<SetStateAction<boolean>>
    setIsNotDeleted:  Dispatch<SetStateAction<boolean>>
}

export interface ContextProps {
    params: {
        id: string
    }
}