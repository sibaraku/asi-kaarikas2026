import { useGesture } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";

function PanZoom2D({ children }) {
  return <group>{children}</group>;
}

export default PanZoom2D;
