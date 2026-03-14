import { useGesture } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";

function PanZoom2D({ children }) {
  const { camera } = useThree();

  useGesture({
    onWheel: ({ delta: [, dy] }) => {
      camera.zoom = Math.max(0.1, camera.zoom - dy * 0.001);
      camera.updateProjectionMatrix();
    },
    onDrag: ({ delta: [dx, dy] }) => {
      camera.position.x -= dx * 0.01;
      camera.position.y += dy * 0.01;
    },
  });

  return children;
}

export default PanZoom2D;
