import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { AvatarAdmin } from "./avatar-admin"
import { FormAddImage } from "./form-add-image"
import { useImage } from "@/context/image-provider"

export const DialogImageAvatar = () => {

    const { user } = useImage()

    if (!user || !user.avatarUrl) return

    const src = user.avatarUrl

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <AvatarAdmin
                        src={src}
                        fallBack="AD"
                        className="absolute top-3 right-3 cursor-pointer hover:scale-125 duration-200"
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Avatar</DialogTitle>
                    <DialogDescription>
                        Add a image for your avatar
                    </DialogDescription>
                </DialogHeader>
                <FormAddImage />
            </DialogContent>
        </Dialog>
    )
}
