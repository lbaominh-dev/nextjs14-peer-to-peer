"use client";

import TransitionLink from "@/components/common/TransitionLink";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MicIcon,
  MicOffIcon,
  PhoneOff,
  SettingsIcon,
  ShrinkIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useRef } from "react";
import { useVideoChat } from "../hooks/useVideoChat";

type Props = {};

const CallControl = (props: Props) => {
  const { local, toggleAudio, toggleVideo, leave } = useVideoChat();

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = containerRef.current?.children ?? [];
    const timeline = gsap.timeline();

    timeline.from(items, {
      delay: 0.8,
      opacity: 0,
      y: 50,
      stagger: {
        each: 0.1,
        from: "center"
      },
      ease: "back.out(1.7)",
    });
  });

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex gap-4 items-center" ref={containerRef}>
        <Button size={"icon"}>
          <ShrinkIcon />
        </Button>
        <Button size={"icon"} onClick={toggleAudio}>
          {local.audioEnabled ? <MicIcon /> : <MicOffIcon />}
        </Button>
        <Button asChild size="iconLarge" variant={"destructive"}>
          <TransitionLink href={"/"}>
            <PhoneOff />
          </TransitionLink>
        </Button>
        <Button size="icon" onClick={toggleVideo}>
          {local.videoEnabled ? <VideoIcon /> : <VideoOffIcon />}
        </Button>
        <Button size="icon">
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
};

export default CallControl;
