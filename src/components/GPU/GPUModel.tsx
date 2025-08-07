import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Define the props for the GPUModel component
interface GPUModelProps {
  scrollProgress: MotionValue<number>; // Framer Motion's MotionValue for scroll progress
  onLoad?: () => void; // Optional callback when the model is loaded
}

// Define the expected structure of the GLTF result from useGLTF
type GLTFResult = {
  nodes: Record<string, THREE.Object3D>; // Dictionary of named 3D objects
  materials: Record<string, THREE.Material>; // Dictionary of named materials
  scene: THREE.Group; // The main scene group of the GLTF model
  animations: THREE.AnimationClip[]; // Array of animation clips
};

export default function GPUModel({ scrollProgress, onLoad }: GPUModelProps) {
  // Ref for the outer group, used for overall positioning of the model
  const outerGroup = useRef<THREE.Group>(null);
  // Ref for the mesh group, used for scaling the actual model content
  const meshGroup = useRef<THREE.Group>(null);

  // Load the GLTF model from the public folder.
  // We cast it to GLTFResult to ensure type safety based on our expectation.
  const { scene, animations } = useGLTF("/gpu_model.gltf") as GLTFResult;

  // State to track if the device is mobile for responsive scaling
  const [isMobile, setIsMobile] = useState(false);

  // Effect to call the onLoad callback once the scene and animations are loaded
  useEffect(() => {
    if (onLoad) {
      console.log("GPUModel: Model loaded successfully.");
      onLoad();
    }
    // Log the loaded scene and animations for debugging
    console.log("GPUModel: Loaded Scene:", scene);
    console.log("GPUModel: Loaded Animations:", animations);
  }, [scene, animations, onLoad]);

  // Effect to handle window resizing for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Set isMobile based on window width (e.g., 768px for common tablet breakpoint)
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize); // Add resize listener
    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);

  // Refs for animation mixer, action, animated time, and scroll progress
  const mixer = useRef<THREE.AnimationMixer | null>(null); // Animation mixer for the scene
  const action = useRef<THREE.AnimationAction | null>(null); // The specific animation action to control
  const animatedTime = useRef(0); // Current time of the animation
  const progressRef = useRef(0); // Store the latest scroll progress from MotionValue

  // Effect to initialize the animation mixer and action
  useEffect(() => {
    if (animations.length > 0 && scene) {
      // Initialize the mixer with the loaded scene
      mixer.current = new THREE.AnimationMixer(scene);
      // Get the first animation clip and create an action for it
      const act = mixer.current.clipAction(animations[0]);
      // Set animation to play once and clamp at the end (hold last frame)
      act.setLoop(THREE.LoopOnce, 1);
      act.clampWhenFinished = true;
      act.play(); // Start playing (but it will be paused immediately)
      act.paused = true; // Pause the animation so we can control it manually
      action.current = act; // Store the action in a ref
      console.log("GPUModel: Animation mixer and action initialized.");
      console.log("GPUModel: Animation clip duration:", animations[0].duration);
    } else {
      console.warn("GPUModel: No animation clips found in the GLTF model.");
    }

    // Cleanup function for the effect
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction(); // Stop all actions
        mixer.current.uncacheRoot(scene); // Uncache the scene from the mixer
      }
    };
  }, [animations, scene]); // Re-run if animations or scene change

  // Use Framer Motion's useMotionValueEvent to update progressRef
  // This efficiently updates the ref without causing re-renders
  useMotionValueEvent(scrollProgress, "change", (value) => {
    progressRef.current = value;
  });

  // useFrame hook runs on every frame render
  useFrame(() => {
    // Artificially extend the scroll range by multiplying
    const scroll = progressRef.current * 1.1;

    if (action.current && mixer.current && outerGroup.current) {
      const animStart = 0.0;
      const animEnd = 1.0;

      // Animation progress (0 → 1)
      const rawT = (scroll - animStart) / (animEnd - animStart);
      const t = THREE.MathUtils.clamp(rawT, 0, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const duration = action.current.getClip().duration;
      const targetTime = eased * duration;

      // Control animation time
      animatedTime.current = targetTime;
      action.current.time = animatedTime.current;
      mixer.current.update(0);

      // ⬇️ Smoothly animate Z position with an extended scroll zone
      // Phase 1: Normal animation movement from -1 to 1
      const baseZ = THREE.MathUtils.lerp(-1, 1, eased);

      // Phase 2: Extra scroll after animation (from scroll = 1 → 1.1) moves from 1 → 4
      const extraScrollT = THREE.MathUtils.clamp((scroll - 1) / 0.1, 0, 1);
      const extendedZ = THREE.MathUtils.lerp(1, 4, extraScrollT);

      const targetZ = scroll <= 1 ? baseZ : extendedZ;

      outerGroup.current.position.z = THREE.MathUtils.lerp(
        outerGroup.current.position.z,
        targetZ,
        0.1
      );
    }
  });

  // Render the 3D model
  return (
    <group ref={outerGroup} position={[0, -1, -1]}>
      {/* Scale the mesh group based on whether it's a mobile device */}
      <group ref={meshGroup} scale={isMobile ? 1 : 1.5}>
        {/* Render the loaded GLTF scene */}
        <primitive object={scene} />
      </group>
    </group>
  );
}
