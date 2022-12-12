import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function textFeadIn() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".js-feadIn-text").forEach((target) => {
    gsap.from(target, {
      scrollTrigger: {
        trigger: target,
        start: "top 80%",
        toggleActions: "restart none none none",
        //markers: true,
      },
      opacity: 0,
      yPercent: 30,
    });
  });
}
