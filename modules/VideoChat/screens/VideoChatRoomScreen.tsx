import React from "react";
import VideoChatRoom from "../components/VideoChatRoom";

type Props = { roomId: string };

const VideoChatRoomScreen = (props: Props) => {
  return <VideoChatRoom roomId={props.roomId} />;
};

export default VideoChatRoomScreen;
