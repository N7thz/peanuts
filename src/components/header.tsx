"use client"

import { useState } from "react"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { DialogImageAvatar } from "./dialog-image-avatar"
import { useImage } from "@/context/image-provider"
import { getBanner } from "@/hooks/use-service"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export const Header = () => {

    const { user } = useImage()
    const { refresh } = useRouter()

    if (!user) refresh()

    const options = [
        "Mais recentes",
        "Mais antigos",
        "Opçoes"
    ]

    const [isSelect, setIsSelect] = useState<string>(options[0])

    const {
        data: banner, isLoading
    } = useQuery({
        queryKey: ["get-banner"],
        queryFn: getBanner
    })

    if (!banner || isLoading) return (
        <div className="bg-secondary animate-pulse w-full h-[340px]" />
    )

    return (
        <header className="h-1/4 w-full relative">
            <Image
                src={banner}
                width={1000}
                height={500}
                alt="banner image"
                className="w-full h-[340px]"
                unoptimized
            />
            <CardHeader>
                <CardTitle className="text-4xl">
                    Peanuts Blog
                </CardTitle>
                <CardDescription>
                    A blog about projects and studys
                </CardDescription>
            </CardHeader>
            <nav className="px-6">
                <ul className="flex gap-3">
                    {options.map((option) =>
                        <li
                            key={option}
                            className="relative cursor-pointer group"
                            onClick={() => setIsSelect(option)}
                        >
                            <span className="group-hover:text-violet-300">
                                {option}
                            </span>
                            {
                                isSelect === option &&
                                <motion.div
                                    layoutId="underline"
                                    className="absolute -bottom-px -left-px -right-px h-0.5 bg-violet-700"
                                />
                            }
                        </li>
                    )}
                </ul>
            </nav>
            {user && <DialogImageAvatar />}
        </header>
    )
}