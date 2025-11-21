import { cn } from "@/lib/utils"

export function ContentHeader({
    title,
    description,
    className,
}: {
    title: string
    description?: string
    className?: string
}) {
    return (
        <div className={cn("flex flex-col space-y-1", className)}>
            <h1 className="text-4xl font-medium leading-tight tracking-wide mb-1 mt-2">{title}</h1>
            {description && (
                <p className="text-muted-foreground text-lg">{description}</p>
            )}
        </div>
    )
}