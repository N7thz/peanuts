import { FormEvent, useState } from "react"
import { useService } from "@/hooks/use-service"
import { getCookie } from "cookies-next"
import { Check, X } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { AvatarAdmin } from "./avatar-admin"
import { useImage } from "@/context/image-provider"
import { FormAddImageType } from "@/@types"
import { FormAddImageSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from "./ui/card"
import { DialogFooter } from "./ui/dialog"

export const CardAddImage = () => {

    const { setAvatarUrl, avatarUrl, user } = useImage()
    
    const [url, setUrl] = useState<string>(user?.avatarUrl!)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<FormAddImageType>({
        resolver: zodResolver(FormAddImageSchema),
        defaultValues: {
            url: user?.avatarUrl!
        }
    })

    console.log(errors)

    const { updateImageAvatar } = useService()

    async function updateImageAdim() {

        if (!avatarUrl) return

        const email = getCookie("email") as string

        updateImageAvatar({ avatarUrl, email })
            .then(res => {
                const { status, data } = res

                console.log(data)
            })
            .catch(err => console.log(err))
    }

    function addImage(data: FormAddImageType) {

        if (url) {
            setUrl("")
        } else {
            setAvatarUrl(watch("url"))
            setUrl(watch("url"))
            reset()
        }
    }

    return (
        <>
            <Card
                className="py-8 w-full flex flex-col justify-center gap-2 border-none"
            >
                <form
                    onSubmit={handleSubmit(addImage)}
                    className="flex flex-col gap-4 items-center"
                >
                    <div className="w-full flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Enter the url of the image..."
                            className="py-0"
                            {...register("url")}
                        />
                        <Button
                            size="icon"
                            type="submit"
                        >
                            {url ? <X /> : <Check />}
                        </Button>
                    </div>
                    <AvatarAdmin
                        src={url}
                        fallBack={
                            (url !== undefined && url !== "")
                                ? `${url[0]}${url[1]}`
                                : "AA"
                        }
                        className="size-[160px] my-4 dark:border-white border-border border-2"
                    />
                </form>
            </Card>
            <DialogFooter>
                <Button onClick={updateImageAdim}>
                    Save changes
                </Button>
            </DialogFooter>
        </>
    )
}

