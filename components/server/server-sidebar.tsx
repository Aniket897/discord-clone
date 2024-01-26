import CurrentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannerType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

const ServerSidebar = async ({ serverId }: {
    serverId: string
}) => {
    const profile = await CurrentProfile();

    if (!profile) {
        redirect('/')
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: 'asc'
                }
            }
        }
    });

    if(!server){
        redirect('/')
    }

    // getting all channels from server
    const textChannels = server.channels.filter(channel => channel.type === ChannerType.TEXT)
    const audioChannels = server.channels.filter(channel => channel.type === ChannerType.AUDIO)
    const videoChannels = server.channels.filter(channel => channel.type === ChannerType.VIDEO)

    // getting all members from server by filtering current user
    const members = server.members.filter(member => member.profileId !== profile.id);

    // getting current user role
    const role = server.members.find(member => member.profileId === profile.id)?.role;

    
    return (
        <div className="flex flex-col h-full text-primary w-full bg-[#F2F3F5] dark:bg-[#2B2D31]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}

export default ServerSidebar;