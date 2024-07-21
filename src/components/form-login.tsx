"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useRouter } from "next/navigation"
import { getCredentialUser } from "@/hooks/use-service"
import { FormLoginType } from "@/@types"
import { setCookie } from "cookies-next"
import { AlertError } from "./alert-error"
import { FormLoginSchema } from "@/schemas"

export const FormLogin = () => {

    const [animationParent] = useAutoAnimate()
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const { push } = useRouter()

    const Icon = isVisible ? Eye : EyeOff

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormLoginType>({
        resolver: zodResolver(FormLoginSchema)
    })

    console.log(errors)

    async function login(data: FormLoginType) {

        getCredentialUser(data)
            .then(res => {
                const { data: { token }, status } = res

                console.log(token)

                if (status === 200) {
                    setCookie("token", token)

                    push("/")
                }
            })
            .catch(() => {
                setIsError(true)
                setTimeout(() => setIsError(false), 2000)
            })
    }

    return (
        <>
            <form
                ref={animationParent}
                onSubmit={handleSubmit(login)}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
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
                <AlertError message="Invalid email or password" />
            }
        </>
    )
}
