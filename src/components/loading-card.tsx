import { Card, CardHeader, CardContent } from "./ui/card"

export const LoadingCard = () => {
    return (
        <Card
            className="m-6 min-h-[480px] animate-pulse overflow-hidden"
        >
            <CardHeader
                className="bg-secondary min-h-[300px] animate-pulse"
            />
            <CardContent
                className="my-6 ml-3 w-11/12 h-8 rounded-full bg-secondary animate-pulse"
            />
        </Card>
    )
}
