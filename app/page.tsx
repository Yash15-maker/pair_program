import React from "react";
import { db } from "../db";
import { LuGithub } from "react-icons/lu";
import { Button } from "../components/ui/button";
import { CiBookmarkPlus } from "react-icons/ci";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROOM } from "../db/schema";
import { getRooms } from "./data-access/room";

const CardRoom = ({ room }: { room: ROOM }) => {
  return (
    <Card className="shadow-sm rounded-2xl bg-slate-100 dark:bg-gray-200 text-center">
      <CardHeader className="my-auto  p-3">
        <CardTitle className="p-3">{room.name}</CardTitle>
        <CardDescription className="p-3 text-2xl">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 my-auto pt-3 px-3 justify-center">
        <LuGithub className="my-auto" />
        <div className="my-auto">{room.github}</div>
      </CardContent>
      <CardFooter className="flex justify-center my-auto h-fit">
        <Link href={`/room/${room.id}`}>
          <Button className="shadow-sm bg-purple-500 dark:bg-gray-300 text-white rounded-3xl hover:bg-purple-400">
            Room
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

async function page() {
  const items = await db.query.testingSchema.findMany();
  const rooms = await getRooms();
  return (
    <div className="container mx-auto min-h-screen">
      {/* {items.map((item) => {
        return <div>{item.name}</div>;
      })} */}
      {/* {rooms.map((room) => {
        return (
          <div key={room.id}>
            <span>{room.description}</span>
          </div>
        );
      })} */}
      <div className="flex justify-between items-center pt-4">
        <h1 className="text-3xl">Find the Room</h1>
        <Button
          className="border border-gray-200 rounded-2xl cursor-pointer bg-white text-black hover:text-white"
          asChild
        >
          <Link href="/create-room" className="flex gap-1">
            Create the Button
            <CiBookmarkPlus className="text-2xl" />
          </Link>
        </Button>
      </div>
      <div className="grid pt-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {rooms ? (
          rooms?.map((room) => {
            return <CardRoom room={room} key={room.id} />;
          })
        ) : (
          <h2>Kindly Create or browse to enjoy</h2>
        )}
      </div>
    </div>
  );
}

export default page;
