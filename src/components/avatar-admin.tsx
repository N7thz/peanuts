import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User, X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { AvatarAdminProps } from "@/@types"
import { useImage } from "@/context/image-provider"

export const AvatarAdmin = ({ className, src, fallBack }: AvatarAdminProps) => {

    return (
        <Avatar className={twMerge(
            "flex items-center justify-center",
            className
        )}>
            {
                (src !== undefined && src !== "")
                    ? <>
                        <AvatarImage
                            src={src}
                            className="size-full"
                            alt="image-avatar-admin"
                        />
                        <AvatarFallback>
                            {fallBack}
                        </AvatarFallback>
                    </>
                    : <div className="bg-background rounded-full p-2 size-full">
                        <User className="aspect-square size-full" />
                    </div>
            }
        </Avatar>
    )
}
