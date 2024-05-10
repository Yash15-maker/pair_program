"use server";

import { editRoom, getRoom } from "@/app/data-access/room";
import { ROOM } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<ROOM, "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create this room");
    }

    const room = await getRoom(roomData.id);

    if (room?.userId !== session.user.id) {
        throw new Error("User not authorized");
    }

    await editRoom({ ...roomData, userId: room.userId });

    revalidatePath("/yourRoom");
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect("/yourRoom");
}