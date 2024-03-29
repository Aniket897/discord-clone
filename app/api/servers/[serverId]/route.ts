import CurrentProfile from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function PATCH(req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await CurrentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Inauthorized", {
                status: 401
            })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json({
            server
        })
    } catch (error) {
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}