import { Button } from "./ui/button"
import { DeletePostButtonProps } from "@/@types"
import { deletePost } from "@/hooks/use-service"
import { Post } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const DeletePostButton = ({
    post, setIsDeleted, setIsNotDeleted
}: DeletePostButtonProps) => {

    const { id } = post
    const { push } = useRouter()
    const queryClient = useQueryClient()

    const {
        mutateAsync: deletePostMutation,
        isPending
    } = useMutation({
        mutationFn: async () => {
            erasePost(id)
        },
        onSuccess: () => {
            queryClient.setQueryData(["get-all-posts"], (posts: Post[]) => {
                return posts.filter(post => post.id !== id)
            })

            push("/")
        },
        onError(error) {
            console.log(error)
        },
    })

    function erasePost(id: string) {
        deletePost(id)
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
            className="w-1/2"
            disabled={isPending}
            onClick={() => deletePostMutation()}
        >
            Confirm
        </Button>
    )
}
