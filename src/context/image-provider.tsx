"use client"

import { useService } from "@/hooks/use-service"
import { User } from "@prisma/client"
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

interface ImageContextProps {
    avatarUrl: string | null
    setAvatarUrl: Dispatch<SetStateAction<string | null>>
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

const ImageContext = createContext({} as ImageContextProps)

export function ImageProvider({ children }: { children: ReactNode }) {

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const { getAuthorization } = useService()

    useEffect(() => {
        getAuthorization({ setUser })
            .then(res => {
                const { status, data: user } = res

                if (status === 200) setUser(user)
            })
            .catch(err => console.log(err))
    }, [])

    const value: ImageContextProps = {
        avatarUrl, setAvatarUrl,
        user, setUser
    }

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    )
}

export const useImage = () => useContext(ImageContext)