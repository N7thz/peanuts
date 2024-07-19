import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { CardAddImage } from "./card-add-image"
import { Button } from "./ui/button"
import { FormAddPost } from "./form-add-post"

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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Post</DialogTitle>
                    <DialogDescription>
                        Add a post for everybody see
                    </DialogDescription>
                </DialogHeader>
                <FormAddPost />
            </DialogContent>
        </Dialog>
    )
}
