"use client";

import { useContext } from "react";
import { VideoCallContext } from "../context/VideoCall";

export const useVideoChat = () => {
  const context = useContext(VideoCallContext);

  if (!context) {
    throw Error("No document passed to DocumentProvider");
  }

  return context;
};
