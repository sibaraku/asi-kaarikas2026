import { Billboard, useTexture } from '@react-three/drei';
import playerImg from '../assets/player.png';

export default function Player({ position }) {
  const texture = useTexture(playerImg);

  return (
    <Billboard position={[position.x, position.y, 0]}>
      <mesh>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </Billboard>
  );
}