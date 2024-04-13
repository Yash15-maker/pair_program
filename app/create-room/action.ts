"use server";
import { db } from "../../db";
import { ROOM, room } from "../../db/schema";
import { getSession } from "../../lib/auth";

export async function createRoomAction(roomData: Omit<ROOM, "id" | "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("You Must be logged in t create this room");
  }
  //   const room=await c
  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
