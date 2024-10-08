import { PostProps } from "@/@types"
import { format } from "date-fns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./ui/card"
import { PopoverOptionsPost } from "./popover-options-post"
import { useImage } from "@/context/image-provider"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const PostCard = ({ post }: PostProps) => {

    const { id, title, text, bannerUrl, createdAt } = post

    const createdAtFormated = format(createdAt, "PPPP")

    const { user } = useImage()
    const { push } = useRouter()

    return (
        <Card
            key={id}
            className="overflow-hidden hover:scale-95 duration-300 cursor-pointer"
            onClick={() => push(`/posts/${id}`)}
        >
            {
                bannerUrl &&
                <Image
                    src={bannerUrl}
                    width={1000}
                    height={200}
                    alt="image-post"
                    className="w-full h-[300px] object-cover"
                />
            }
            <CardHeader>
                <div className="w-full flex items-center justify-between">
                    <CardTitle>
                        {title}
                    </CardTitle>
                    {
                        user &&
                        <PopoverOptionsPost post={post} />
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
