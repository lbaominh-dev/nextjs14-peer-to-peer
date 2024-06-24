"use client";

import { SquarePlay } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import TransitionLink from "../../../components/common/TransitionLink";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const DEFAULT_ROOM_ID = "let_me_in";

const StartVideoCall = () => {
  const router = useTransitionRouter();

  const [roomId, setRoomId] = useState<string>(DEFAULT_ROOM_ID);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomId) return;

    router.push(`/room/${roomId}`);
  };

  return (
    <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
      <div className="relative">
        <SquarePlay className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          required
          name="zoomId"
          type="search"
          placeholder="Enter zoom id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="pl-10 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>

      <Button type="submit">Start Video Call</Button>
    </form>
  );
};

export default StartVideoCall;
