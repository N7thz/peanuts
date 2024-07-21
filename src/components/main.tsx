"use client"

import { api } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@prisma/client"
import { useImage } from "@/context/image-provider"
import { FormSendEmail } from "./form-send-email"
import { DialogAddPost } from "./dialog-add-post"
import { PostCard } from "./post-card"

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

    if (!posts) return

    return (
        <main className="p-6 space-y-5">
            {user && <DialogAddPost />}
            <div className="space-y-5">
                {
                    posts.map(post =>
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    )
                }
            </div>
            <FormSendEmail />
        </main>
    )
}
