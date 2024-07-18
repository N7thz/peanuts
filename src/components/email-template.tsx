import { FC } from "react"
import {
    Card, CardContent,CardHeader, CardTitle
} from "@/components/ui/card"
import { SendEmailRequest } from "@/@types"

export const EmailTemplate: FC<Readonly<SendEmailRequest>> = ({
    subject, message
}) => {
    return (
        <Card
            className="w-full border-2 border-primary drop-shadow-xl"
        >
            <CardHeader>
                <CardTitle>
                    {subject}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {message}
            </CardContent>
        </Card>
    )
}
