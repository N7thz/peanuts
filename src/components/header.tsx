"use client"

import { useState } from "react"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DialogImageAvatar } from "./dialog-image-avatar"
import { useImage } from "@/context/image-provider"
import Image from "next/image"

export const Header = () => {

    const { user } = useImage()

    const options = [
        "Mais recentes",
        "Mais antigos",
        "Opçoes"
    ]

    const [isSelect, setIsSelect] = useState<string>(options[0])

    return (
        <header className="h-1/4 w-full relative">
            <Image
                src={"/images/banner.gif"}
                width={1000}
                height={500}
                alt="banner image"
                className="size-full"
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