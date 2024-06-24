"use client";

import { useMemo } from "react";
import VideoCallProvider from "../context/VideoCall";
import CallControl from "./CallControl";
import VideoChatScreen from "./VideoChatScreen";
import { v4 as uuid } from "uuid";
import { peerOptions } from "../config";

const VideoChatRoom = ({ roomId }: { roomId: string }) => {
  const id = useMemo(() => uuid(), []);

  return (
    <VideoCallProvider roomId={roomId} id={id} peerOptions={peerOptions}>
      <VideoChatScreen />
      <CallControl />
    </VideoCallProvider>
  );
};

export default VideoChatRoom;
