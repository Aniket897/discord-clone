"use client";

import { X } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-model-store";



const NavigationAction = () => {

    const {onOpen } = useModal();
    return (
        <div>
            <ActionTooltip
                label="crete a sever"
                side="right"
                align="center"
            >
                <button 
                    onClick={() => onOpen("createServer")}
                    className="group">
                    <div className="flex mx-3 h-[50px] w-[50px] items-center justify-center transition-all rounded-[16px] bg-neutral-200 dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <X className="text-emerald-500 group-hover:text-white transition" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}

export default NavigationAction;