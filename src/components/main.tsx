"use client"

import { getAllPosts } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"
import { useImage } from "@/context/image-provider"
import { FormSendEmail } from "./form-send-email"
import { DialogAddPost } from "./dialog-add-post"
import { PostCard } from "./post-card"
import { LoadingCard } from "./loading-card"

export const Main = () => {

    const { user } = useImage()

    const {
        data: posts, isLoading
    } = useQuery({
        queryKey: ["get-all-posts"],
        queryFn: getAllPosts
    })
    
    if (isLoading || !posts) return <LoadingCard />

    return (
        <main className="p-6 space-y-5">
            {user && <DialogAddPost />}
            <div className="space-y-5">
                {
                    posts.length === 0
                        ? <p className="w-full text-center italic text-4xl">
                            Sem posts
                        </p>
                        : posts.map(post =>
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
