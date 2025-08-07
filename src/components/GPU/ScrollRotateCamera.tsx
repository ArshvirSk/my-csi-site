import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

interface ScrollProgressProps {
  scrollProgress: MotionValue<number>;
}

export default function ScrollRotateCamera({
  scrollProgress,
}: ScrollProgressProps) {
  const { camera } = useThree();
  const currentCameraPosition = useRef(new THREE.Vector3(6, 6, 6));
  const maxScrollReached = useRef(0);

  const start = new THREE.Vector3(6, 6, 6);
  const mid = new THREE.Vector3(0, 10, 8);
  const end = new THREE.Vector3(0, 10, 4);

  // 👇 New camera target for close-up + right shift
  const closeZoom = new THREE.Vector3(0, 8, 1); // Adjust to your liking

  const calculatedTargetPos = new THREE.Vector3();

  useFrame(() => {
    const scroll = scrollProgress.get();

    // Prevent rewinding unless at top
    if (scroll < 0.01) {
      maxScrollReached.current = scroll;
    } else {
      maxScrollReached.current = Math.max(maxScrollReached.current, scroll);
    }

    const s = maxScrollReached.current;

    if (s < 0.25) {
      const t = s / 0.25;
      calculatedTargetPos.lerpVectors(start, mid, t);
    } else if (s < 0.5) {
      calculatedTargetPos.copy(mid);
    } else if (s < 0.9) {
      const t = (s - 0.5) / 0.4;
      calculatedTargetPos.lerpVectors(mid, end, t);
    } else if (s < 1.1) {
      // 🔥 From scroll 0.9 to 1.1, zoom in and shift right
      const t = (s - 0.9) / 0.2;
      calculatedTargetPos.lerpVectors(end, closeZoom, t);
    } else {
      // Hold at the closest zoom
      calculatedTargetPos.copy(closeZoom);
    }

    currentCameraPosition.current.lerp(calculatedTargetPos, 0.1);
    camera.position.copy(currentCameraPosition.current);
    camera.lookAt(1, 1.9, 1.5);
  });

  return null;
}
