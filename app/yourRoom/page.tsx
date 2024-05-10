import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRoom } from "@/app/data-access/room";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function page() {
  unstable_noStore();
  const UserRooms = await getUserRoom();

  console.log(UserRooms.map(itr => itr.github))
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {UserRooms.length <= 0 ? <div className='relative h-screen w-full'>
          <div id="bg-image" className='absolute inset-0 bg-cover bg-center z-0'></div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="2xl:text-5xl lg:text-2xl text-xl">No Rooms build the room</span>
          </div>
        </div>
          : (UserRooms.map((room) => {
            return <UserRoomCard key={room.id} room={room} />;
          }))}
      </div>
    </main>
  );
}
