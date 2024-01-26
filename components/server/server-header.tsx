"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";


interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole
}


const ServerHeader = (
    {
        server,
        role
    }: ServerHeaderProps
) => {
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role === MemberRole.MODERATOR;
    const { onOpen } = useModal()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
            >
                <button className="w-full text-md border-b-2 font-semibold px-3 flex justify-between items-center h-12 border-b-neutral-200 dark:border-b-neutral-900">
                    {server?.name}
                    <ChevronDown />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-1">
                {(isModerator || isAdmin) && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 hover:bg-neutral-300 dark:hover:bg-neutral-800 justify-between cursor-pointer"
                        onClick={() => onOpen("invite", { server })}
                    >
                        Invite People
                        <UserPlus size={18} />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
                        onClick={() => onOpen("editServer", { server })}
                    >
                        Server Settings
                        <Settings size={18} />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer">
                        Manage Members
                        <Users size={18} />
                    </DropdownMenuItem>
                )}
                {(isModerator || isAdmin) && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer">
                        Create Channel
                        <PlusCircle size={18} />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer text-red-500">
                        Delete Server
                        <Trash size={18} />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer">
                        Leave Server
                        <LogOut size={18} />
                    </DropdownMenuItem>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader;