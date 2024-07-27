"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const ArrowBack = ({ className }: ComponentProps<"div">) => {

    const { back } = useRouter()

    return (

        <div className={twMerge(
            "w-full h-14 flex justify-start items-center",
            className
        )}>
            <button onClick={back}>
                <ArrowLeft
                    size={24}
                    className="cursor-pointer"
                />
            </button>
        </div>
    )
}
