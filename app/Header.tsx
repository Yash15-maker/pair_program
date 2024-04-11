"use client";
import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../components/ui/button";

export const Header = () => {
  const session = useSession(); //Check whether the user login or not
  return (
    <header>
      <div className="w-full flex justify-between">
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sing In</Button>
        )}
        <ModeToggle />
        {session?.data?.user?.name}
      </div>
    </header>
  );
};
