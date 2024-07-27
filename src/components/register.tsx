"use client"

import { useState } from "react"
import { FormLoginType } from "@/@types"
import { postUser } from "@/hooks/use-service"
import { useRouter } from "next/navigation"
import { FormLoginRegister } from "./form-login-register"

export const Register = () => {

    const { push } = useRouter()

    const [isError, setIsError] = useState<boolean>(false)

    function register(data: FormLoginType) {
        postUser(data)
            .then(res => {
                const { status } = res

                if (status === 200) {
                    push("/login")
                }
            })
            .catch(() => {
                setIsError(true)
                setTimeout(() => setIsError(false), 2000)
            })
    }

    return <FormLoginRegister functionPage={register} isError={isError} />
}
