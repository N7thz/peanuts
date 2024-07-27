"use client"

import { ContextProps } from "@/@types"
import Loading from "@/app/loading"
import { getPostById } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"

export default function Page({ params: { id } }: ContextProps) {

    const {
        data: post, isLoading
    } = useQuery({
        queryKey: ["get-post-by-id"],
        queryFn: async () => getPostById(id)
    })

    if (!post || isLoading) return <Loading />

    return <pre> { JSON.stringify(post, null, 2) } </pre>
}