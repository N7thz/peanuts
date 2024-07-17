export default function Loading() {
    return (
        <div className="min-h-screen relative">
            <div
                className="absolute h-1/3 w-full top-0 animate-pulse bg-secondary"
            />
            <div
                className="absolute h-2/3 w-full bottom-0 animate-pulse bg-background"
            />
        </div>
    )
}