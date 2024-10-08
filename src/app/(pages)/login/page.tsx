import { Metadata } from "next"
import { Login } from "@/components/login"

export const metadata: Metadata = {
    title: "Peanuts blog | Login"
}

export default function Page() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-background"
        >
            <Login />
        </div>
    )
}
