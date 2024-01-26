import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "./ui/tooltip";



interface TooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "right" | "left" | "bottom";
    align?: "start" | "center" | "end"
}


export const ActionTooltip = (
    {
        label,
        children,
        side,
        align
    }: TooltipProps
) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="capitalize">{label.toLocaleLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}