import {
    Popover, PopoverTrigger, PopoverContent
} from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import {
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon,
} from 'next-share'
import { Link, LoaderCircle } from "lucide-react"
import { getLinkById } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@prisma/client"

export const PopoverShare = ({ post: { linkId: id } }: { post: Post }) => {

    const {
        data: linkResponse, isLoading
    } = useQuery({
        queryKey: ["get-link-by-id"],
        queryFn: async () => getLinkById(id)
    })

    if (!linkResponse || isLoading) return (
        <LoaderCircle className="animate-spin" />
    )

    const { title } = linkResponse

    const link = `https://peanuts-livid.vercel.app/posts/${id}`

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <Link />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="bg-background flex gap-3 border-2 p-3 rounded-lg  z-50"
            >
                <FacebookShareButton
                    url={link}
                    quote={title}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TelegramShareButton
                    url={link}
                    title={title}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TwitterShareButton
                    url={link}
                    title={title}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={link}
                    title={title}
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={link}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </PopoverContent>
        </Popover>
    )
}
