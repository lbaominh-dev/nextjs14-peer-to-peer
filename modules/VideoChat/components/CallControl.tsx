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
    const items = Array.from(containerRef.current?.children ?? []);
    const middle = Math.floor(items.length / 2);

    const tlLeft = gsap.timeline();
    const tlMiddle = gsap.timeline();
    const tlRight = gsap.timeline();

    const animation = {
      delay: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "back.out(1.7)",
    };

    const left = items.slice(0, middle).reverse();
    const right = items.slice(middle + 1);

    tlLeft.from(left, {
      ...animation,
      delay: 1,
    });
    tlMiddle.from(items[middle], animation);
    tlRight.from(right, {
      ...animation,
      delay: 1,
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
