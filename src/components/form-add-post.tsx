/* eslint-disable @next/next/no-img-element */
import { useForm, useFieldArray } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card } from "./ui/card"
import { ErrorSpan } from "./error-span"
import { FormAddPostType } from "@/@types"
import { FormAddPostSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ItemLinkArray } from "./itens-link-array"
import { createPost } from "@/hooks/use-service"
import { useRouter } from "next/navigation"

export const FormAddPost = () => {

    const { refresh } = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm<FormAddPostType>({
        resolver: zodResolver(FormAddPostSchema)
    })

    const { fields, append, remove } = useFieldArray({
        name: "links",
        control
    })

    const url = watch("image_url") ?? "/images/cat.webp"

    function addPost(data: FormAddPostType) {

        createPost(data)
            .then(res => {
                const { status } = res

                if (status === 200) {
                    refresh()
                }
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
            <ItemLinkArray
                errors={errors}
                fields={fields}
                register={register}
                remove={remove}
            />
            <div className="w-full flex gap-5">
                <Button
                    type="button"
                    className="w-1/2 flex items-center justify-center gap-2"
                    onClick={() => append({ title: "", link: "" })}
                    disabled={fields.length === 1}
                >
                    <span>Add links</span>
                    <ExternalLink className="size-4" />
                </Button>
                <Button
                    type="submit"
                    className="w-1/2"
                >
                    Confirm
                </Button>
            </div>
        </form>
    )
}