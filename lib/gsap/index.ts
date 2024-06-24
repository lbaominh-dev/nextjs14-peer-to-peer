import gsap from "gsap";

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  const banners = [bannerOne, bannerTwo, bannerThree, bannerFour];

  if (banners.length !== 4) return;

  const tl = gsap.timeline();

  tl.set(banners, { yPercent: 0 }).to(banners, { yPercent: 100, stagger: 0.2 });
};

export const animatePageOut = (cb: () => void) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  const banners = [bannerOne, bannerTwo, bannerThree, bannerFour];

  if (banners.length !== 4) return;

  const tl = gsap.timeline();

  tl.set(banners, { yPercent: -100 }).to(banners, {
    yPercent: 0,
    stagger: 0.2,
    onComplete: cb,
  });
};
