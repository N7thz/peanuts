import { PostCardProps } from "@/@types"
import { format } from "date-fns"
import { Ellipsis } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./ui/card"
import { Button } from "./ui/button"
import { useImage } from "@/context/image-provider"
import Image from "next/image"
import { DialogOptionsPost } from "./popover-options-post"

export const PostCard = ({ post }: PostCardProps) => {

    const { id, title, text, bannerUrl, createdAt } = post

    const createdAtFormated = format(createdAt, "PPPP")

    const { user } = useImage()

    return (
        <Card key={id}>
            {
                bannerUrl
                    ? <Image
                        src={bannerUrl}
                        width={1000}
                        height={200}
                        alt="image-post"
                        className="w-full h-[300px] object-cover"
                    />
                    : <div
                        className="w-full h-[300px] bg-secondary animate-pulse"
                    />
            }
            <CardHeader>
                <div className="w-full flex items-center justify-between">
                    <CardTitle>
                        {title}
                    </CardTitle>
                    {
                        user &&
                        <DialogOptionsPost />
                    }
                </div>
                <CardDescription>
                    {createdAtFormated}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {text}
            </CardContent>
        </Card>
    )
}
