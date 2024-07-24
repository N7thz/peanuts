"use client"

import { useState } from "react"
import { FormLoginType } from "@/@types"
import { getCredentialUser } from "@/hooks/use-service"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { FormLoginRegister } from "./form-login-register"

export const Login = () => {

    const { push } = useRouter()

    const [isError, setIsError] = useState<boolean>(false)

    function login(data: FormLoginType) {
        getCredentialUser(data)
            .then(res => {
                const { data: { token }, status } = res

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

    return <FormLoginRegister functionPage={login} isError={isError} />
}
