import { TvMinimal } from "lucide-react";
import React from "react";
import StartVideoCall from "../components/StartVideoCall";

const VideoChatHomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen container">
      <TvMinimal className="h-36 w-36 mb-4" />
      <h1 className="text-4xl font-bold text-center">
        Video calls and meetings for everyone
      </h1>
      <p>Connect, collaborate, and celebrate from anywhere</p>

      <StartVideoCall />
    </div>
  );
};

export default VideoChatHomeScreen;
