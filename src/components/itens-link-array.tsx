import { ItemLinkArrayProps } from "@/@types"
import { twMerge } from "tailwind-merge"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const ItemLinkArray = ({
    fields, remove, register, errors
}: ItemLinkArrayProps) => {
    return (
        <div className="w-full max-h-[300px] flex flex-col gap-4">
            {
                fields.map((field, index) => {
                    const { id } = field
                    return (
                        <div
                            key={id}
                            className="p-1 w-full flex flex-col gap-3"
                        >
                            <div
                                className="w-full flex justify-between items-center"
                            >
                                <Label>
                                    {index === 0 ? "Link" : `Link ${index + 1}`}
                                </Label>
                                <Button
                                    size="icon"
                                    className="p-1 size-8"
                                    onClick={() => remove(index)}
                                >
                                    <X />
                                </Button>
                            </div>
                            <div
                                className="w-full flex flex-col gap-4"
                            >
                                <Input
                                    {...register(`links.${index}.title`)}
                                    placeholder="title link"
                                    className={twMerge(
                                        errors.links?.[index]?.title && "border-destructive"
                                    )}
                                />
                                <Input
                                    {...register(`links.${index}.link`)}
                                    placeholder="link"
                                    className={twMerge(
                                        errors.links?.[index]?.link && "border-destructive"
                                    )}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}