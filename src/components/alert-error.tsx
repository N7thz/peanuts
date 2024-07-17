import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const AlertError = ({ message }: { message: string }) => {
    return (
        <Alert
            variant="destructive"
            className="w-1/3 absolute bg-background z-50 top-12 left-auto right-auto"
        >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    )
}
