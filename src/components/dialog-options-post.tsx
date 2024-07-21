import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { twMerge } from "tailwind-merge"
import { DialogOptionsPostProps } from "@/@types"

export const DialogOptionsPost = ({
    trigger, className, children, title, description
}: DialogOptionsPostProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={twMerge(
                "sm:max-w-[425px]",
                className
            )}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {
                        description &&
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    }
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}