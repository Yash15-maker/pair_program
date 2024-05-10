import { unstable_noStore } from "next/cache";
import { db } from "../../db";
import { eq, like } from "drizzle-orm";
import { ROOM, room } from "../../db/schema";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  //For caching
  unstable_noStore();
  const where = search ? like(room.tagsLanguage, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  //For caching
  unstable_noStore();

  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function getUserRoom() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const roomUser = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return roomUser;
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function editRoom(roomData: ROOM) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}