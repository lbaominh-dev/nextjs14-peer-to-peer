"use client";

import useSocket from "@/hooks/useSocket";
import useUserMedia from "@/hooks/useUserMedia";
import Peer, { PeerOptions } from "peerjs";
import React, { useCallback, useEffect } from "react";

type UserMediaContextType = {
  id: string;
  stream: MediaStream | null;
  audioEnabled: boolean;
  videoEnabled: boolean;
};

type VideoCallContextType = {
  join: () => void;
  leave: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;

  local: UserMediaContextType;
  remote: Record<string, UserMediaContextType>;
};

type VideoCallProviderProps = React.PropsWithChildren<{
  roomId: string;
  id: string;
  peerOptions?: PeerOptions;
}>;

export const VideoCallContext = React.createContext<
  VideoCallContextType | undefined
>(undefined);

const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
  roomId,
  id,
  peerOptions,
  children,
}) => {
  const [localPeer, setLocalPeer] = React.useState<Peer | null>(null);

  const [isJoined, setIsJoined] = React.useState(false);
  const [remote, setRemote] = React.useState<
    Record<string, UserMediaContextType>
  >({});
  const [peers, setPeers] = React.useState<{ [key: string]: any }>({});

  const socket = useSocket(window.location.origin);
  const userMedia = useUserMedia({
    audio: true,
    video: true,
  });

  const [local, setLocal] = React.useState<UserMediaContextType>({
    id,
    stream: null,
    audioEnabled: true,
    videoEnabled: true,
  });

  const connectUser = (userId: string, stream: MediaStream) => {
    const call = localPeer?.call(userId, stream);
    setPeers((prevPeers) => ({ ...prevPeers, [userId]: call! }));

    call?.on("stream", (userVideoStream) => {
      addRemote(userId, userVideoStream);
    });
    call?.on("close", () => {
      setRemote((prevRemote) => {
        delete prevRemote[userId];
        return { ...prevRemote };
      });
    });
  };

  const disconnectUser = (userId: string) => {
    const call = peers[userId];
    call?.close();
    delete peers[userId];
    setPeers({ ...peers });

    setRemote((prevRemote) => {
      delete prevRemote[userId];
      return { ...prevRemote };
    });
  };

  const addRemote = (userId: string, stream: MediaStream) => {
    setRemote((prevRemote) => ({
      ...prevRemote,
      [userId]: {
        id: userId,
        stream: stream,
        audioEnabled: true,
        videoEnabled: true,
      },
    }));
  };

  const updateRemoteVideo = (userId: string, enabled: boolean) => {
    setRemote((prevRemote) => ({
      ...prevRemote,
      [userId]: {
        ...prevRemote[userId],
        videoEnabled: enabled,
      },
    }));
  };
  const updateRemoteAudio = (userId: string, enabled: boolean) => {
    setRemote((prevRemote) => ({
      ...prevRemote,
      [userId]: {
        ...prevRemote[userId],
        audioEnabled: enabled,
      },
    }));
  };

  const join = useCallback(() => {
    if (!socket || isJoined || !userMedia.stream || !localPeer) return;

    setLocal((prev) => ({
      ...prev,
      stream: userMedia.stream,
    }));
    setIsJoined(true);

    localPeer?.on("call", (call) => {
      call.answer(userMedia.stream!);
      call.on("stream", (userVideoStream) => {
        addRemote(call.peer, userVideoStream);
      });
    });

    localPeer?.on("open", (id) => {
      console.log("My peer ID:", id);
      socket?.emit("join-room", roomId, id);
    });

    socket.on("user-connected", (userId: string) => {
      console.log(userId, "connected");
      connectUser(userId, userMedia.stream!);
    });
    socket.on("user-disconnected", disconnectUser);
    socket.on("toggle-video", updateRemoteVideo);
    socket.on("toggle-audio", updateRemoteAudio);
  }, [socket, isJoined, userMedia.stream, localPeer, roomId]);

  const leave = () => {
    localPeer?.disconnect();
    localPeer?.destroy();
    socket?.emit("leave-room", roomId);
  };
  const toggleAudio = () => {
    if (!userMedia.stream) return;

    userMedia.stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    socket?.emit("toggle-audio", id, !local.audioEnabled);
    setLocal((prev) => ({
      ...prev,
      audioEnabled: !prev.audioEnabled,
    }));
  };
  const toggleVideo = () => {
    if (!userMedia.stream) return;

    userMedia.stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    socket?.emit("toggle-video", id, !local.videoEnabled);

    setLocal((prev) => ({
      ...prev,
      videoEnabled: !prev.videoEnabled,
    }));
  };

  const initLocalPeer = () => {
    if (localPeer) return;

    const peer = new Peer(id, peerOptions);

    setLocalPeer(peer);
  };

  useEffect(() => {
    join();
  }, [join]);

  useEffect(() => {
    userMedia.start();
    initLocalPeer();
  }, []);

  useEffect(() => {
    return () => {
      localPeer?.disconnect();
      localPeer?.destroy();
    };
  }, [localPeer]);

  const value = {
    join,
    leave,
    toggleAudio,
    toggleVideo,
    local,
    remote,
  };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
};

export default VideoCallProvider;
