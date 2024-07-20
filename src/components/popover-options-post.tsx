import { Ellipsis, Pen, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export const DialogOptionsPost = () => {
    return (
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
                <Button variant="ghost">
                    <Pen />
                </Button>
                <Button variant="ghost">
                    <Trash />
                </Button>
            </PopoverContent>
        </Popover>
    )
}