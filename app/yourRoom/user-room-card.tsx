"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROOM } from "@/db/schema";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import TagList from "@/components/tag-list";
import splitTags from "@/app/data-access/tag";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "../yourRoom/action";

export function UserRoomCard({ room }: { room: ROOM }) {
  console.log("room", room)
  return (
    <Card className="rounded-xl shadow-lg cursor-pointer">
      <CardHeader className="relative">
        <Button className="absolute top-2 right-2" size="icon">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tagLanguage={splitTags(room.tagsLanguage)} />
        {room.github && (
          <Link
            href={room.github}
            className="flex items-center gap-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 p-3">
        <Button asChild>
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} className='border-[2px] border-gray-200 py-5 px-3 rounded-xl'>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white text-black'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='rounded-xl border-[2px] border-gray-300'>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className=' bg-red-600 text-white rounded-xl hover:bg-red-400'
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
