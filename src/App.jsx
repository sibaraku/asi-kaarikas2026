import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsClass } from "three/examples/jsm/controls/OrbitControls";
import PanZoom2D from "./components/PamZoom2D";

function generateMaze(cols, rows) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(Math.random() > 0.7 ? 1 : 0);
    }
    grid.push(row);
  }
  return grid;
}

const cols = Math.floor(Math.random() * (20 - 10)) + 10;
const rows = Math.floor(Math.random() * (20 - 10)) + 10;

function App() {
  const [count, setCount] = useState(0);

  const [mazeGrid] = useState(generateMaze(cols, rows));
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const offsetX = cols / 2;
  const offsetY = rows / 2;

  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault();
      setPlayerPos((pos) => {
        let { x, y } = pos;
        if (e.key === "ArrowUp" && !mazeGrid[y - 1]?.[x]) y -= 1;
        if (e.key === "ArrowDown" && !mazeGrid[y + 1]?.[x]) y += 1;
        if (e.key === "ArrowLeft" && !mazeGrid[y]?.[x - 1]) x -= 1;
        if (e.key === "ArrowRight" && !mazeGrid[y]?.[x + 1]) x += 1;

        return { x, y };
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 50 }}
        style={{ backgroundColor: "black" }}
      >
        <ambientLight intensity={0.5} />
        <PanZoom2D>
          <mesh position={[8 - offsetX, -(8 - offsetY), 0.1]}>
            <planeGeometry args={[rows + 2, cols + 2]} />
            <meshBasicMaterial color="red" />
            {console.log(cols, rows)}

            <mesh position={[8 - offsetX, -(8 - offsetY), 0.1]}>
              <planeGeometry args={[19, 17]} />
              <meshBasicMaterial color="black" />

              {mazeGrid.map((row, y) =>
                row.map((cell, x) => {
                  if (cell === 0) return null;
                  return (
                    <mesh
                      key={`${x}-${y}`}
                      position={[x - offsetX, -(y - offsetY), 0]}
                    >
                      <planeGeometry args={[1, 1]} />
                      <meshBasicMaterial color="red" />
                    </mesh>
                  );
                }),
              )}
              <mesh
                position={[
                  playerPos.x - offsetX,
                  -(playerPos.y - offsetY),
                  0.1,
                ]}
              >
                <planeGeometry args={[0.8, 0.8]} />
                <meshBasicMaterial color="blue" />
              </mesh>
            </mesh>
          </mesh>
        </PanZoom2D>
      </Canvas>
    </div>
  );
}

export default App;
