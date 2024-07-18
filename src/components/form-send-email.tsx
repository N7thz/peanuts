"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { Check, XCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormContactSchema } from "@/schemas"
import { useService } from "@/hooks/use-service"
import { FormContactType } from "@/@types"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Toaster } from "./toaster"

export const FormSendEmail = () => {

    const [isSend, setIsSend] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const { sendEmail } = useService()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormContactType>({
        resolver: zodResolver(FormContactSchema)
    })

    async function formSendEmail(data: FormContactType) {

        if (!isSend) {

            const { message, subject } = data

            setIsSend(true)

            sendEmail({ message, subject })
                .then(res => {
                    const { status } = res

                    if (status == 200) {

                        setIsOpen(true)

                        reset()

                        setTimeout(() => setIsOpen(false), 2000)
                    } else {

                        setIsError(true)

                        setTimeout(() => setIsError(false), 2000)
                    }
                })
        } else {

            const timeout = 1000 * 60 * 10 // timeout for send email

            setIsError(true)
            setTimeout(() => setIsError(false), 2000)
            setTimeout(() => setIsSend(false), timeout)
        }
    }

    return (
        <Card className="w-full capitalize drop-shadow-lg relative 2xl:w-11/12">
            <CardHeader>
                <CardTitle>
                    get in touch
                </CardTitle>
                <CardDescription className="normal-case">
                    send an email regarding professional contacts, feedback and etc...
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(formSendEmail)}>
                <CardContent className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <Label className="pl-2">
                            subject
                        </Label>
                        <Input
                            className={
                                errors.subject &&
                                "border-2 border-red-600 placeholder:text-red-600 italic"
                            }
                            placeholder={
                                errors.subject
                                    ? errors.subject.message
                                    : "enter the contact subject..."
                            }
                            {...register("subject")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="pl-2">
                            message
                        </Label>
                        <Textarea
                            className={twMerge(
                                "max-h-[400px]",
                                errors.message &&
                                "border-2 border-red-600 placeholder:text-red-600 italic"
                            )}
                            placeholder={
                                errors.message
                                    ? errors.message.message
                                    : "type your message..."
                            }
                            {...register("message")}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        variant={"outline"}
                        className="scale-125 border-primary hover:scale-105 duration-300"
                    >
                        Send
                    </Button>
                </CardFooter>
            </form>
            {
                isOpen &&
                <Toaster
                    toaster_title="sucess"
                    toaster_message="The email has been sent successfully."
                    variant="default"
                    className="border border-primary"
                >
                    <Check />
                </Toaster>
            }
            {isError &&
                <Toaster
                    toaster_title="error"
                    toaster_message="An error occurred while sending the email."
                    variant="destructive"
                >
                    <XCircle />
                </Toaster>
            }
        </Card>
    )
}
