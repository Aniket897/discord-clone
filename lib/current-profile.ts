import { auth } from "@clerk/nextjs";
import { db } from "./db";

const CurrentProfile = () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const profile = db.profile.findUnique({
        where: {
            userId,
        }
    });

    return profile;
}

export default CurrentProfile;