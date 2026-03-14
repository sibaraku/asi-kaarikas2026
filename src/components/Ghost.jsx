import { Billboard, useTexture } from '@react-three/drei';
import ghost1 from '../assets/ghost1.png';
import ghost2 from '../assets/ghost2.png';

export default function Monster({ position, textureIndex }) {
  const textures = useTexture([ghost1, ghost2]);
  const texture = textures[textureIndex % textures.length];

  return (
    <Billboard position={[position.x, position.y, 0]}>
      <mesh>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </Billboard>
  );
}