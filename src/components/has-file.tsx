import { X } from "lucide-react"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { HasFileProps } from "@/@types"

export const HasFile = ({ file, setFile, className }: HasFileProps) => {

    const url = URL.createObjectURL(file)

    return (

        <div className={twMerge(
            "border-2 border-zinc-300 m-auto rounded-full flex items-center justify-center overflow-hidden relative group",
            className
        )}>
            <Image
                src={url}
                width={170}
                height={170}
                alt="image-user"
                className="w-full h-full"
            />
            <X
                className="absolute center-icons invisible group-hover:visible text-zinc-500 cursor-pointer"
                onClick={() => setFile(null)}
            />
        </div>
    )
}