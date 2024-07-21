import { Button } from "./ui/button"
import { DeletePostButtonProps } from "@/@types"
import { deletePost } from "@/hooks/use-service"

export const DeletePostButton = ({ 
    post, setIsDeleted , setIsNotDeleted
}: DeletePostButtonProps) => {

    const { createdAt } = post

    function erasePost(createdAt: Date) {
        deletePost(createdAt)
            .then(res => {
                const { status } = res

                if (status == 200) {
                    setIsDeleted(true)
                    setTimeout(() => setIsDeleted(false), 2000)
                } else {
                    setIsNotDeleted(true)
                    setTimeout(() => setIsNotDeleted(false), 2000)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Button
            className="w-1/2 gap-2"
            onClick={() => erasePost(createdAt)}
        >
            Confirm
        </Button>
    )
}
