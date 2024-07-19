import { ComponentProps } from "react"
import { Info } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface ErrorSpanProps extends ComponentProps<"div"> {
    message: string | undefined
}

export const ErrorSpan = ({ message, className }: ErrorSpanProps) => {

    return (
        <div className={twMerge(
            "w-full flex items-center gap-2 my-3 text-red-500",
            className
        )}>
            <Info
                size={16}
                color="red"
                className="w-1/12"
            />
            <span className="w-11/12 text-red-500">
                {message}
            </span>
        </div>
    )
}
