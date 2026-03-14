import { useGesture } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";

function PanZoom2D({ children }) {
  const { camera } = useThree();

  return children;
}

export default PanZoom2D;
