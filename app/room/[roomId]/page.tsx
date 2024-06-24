import dynamic from "next/dynamic";

const VideoChatRoomScreen = dynamic(
  () => import("@/modules/VideoChat/screens/VideoChatRoomScreen"),
  {
    ssr: false,
  }
);

const Room = ({ params }: { params: { roomId: string } }) => {
  if (!params.roomId) return <div>Missing Room ID</div>;

  return <VideoChatRoomScreen roomId={params.roomId as string} />;
};

export default Room;
