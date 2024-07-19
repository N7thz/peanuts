import { Header } from "@/components/header"
import { Main } from "@/components/main"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-3 bg-background">
      <Header />
      <Main />
    </div>
  )
}
