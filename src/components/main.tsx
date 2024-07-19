"use client"

import { api, useService } from "@/hooks/use-service"
import { FormSendEmail } from "./form-send-email"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@prisma/client"
import { useImage } from "@/context/image-provider"
import { Button } from "./ui/button"
import { DialogAddPost } from "./dialog-add-post"

export const Main = () => {

    const { user } = useImage()

    const {
        data: posts, isLoading
    } = useQuery({
        queryKey: ["get-all-posts"],
        queryFn: async () => {

            const url = "/posts"

            const response: Post[] = await api.get(url)
                .then(res => res.data)
                .catch(err => console.log(err))

            return response
        }
    })

    console.log(posts)

    if (isLoading) return <div
        className="size-full animate-pulse bg-secondary"
    />

    return (
        <main className="p-6">
            {user && <DialogAddPost />}
            <FormSendEmail />
        </main>
    )
}
