"use client";

import { animatePageIn } from "@/lib/gsap";
import React, { use, useEffect } from "react";

type TemplateProps = React.PropsWithChildren<{}>;

const Template: React.FC<TemplateProps> = ({ children }) => {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-0 w-1/4"
        id="banner-1"
      ></div>
      <div
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-1/4 w-1/4"
        id="banner-2"
      ></div>
      <div
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-2/4 w-1/4"
        id="banner-3"
      ></div>
      <div
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-3/4 w-1/4"
        id="banner-4"
      ></div>
      {children}
    </div>
  );
};

export default Template;
