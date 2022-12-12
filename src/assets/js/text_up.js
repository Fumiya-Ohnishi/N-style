import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function textUP() {
  const text_up = () => {
    const text__ups = document.querySelectorAll(".js-text-up-item");
    gsap.registerPlugin(ScrollTrigger);

    text__ups.forEach((text__up, i) => {
      gsap.fromTo(
        text__up,
        {
          opacity: 0.1,
          y: "110%",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: ".js-text-up",
            start: "top center+=300",
            end: "top center+=300",
            once: true,
          },
        }
      );
    });
  };
  text_up();
}
