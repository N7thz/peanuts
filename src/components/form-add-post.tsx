/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card } from "./ui/card"
import { FormAddPostType } from "@/@types"
import { FormAddPostSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { ErrorSpan } from "./error-span"
import { twMerge } from "tailwind-merge"
import { empty } from "@prisma/client/runtime/library"

export const FormAddPost = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormAddPostType>({
        resolver: zodResolver(FormAddPostSchema)
    })

    const url = watch("image_url") ?? "/images/cat.webp"

    function addPost(data: FormAddPostType) {

        console.log(data)
    }

    console.log(url)

    console.log(errors)

    return (
        <form
            onSubmit={handleSubmit(addPost)}
            className="flex flex-col items-end gap-5 mt-4"
        >
            <div className="w-full flex flex-col gap-3">
                <Label>Image url</Label>
                <Input
                    {...register("image_url")}
                    placeholder="Type a image url"
                />
            </div>
            <Card className={twMerge(
                "size-full flex items-center justify-center",
                url === "/images/cat.webp" && "animate-pulse"
            )}>
                <img
                    src={
                        (!url || url === "")
                            ? "/images/cat.webp" : url
                    }
                    alt="image-preview"
                    className={twMerge(
                        "h-32 rounded-md",
                        url === "/images/cat.webp"
                            ? "w-1/2 self-center"
                            : "w-full object-cover"
                    )}
                />
            </Card>
            <div className="w-full flex flex-col gap-3">
                <Label>Title</Label>
                <Input
                    {...register("title")}
                    placeholder="Type a title of post"
                    className={twMerge(errors.text && "border-destructive")}
                />
                {
                    errors.title &&
                    <ErrorSpan message={errors.title.message} />
                }
            </div>
            <div className="w-full flex flex-col gap-3">
                <Label>Text</Label>
                <Textarea
                    {...register("text")}
                    placeholder="Type a post"
                    className={twMerge(errors.text && "border-destructive")}
                />
                {
                    errors.text &&
                    <ErrorSpan message={errors.text.message} />
                }
            </div>
            <Button
                type="submit"
                className="w-1/2"
            >
                Confirm
            </Button>
        </form>
    )
}
