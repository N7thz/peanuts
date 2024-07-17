import { FormAddImageSchema, FormLoginSchema } from "@/schemas"
import { User } from "@prisma/client"
import { ComponentProps, Dispatch, SetStateAction } from "react"
import { z } from "zod"

export type FormLoginType = z.infer<typeof FormLoginSchema>
export type FormAddImageType = z.infer<typeof FormAddImageSchema>

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