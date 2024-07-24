"use client"

import { api, getAuthorization } from "@/hooks/use-service"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    use,
    useContext,
    useEffect,
    useState
} from "react"

interface ImageContextProps {
    user?: User
    avatarUrl: string | null
    setAvatarUrl: Dispatch<SetStateAction<string | null>>
}

const ImageContext = createContext({} as ImageContextProps)

export function ImageProvider({ children }: { children: ReactNode }) {

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const { data: user } = useQuery({
        queryKey: ["get-authorization"],
        queryFn: async () => {

            const url = "/get-authorization"

            const response: User = await api.get(url)
                .then(res => res.data)
                .catch(err => console.log(err))

            return response
        }
    })

    const value: ImageContextProps = {
        user,
        avatarUrl, setAvatarUrl
    }

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    )
}

export const useImage = () => useContext(ImageContext)