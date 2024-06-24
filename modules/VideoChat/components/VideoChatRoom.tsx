"use client";

import { useMemo } from "react";
import VideoCallProvider from "../context/VideoCall";
import CallControl from "./CallControl";
import VideoChatScreen from "./VideoChatScreen";
import { v4 as uuid } from "uuid";

const VideoChatRoom = ({ roomId }: { roomId: string }) => {
  const id = useMemo(() => uuid(), []);

  return (
    <VideoCallProvider roomId={roomId} id={id}>
      <h1 className="text-center font-bold text-6xl py-2">HD Family</h1>
      <VideoChatScreen />
      <CallControl />
    </VideoCallProvider>
  );
};

export default VideoChatRoom;
