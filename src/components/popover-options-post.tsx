import { useState } from "react"
import { Check, Ellipsis, Pen, Trash, XCircle } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { PostProps } from "@/@types"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { DialogOptionsPost } from "./dialog-options-post"
import { DeletePostButton } from "./delete-post-button"
import { Toaster } from "./toaster"
import { FormUpdatePost } from "./form-update-post"

export const PopoverOptionsPost = ({ post }: PostProps) => {

    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [isNotDeleted, setIsNotDeleted] = useState<boolean>(false)
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const [isNotUpdated, setIsNotUpdated] = useState<boolean>(false)

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost">
                        <Ellipsis />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    className="flex gap-3"
                >
                    <DialogOptionsPost
                        title={post.title}
                        description="update a post"
                        trigger={
                            <Button variant="ghost">
                                <Pen />
                            </Button>
                        }
                    >
                        <ScrollArea className="max-h-[500px]">
                            <FormUpdatePost
                                post={post}
                                setIsUpdated={setIsUpdated}
                                setIsNotUpdated={setIsNotUpdated}
                            />
                        </ScrollArea>
                    </DialogOptionsPost>
                    <DialogOptionsPost
                        title={post.title}
                        description="delete a post"
                        trigger={
                            <Button variant="ghost">
                                <Trash />
                            </Button>
                        }
                    >
                        <Card className="border-none" >
                            <CardHeader>
                                <CardTitle className="text-destructive">
                                    Are you sure you want to delete this post?
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex justify-end gap-4">
                                <DeletePostButton
                                    post={post}
                                    setIsDeleted={setIsDeleted}
                                    setIsNotDeleted={setIsNotDeleted}
                                />
                            </CardFooter>
                        </Card>
                    </DialogOptionsPost>
                </PopoverContent>
            </Popover>
            {
                isDeleted &&
                <Toaster
                    toaster_title="Deleted"
                    toaster_message="The post is deleted."
                    variant="default"
                    className={twMerge(
                        "absolute bottom-5 right-2 z-[150] border border-primary",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <Check />
                </Toaster>
            }
            {
                isNotDeleted &&
                <Toaster
                    toaster_title="error"
                    toaster_message="An error occurred while delete a post."
                    variant="destructive"
                    className={twMerge(
                        "absolute bottom-5 right-2 z-[150] border border-primary",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <XCircle />
                </Toaster>
            }
            {
                isUpdated &&
                <Toaster
                    toaster_title="Updated"
                    toaster_message="The post is updated."
                    variant="default"
                    className={twMerge(
                        "absolute bottom-5 right-2 z-[150] border border-primary",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <Check />
                </Toaster>
            }
            {
                isNotUpdated &&
                <Toaster
                    toaster_title="error"
                    toaster_message="An error occurred while delete a post."
                    variant="destructive"
                    className={twMerge(
                        "absolute bottom-5 right-2 z-[150] border border-primary",
                        "xl:-bottom-[190px] xl:-right-[560px]"
                    )}
                >
                    <XCircle />
                </Toaster>
            }
        </>
    )
}