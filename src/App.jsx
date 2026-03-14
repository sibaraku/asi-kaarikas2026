import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsClass } from "three/examples/jsm/controls/OrbitControls";
import PanZoom2D from "./components/PamZoom2D";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 50 }}
        style={{ backgroundColor: "black" }}
      >
        <ambientLight intensity={0.5} />
        <PanZoom2D>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="red" />
          </mesh>
        </PanZoom2D>
      </Canvas>
    </div>
  );
}

export default App;
