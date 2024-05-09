"use client";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { ROOM } from "../../../db/schema";
import { generateTokenAction } from "./action";
import { useRouter } from "next/navigation";

const apiKey = "yq9hchcp973d";
console.log(apiKey);
//"yq9hchcp973d"
//process.env.NEXT_STREAM_API_KEY!

export const DevFinderVideo = ({ room }: { room: ROOM }) => {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const token = useMemo(() => generateTokenAction(), []);
  const router = useRouter();
  console.log(generateTokenAction());
  useEffect(() => {
    if (!room) return;
    if (!session.data) {
      return;
    }
    const userId = session.data.user.id;
    const clientInstance = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => token,
    });
    setClient(clientInstance);
    if (!client) {
      <p className="font-[500] leading-[21px] text-xl"></p>;
    }
    const call = clientInstance.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      call
        .leave()
        .then(() => clientInstance.disconnectUser())
        .catch(console.error);
    };
  }, [session, room, token]);
  if (!call || !client) return null;

  return (
    call &&
    client && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push("/")} />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
};
