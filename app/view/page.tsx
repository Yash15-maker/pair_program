import React from "react";
import { LuGithub } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import { CiBookmarkPlus } from "react-icons/ci";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROOM } from "../../db/schema";
import { getRooms } from "../data-access/room";
import TagList from "../../components/tag-list";
import splitTags from "../data-access/tag";
import { getSession } from "../../lib/auth";
import SearchBar from "./SearchBar";
import Image from "next/image";

const CardRoom = ({ room }: { room: ROOM }) => {
  return (
    <Card className="shadow-lg rounded-2xl text-center">
      <CardHeader className="my-auto p-3">
        <CardTitle className="pt-3 px-3">{room.name}</CardTitle>
        <CardDescription className="pt-3 px-3">
          {room.description}
        </CardDescription>
      </CardHeader>
      <div className="flex gap-2 my-auto p-3 justify-center">
        <LuGithub className="my-auto" />
        {room.github && (
          <Link href={room.github}>
            <div className="my-auto border-b border-gray-700">Github Link</div>
          </Link>
        )}
      </div>
      <div className="self-center w-full flex justify-center py-2 capitalize">
        <TagList tagLanguage={splitTags(room.tagsLanguage)} />
      </div>
      <div className="flex justify-center my-auto h-fit p-3">
        <Link href={`/room/${room.id}`}>
          <Button className="shadow-sm bg-purple-500 dark:bg-gray-300 text-white rounded-3xl hover:bg-purple-400">
            Room
          </Button>
        </Link>
      </div>
    </Card>
  );
};

async function page({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const rooms = await getRooms(searchParams.search);
  const session = await getSession();
  return (
    <div className="container flex flex-col mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl mb-2">Find the Room</h1>
        <Button
          className="border border-gray-200 rounded-2xl cursor-pointer bg-white "
          asChild
        >
          {session?.user.name !== undefined ? (
            <Link href="/create-room" className="flex gap-1 dark:bg-black">
              Create the Button
              <CiBookmarkPlus className="text-2xl" />
            </Link>
          ) : (
            <h1 className="flex gap-1 dark:bg-black">Please Sign In</h1>
          )}
        </Button>
      </div>
      <SearchBar />
      <div className="grid pt-4 lg:grid-cols-2  grid-cols-1 gap-3">
        {rooms.length !== null && session ? (
          rooms?.map((room) => {
            return <CardRoom room={room} key={room.id} />;
          })
        ) : (
          <div className="flex flex-col gap-2">
            {session ? <Image
              src="/items_not.jpg"
              height="90"
              width="100"
              alt="Not=found-image"
            /> : <><div className="overlay"></div>

              <div className="text">
                <div className="wrapper">
                  <div id="L" className="letter">S</div>
                  <div className="shadow">S</div>
                </div>
                <div className="wrapper">
                  <div id="I" className="letter">I</div>
                  <div className="shadow">I</div>
                </div>
                <div className="wrapper">
                  <div id="G" className="letter">G</div>
                  <div className="shadow">G</div>
                </div>
                <div className="wrapper">
                  <div id="H" className="letter">N</div>
                  <div className="shadow">N</div>
                </div>
                <div className="wrapper">
                  <div id="T" className="letter">I</div>
                  <div className="shadow">I</div>
                </div>
                <div className="wrapper">
                  <div id="N" className="letter">N</div>
                  <div className="shadow">N</div>
                </div>
                <div className="wrapper">
                  <div id="E" className="letter">D</div>
                  <div className="shadow">D</div>
                </div>
                <div className="wrapper">
                  <div id="S" className="letter">O</div>
                  <div className="shadow">O</div>
                </div>
                <div className="wrapper">
                  <div id="Stwo" className="letter">N</div>
                  <div className="shadow">N</div>
                </div>
                <div className="wrapper">
                  <div id="Stwo" className="letter">E</div>
                  <div className="shadow">E</div>
                </div>
                <div className="wrapper">
                  <div id="Stwo" className="letter">?</div>
                  <div className="shadow">?</div>
                </div>
              </div></>}
          </div>

        )}
      </div>
    </div>
  );
}

export default page;
