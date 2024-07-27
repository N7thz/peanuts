import { useState } from "react"
import { updateImageAvatar } from "@/hooks/use-service"
import { Check, X, XCircle } from "lucide-react"
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
import { ErrorSpan } from "./error-span"
import { Toaster } from "./toaster"
import { twMerge } from "tailwind-merge"
import { useRouter } from "next/navigation"

export const FormAddImage = () => {

    const { setAvatarUrl, avatarUrl, user } = useImage()
    const { refresh } = useRouter()

    const src = user!.avatarUrl ?? "/images/cat.webp"

    const [url, setUrl] = useState<string>(src)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const isUrlValid = (
        url !== undefined &&
        url !== "" &&
        url !== "/images/cat.webp"
    )

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<FormAddImageType>({
        resolver: zodResolver(FormAddImageSchema)
    })

    async function updateImageAdim() {

        if (!avatarUrl) return

        const { email } = user!

        updateImageAvatar({ avatarUrl, email })
            .then(res => {
                const { status, data } = res

                if (status == 200) {

                    setIsOpen(true)

                    reset()

                    setTimeout(() => setIsOpen(false), 2000)
                    setTimeout(() => refresh(), 3000)
                } else {

                    setIsError(true)

                    setTimeout(() => setIsError(false), 2000)
                }
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
                            defaultValue={url}
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
                    {
                        errors.url &&
                        <ErrorSpan message={errors.url.message} />
                    }
                    <AvatarAdmin
                        src={url}
                        fallBack={
                            isUrlValid
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
            {
                isOpen &&
                <Toaster
                    toaster_title="success"
                    toaster_message="The email has been sent successfully."
                    variant="default"
                    className={twMerge(
                        "absolute -bottom-[140px] -right-[300px] z-50 border border-primary ",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <Check />
                </Toaster>
            }
            {
                isError &&
                <Toaster
                    toaster_title="error"
                    toaster_message="An error occurred while sending the email."
                    variant="destructive"
                    className={twMerge(
                        "absolute -bottom-[140px] -right-[300px] z-50 border border-primary ",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <XCircle />
                </Toaster>
            }
        </>
    )
}

