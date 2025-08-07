import { useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CanvasWrapper from "./CanvasWrapper";

function GPUSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inReveal, setInReveal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    return smoothScroll.on("change", (v) => {
      setInReveal(v >= 0.95);
    });
  }, [smoothScroll]);

  return (
    <div>
      {/* <div style={{ height: "20vh" }} /> */}

      <div
        ref={sectionRef}
        className={`canvas-section z-10 ${inReveal ? "reveal" : ""}`}
      >
        <CanvasWrapper />
      </div>
    </div>
  );
}

export default GPUSection;
