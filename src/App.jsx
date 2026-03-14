import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import PanZoom2D from "./components/PamZoom2D";
import Player from "./components/Player";
import Monster from "./components/Ghost";

function generateMaze(cols, rows) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(Math.random() > 0.7 ? 1 : 0); // 1 = стена
    }
    grid.push(row);
  }
  return grid;
}

export default function App() {
  const cols = 15;
  const rows = 15;
  const offsetX = cols / 2;
  const offsetY = rows / 2;

  const [mazeGrid] = useState(generateMaze(cols, rows));
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [monsters, setMonsters] = useState([
    { x: cols - 1, y: 0 },
    { x: 0, y: rows - 1 },
  ]);

  useEffect(() => {
    const handleKey = (e) => {
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
  }, [mazeGrid]);

  // Движение монстров
  useEffect(() => {
    const interval = setInterval(() => {
      setMonsters((prev) =>
        prev.map((m) => {
          let dx = playerPos.x - m.x;
          let dy = playerPos.y - m.y;
          let newX = m.x;
          let newY = m.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 && !mazeGrid[m.y]?.[m.x + 1] ? 1 : dx < 0 && !mazeGrid[m.y]?.[m.x - 1] ? -1 : 0;
          } else {
            newY += dy > 0 && !mazeGrid[m.y + 1]?.[m.x] ? 1 : dy < 0 && !mazeGrid[m.y - 1]?.[m.x] ? -1 : 0;
          }

          return { x: newX, y: newY };
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, [playerPos, mazeGrid]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 50 }} style={{ backgroundColor: "black" }}>
        <ambientLight intensity={0.5} />
        <PanZoom2D>
          {mazeGrid.map((row, y) =>
            row.map((cell, x) =>
              cell ? (
                <mesh key={`${x}-${y}`} position={[x - offsetX, -(y - offsetY), 0]}>
                  <planeGeometry args={[1, 1]} />
                  <meshBasicMaterial color="red" />
                </mesh>
              ) : null
            )
          )}

          <Player position={{ x: playerPos.x - offsetX, y: -(playerPos.y - offsetY) }} />

          {monsters.map((m, i) => (
            <Monster
              key={i}
              position={{ x: m.x - offsetX, y: -(m.y - offsetY) }}
              textureIndex={i} // 0 или 1
            />
          ))}
        </PanZoom2D>
      </Canvas>
    </div>
  );
}