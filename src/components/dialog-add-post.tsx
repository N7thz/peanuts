import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { FormAddPost } from "./form-add-post"
import { ScrollArea } from "./ui/scroll-area"

export const DialogAddPost = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-full py-4 flex justify-end">
                    <Button className="w-1/4">
                        Add post
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-4">
                <ScrollArea className="h-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Post</DialogTitle>
                        <DialogDescription>
                            Add a post for everybody see
                        </DialogDescription>
                    </DialogHeader>
                    <FormAddPost />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
