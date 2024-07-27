"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Eye, EyeOff, XCircle } from "lucide-react"
import { FormLoginType } from "@/@types"
import { FormLoginSchema } from "@/schemas"
import { Toaster } from "./toaster"
import { usePathname } from "next/navigation"

export interface FormLoginProps {
    functionPage: (data: FormLoginType) => void
    isError: boolean
}

export const FormLoginRegister = ({
    functionPage, isError
}: FormLoginProps) => {

    const pathname = usePathname() as "/register" | "/login"

    const [isVisible, setIsVisible] = useState<boolean>(true)

    const Icon = isVisible ? Eye : EyeOff

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormLoginType>({
        resolver: zodResolver(FormLoginSchema)
    })

    return (
        <>
            <form onSubmit={handleSubmit(functionPage)}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {pathname === "/register" ? "Register" : "Login"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label className="mb-2">Email</Label>
                            <Input {...register("email")} />
                            {
                                errors.email &&
                                <span className="mt-2 text-destructive">
                                    {errors.email.message}
                                </span>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="mb-2">Password</Label>
                            <div className="relative">
                                <Input
                                    type={isVisible ? "password" : "text"}
                                    {...register("password")}
                                />
                                <Icon
                                    className="absolute top-[34%] right-2 size-4"
                                    onClick={() => setIsVisible(!isVisible)}
                                />
                            </div>
                            {
                                errors.password &&
                                <span className="mt-2 text-destructive">
                                    {errors.password.message}
                                </span>
                            }
                        </div>
                        <div className="w-full flex justify-end">
                            <Button type="submit">
                                Confirm
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
            {
                isError &&
                <Toaster
                    variant="destructive"
                    toaster_title="Error"
                    toaster_message={
                        pathname === "/register"
                            ? "Admin already exist"
                            : "Invalid email or password"
                    }
                    className="absolute bottom-4 right-4"
                >
                    <XCircle />
                </Toaster>
            }
        </>
    )
}
