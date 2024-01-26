"use client";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string
}

const NavigationItem = (
    {
        id,
        imageUrl,
        name
    }: NavigationItemProps
) => {
    const params = useParams();
    const router = useRouter();


    const onClick = () => {
        router.push(`/servers/${id}`)
    }


    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button onClick={onClick}
                className="group relative flex items-center mx-1  mb-3"
            >
                <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[2px]",
                    params.serverId !== id && "group-hover:h-[20px]:",
                    params.serverId == id ? "h-[36px]" : "h-[8px]",

                )} />
                <div className={cn("relative group flex mx-2 h-[50px] w-[50px] rounded-[16px] transition-all overflow-hidden",
                    params.serverId === id && "bg-primary/10 text-primary rounded-full"
                )}>
                    <Image
                        fill
                        src={imageUrl}
                        alt="image"
                        className=""
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}

export default NavigationItem;