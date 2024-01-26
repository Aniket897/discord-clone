import CurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";

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
        <div className="flex py-2 flex-col space-y-4 w-full text-primary dark:bg-[#1E1F22]">
            <NavigationAction />
        </div>
    )
}

export default NavSidebar;