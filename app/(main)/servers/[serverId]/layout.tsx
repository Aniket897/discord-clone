import ServerSidebar from "@/components/server/server-sidebar";
import CurrentProfile from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({ children, params }: {
    children: React.ReactNode,
    params: { serverId: string }
}) => {

    const profile = await CurrentProfile();

    if (!profile) {
        redirect('/')
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    if (!server) {
        return redirect('/')
    }


    return (
        <div className="h-full w-full flex">
            <div className="hidden md:flex w-60 z-20 flex-col inset-y-0 fixed">
                <ServerSidebar serverId={server.id} />
            </div>
            <div className="pl-60 h-full">
                {children}
            </div>
        </div>
    )
}

export default ServerIdLayout;