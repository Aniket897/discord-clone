"use client";

import { X } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";



const NavigationAction = () => {
    return (
        <div>
            <ActionTooltip
                label="crete a sever"
                side="right"
                align="center"
            >
                <button className="group">
                    <div className="flex mx-3 h-[50px] w-[50px] items-center justify-center transition-all rounded-[16px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <X className="text-emerald-500 group-hover:text-white transition" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}

export default NavigationAction;