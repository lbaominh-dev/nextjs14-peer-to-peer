import React from "react";

type VideoPlayerProps = {
  stream: MediaStream | null;
  muted?: boolean;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, muted }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!stream || !videoRef.current) return;
    videoRef.current!.srcObject = stream;
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current?.play();
    });
  }, [stream]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <video
        className="w-full h-full bg-slate-500 object-cover"
        ref={videoRef}
        muted={muted}
      />
    </div>
  );
};

export default VideoPlayer;
