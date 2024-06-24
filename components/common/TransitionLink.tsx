"use client";

import { animatePageOut } from "@/lib/gsap";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type TransitionLinkProps = React.PropsWithChildren<LinkProps>;

const TransitionLink: React.FC<TransitionLinkProps> = (props) => {
  const { href, children, ...restProps } = props;

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href === pathname) {
      return;
    }

    animatePageOut(() => router.push(href as string));
  };

  return (
    <Link {...restProps} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TransitionLink;
