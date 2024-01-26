import { db } from "@/lib/db";
import CurrentProfile from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await CurrentProfile();

        // cheking if user or not
        if (!profile) {
            return new NextResponse("user unauthorize", {
                status: 400
            })
        }

        // if user creating a new server

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {
                            name: "general",
                            profileId: profile.id
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN
                        }
                    ]
                }
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}