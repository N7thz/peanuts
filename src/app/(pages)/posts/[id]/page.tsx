"use client"

import { ContextProps } from "@/@types"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { getPostById } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { PopoverShare } from "@/components/popover-share"
import { LoadingCard } from "@/components/loading-card"
import { ArrowBack } from "@/components/arrow-back"
import Image from "next/image"

export default function Page({ params: { id } }: ContextProps) {

    const {
        data: post, isLoading
    } = useQuery({
        queryKey: ["get-post-by-id"],
        queryFn: async () => getPostById(id)
    })

    if (!post || isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <LoadingCard className="p-6 w-2/3" />
        </div>
    )

    const { title, text, createdAt, bannerUrl } = post

    const createdAtFormated = format(createdAt, "PPPP")

    return (
        <div className="min-h-screen flex flex-col items-center">
            <ArrowBack className="p-4"/>
            <Card
                key={id}
                className="w-2/3 overflow-hidden"
            >
                {
                    bannerUrl &&
                    <Image
                        src={bannerUrl}
                        width={1000}
                        height={200}
                        alt="image-post"
                        className="size-full"
                    />
                }
                <CardHeader>
                    <div
                        className="w-full flex items-center justify-between"
                    >
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <PopoverShare post={post} />
                    </div>
                    <CardDescription>
                        {createdAtFormated}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {text}
                </CardContent>
            </Card>
        </div>
    )
}