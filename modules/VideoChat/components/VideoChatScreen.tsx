"use client";

import { useVideoChat } from "../hooks/useVideoChat";
import VideoPlayer from "./VideoPlayer";

type Props = {};

const VideoChatScreen = (props: Props) => {
  const { local, remote } = useVideoChat();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <VideoPlayer stream={local.stream} muted />
      {Object.keys(remote).map((id) => (
        <VideoPlayer key={id} stream={remote[id].stream} />
      ))}
    </div>
  );
};

export default VideoChatScreen;
