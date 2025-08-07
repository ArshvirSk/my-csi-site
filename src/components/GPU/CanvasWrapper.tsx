import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import GPUModel from "./GPUModel";
import ScrollRotateCamera from "./ScrollRotateCamera";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftLineVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rightLineVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CanvasWrapper() {
  const ref = useRef<HTMLElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [shouldReveal, setShouldReveal] = useState(false);

  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } =
    useScroll({
      target: ref,
      offset: ["start start", "end end"],
    });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Track scroll value and update state reactively
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    setShouldReveal(latest >= 0.95);
  });

  const [showLogo, setShowLogo] = useState(false);

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    // simulate scroll range from 0 to ~1.15
    const scaledScroll = latest * 1.15;

    setShouldReveal(scaledScroll >= 0.95);

    // 🔥 Only show logo after holding at final position for 50vh worth of scroll
    setShowLogo(scaledScroll >= 1.1);
  });

  return (
    <section ref={ref} className="gpu-canvas-wrapper">
      {!modelLoaded && (
        <div className="gpu-status-text">
          <p>Preparing GPU...</p>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="gpu-canvas">
        <Canvas camera={{ position: [6, 6, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <ScrollRotateCamera scrollProgress={smoothScroll} />
          <GPUModel
            scrollProgress={smoothScroll}
            onLoad={() => setModelLoaded(true)}
          />
        </Canvas>
      </div>

      {/* Animated Side Text */}
      <motion.div
        className="gpu-reveal-text"
        variants={containerVariants}
        initial="hidden"
        animate={shouldReveal ? "visible" : "hidden"}
      >
        {/* LEFT SIDE */}
        <motion.div
          className="left-group space-y-8"
          variants={containerVariants}
        >
          <motion.div
            className="left-text text-left max-w-sm"
            variants={leftLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              About CSI
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Computer Society of India (CSI) is a premier professional body
              dedicated to the advancement of computer science and information
              technology in India.
            </p>
          </motion.div>

          <motion.div
            className="left-text text-left max-w-sm"
            variants={leftLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              CSI Vision
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              To be a leading organization in fostering the growth of computer
              science and information technology in India.
            </p>
          </motion.div>

          <motion.div
            className="left-text text-left max-w-sm"
            variants={leftLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              Collaboration
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              We collaborate with educational institutions, industry leaders,
              and government bodies to promote knowledge sharing and innovation.
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="right-group space-y-8"
          variants={containerVariants}
        >
          <motion.div
            className="right-text text-right max-w-sm ml-auto"
            variants={rightLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              Student Chapter & Events
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Our student chapters organize events, workshops, and seminars to
              enhance learning and networking opportunities for students.
            </p>
          </motion.div>

          <motion.div
            className="right-text text-right max-w-sm ml-auto"
            variants={rightLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Journey
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Since our inception, we have been at the forefront of promoting
              computer science education and research in India.
            </p>
          </motion.div>

          <motion.div
            className="right-text text-right max-w-sm ml-auto"
            variants={rightLineVariants}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">
              Impact & Innovation
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Through our initiatives, we aim to drive innovation and create a
              positive impact in the field of computer science.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      {showLogo && (
        <motion.img
          src="/logo-nobg.png"
          alt="CSI SFIT Logo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-60"
        />
      )}
    </section>
  );
}
