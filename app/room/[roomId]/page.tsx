import React from "react";
import { getRoom } from "../../data-access/room";
import { LuGithub } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import TagList from "../../../components/tag-list";
import splitTags from "./../../data-access/tag";
import { DevFinderVideo } from "./video-player";

export default async function page(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    return (
      <Image
        alt="not-found-room"
        src="/Room_notfound.jpg"
        height="100"
        width="100"
        className="min-h-screen"
      />
    );
  }
  return (
    <div className="xl:grid xl:grid-cols-4 flex flex-col  min-h-screen">
      <div className="col-span-3 p-5 pl-2">
        <div className="border  border-gray-300 drop-shadow-lg rounded-xl p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className="cols-span-1 p-4 pl-2">
        <div className="border p-3 border-gray-300 drop-shadow-lg rounded-xl flex flex-col gap-3">
          <h1 className="text-xl self-center">{room?.name}</h1>
          <div className="flex gap-1 self-center">
            <LuGithub className="my-auto" />
            {room.github && (
              <Link href={room.github}>
                <div className="border-b border-gray-700">Github Link</div>
              </Link>
            )}
          </div>
          <p className="text-base font-[400] pb-2 border-b border-gray-200">
            {room?.description}
          </p>
          {room?.tagsLanguage && (
            <TagList tagLanguage={splitTags(room?.tagsLanguage)} />
          )}
        </div>
      </div>
    </div>
  );
}
