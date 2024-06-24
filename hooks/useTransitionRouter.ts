import { animatePageOut } from "@/lib/gsap";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export const useTransitionRouter = () => {
  const router = useRouter();

  const push = (href: string, options?: NavigateOptions | undefined) => {
    animatePageOut(() => router.push(href, options));
  };

  const replace = (href: string, options?: NavigateOptions | undefined) => {
    animatePageOut(() => router.replace(href, options));
  };

  return {
    ...router,
    push,
    replace,
  };
};
