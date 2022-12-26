import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

export default function fead_In() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    ".js-feadIn-area .js-feadIn-item",
    { autoAlpha: 0, y: 25 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: {
        each: 0.5,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".js-feadIn-area",
        start: "top 12%",
        toggleActions: "play none none reverse",
      },
    }
  );
}