import CurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from '@/components/ui/separator'
import NavigationAction from "./navigation-action";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavSidebar = async () => {
    const profile = await CurrentProfile();
    // if user not authenticated redirecting to '/'
    if (!profile) {
        redirect('/')
    }

    // finding all servers where user id a memeber
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    return (
        <div className="flex py-2 flex-col space-y-4 w-full text-primary dark:bg-[#1E1F22] border-r shadow-sm">
            <NavigationAction />
            <Separator className="border w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server, index) => {
                    return (
                        <div key={index}>
                            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                        </div>
                    )
                })}
            </ScrollArea>
            <div className="pb-3 mt-auto flex flex-col items-center gap-y-4">
                <ModeToggle/>
                <UserButton/>
            </div>
        </div>
    )
}

export default NavSidebar;