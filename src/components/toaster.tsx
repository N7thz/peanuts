import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Animation } from "./animation"
import { twMerge } from "tailwind-merge"
import { ToasterProps } from "@/@types"

export const Toaster = ({
    toaster_message, toaster_title, variant, className, children
}: ToasterProps) => {
    return (
        <Animation
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: .5 }}
        >
            <Alert
                variant={variant}
                className={twMerge(
                    "w-[400px] flex justify-center items-center normal-case drop-shadow-2xl z-50 bg-zinc-50 dark:bg-zinc-950",
                    className
                )}
            >
                <span className="mr-3">
                    {children}
                </span>
                <div>
                    <AlertTitle className="capitalize">
                        {toaster_title}
                    </AlertTitle>
                    <AlertDescription>
                        {toaster_message}
                    </AlertDescription>
                </div>
            </Alert>
        </Animation>
    )
}
