import { FormLogin } from "@/components/form-login"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Peanuts blog | Login"
}

export default function Page() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-background"
        >
            <FormLogin />
        </div>
    )
}
