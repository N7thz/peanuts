import { Metadata } from "next"
import { Register } from "@/components/register"

export const metadata: Metadata = {
    title: "Peanuts blog | register"
}

export default function Page() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-background"
        >
            <Register />
        </div>
    )
}
