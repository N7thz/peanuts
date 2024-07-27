/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card } from "./ui/card"
import { ErrorSpan } from "./error-span"
import { FormUpdatePostType } from "@/@types"
import { FormUpdatePostSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePost } from "@/hooks/use-service/posts"
import { Post } from "@prisma/client"

export const FormUpdatePost = ({ post: { id } }: { post: Post }) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormUpdatePostType>({
        resolver: zodResolver(FormUpdatePostSchema)
    })

    const url = watch("image_url") ?? "/images/cat.webp"

    function addPost(data: FormUpdatePostType) {

        console.log(data)

        updatePost(data, id)
            .then(res => {
                const { status } = res

                if (status === 200) window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const isUrlExist = !url || url === ""

    return (
        <form
            onSubmit={handleSubmit(addPost)}
            className="flex flex-col items-end gap-5 mt-4 p-2"
        >
            <div className="w-full flex flex-col gap-3">
                <Label>Image url</Label>
                <Input
                    {...register("image_url")}
                    placeholder="Type a image url"
                />
                {
                    errors.image_url &&
                    <ErrorSpan message={errors.image_url.message} />
                }
            </div>
            <Card className={twMerge(
                "size-full flex items-center justify-center",
                url === "/images/cat.webp" && "animate-pulse"
            )}>
                <img
                    src={isUrlExist ? "/images/cat.webp" : url}
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
            <div className="w-full flex flex-col gap-3">
                <Label>Title Link</Label>
                <Input
                    {...register("title_link")}
                    placeholder="title link"
                    className={twMerge(
                        errors.title_link && "border-destructive"
                    )}
                />
                {
                    errors.title_link &&
                    <ErrorSpan message={errors.title_link.message} />
                }
            </div>
            <div className="w-full flex flex-col gap-3">
                <Label>Link</Label>
                <Input
                    {...register("link")}
                    placeholder="link"
                    className={twMerge(
                        errors.link && "border-destructive"
                    )}
                />
                {
                    errors.link &&
                    <ErrorSpan message={errors.link.message} />
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