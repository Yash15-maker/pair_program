"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { deleteAccountAction } from "./action";
import {
  Menubar,

  MenubarContent,
  MenubarItem,
  MenubarMenu,

  MenubarTrigger,
} from "@/components/ui/menubar"

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-[2px] border-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-400 rounded-xl "
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {session.data?.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="pt-2 dark:bg-gray-700 bg-gray-200 pl-3 cursor-pointer">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-gray-200 py-2 dark:bg-gray-900 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/icon-program-finder.png"
            width={isMobile ? "30" : "50"}
            height={isMobile ? "30" : "50"}
            alt="the icon of dev finder"
          />
          {isMobile ? <span className="text-[14px]">DevFinder</span> : "DevFinder"}
        </Link>
        {isMobile && <div className='flex gap-1.5'><Menubar><MenubarMenu >
          <MenubarTrigger className="border-b-[2px] pb-0.5 border-gray-200 rounded-xl p-0 text-[14px]">{session.data?.user.name}</MenubarTrigger>
          <MenubarContent className="bg-white shadow-sm rounded-xl">
            <MenubarItem>
              <Link className="hover:underline" href="/yourRoom">
                Your Rooms
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link className="hover:underline" href="/view">
                Browse
              </Link>


            </MenubarItem>
            {/* <MenubarSeparator />
            <ModeToggle />
            <MenubarSeparator /> */}

            <MenubarItem>
              <Button onClick={() => signIn()} variant="link" className="py-1 px-0.5">
                <LogInIcon className="mr-2 text-[10px]" /> Sign In
              </Button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu></Menubar>
          <ModeToggle /></div>}

        {!isMobile && <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/view">
                Browse
              </Link>

              <Link className="hover:underline" href="/yourRoom">
                Your Rooms
              </Link>
            </>
          )}
        </nav>}

        {!isMobile && <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>}
      </div>
    </header >
  );
}
