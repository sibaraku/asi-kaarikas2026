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

function generateCoins(cols, rows, mazeGrid) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      const isEmpty = mazeGrid[y]?.[x] === 0;
      row.push(isEmpty && Math.random() > 0.7 ? 1 : 0);
    }
    grid.push(row);
  }
  return grid;
}

const cols = Math.floor(Math.random() * (20 - 10)) + 10;
const rows = Math.floor(Math.random() * (20 - 10)) + 10;

function App() {
  function collectCoin(x, y) {
    setCoinsGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      if (newGrid[y]?.[x] === 1) {
        setCoins((prev) => prev + 1);
        if (coinsGrid[y - 1] && coinsGrid[y - 1][x] === 1) {
          coinsGrid[y - 1][x] = 0;
        }
      }
      return newGrid;
    });
  }
  const offsetX = cols / 2;
  const offsetY = rows / 2;
  const maxX = cols;
  const maxY = rows;
  const minX = -1;
  const minY = -1;

  const [mazeGrid] = useState(generateMaze(cols, rows));

  const [coins, setCoins] = useState(0);

  const [coinsGrid, setCoinsGrid] = useState(
    generateCoins(cols, rows, mazeGrid),
  );

  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [monsters, setMonsters] = useState([
    { x: cols - 1, y: 0 },
    { x: 0, y: rows - 1 },
  ]);

  useEffect(() => {
    const handleKey = (e) => {
      setPlayerPos((pos) => {
        let { x, y } = pos;

        if (e.key === "ArrowUp" && y > minY && !mazeGrid[y - 1]?.[x]) {
          y -= 1;
          collectCoin(x, y);
        }

        if (e.key === "ArrowDown" && y < maxY && !mazeGrid[y + 1]?.[x]) {
          y += 1;
          collectCoin(x, y);
        }

        if (e.key === "ArrowLeft" && x > minX && !mazeGrid[y]?.[x - 1]) {
          x -= 1;
          collectCoin(x, y);
        }

        if (e.key === "ArrowRight" && x < maxX && !mazeGrid[y]?.[x + 1]) {
          x += 1;
          collectCoin(x, y);
        }

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
            newX +=
              dx > 0 && !mazeGrid[m.y]?.[m.x + 1]
                ? 1
                : dx < 0 && !mazeGrid[m.y]?.[m.x - 1]
                  ? -1
                  : 0;
          } else {
            newY +=
              dy > 0 && !mazeGrid[m.y + 1]?.[m.x]
                ? 1
                : dy < 0 && !mazeGrid[m.y - 1]?.[m.x]
                  ? -1
                  : 0;
          }

          return { x: newX, y: newY };
        }),
      );
    }, 500);
    return () => clearInterval(interval);
  }, [playerPos, mazeGrid]);

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <h1>coins {coins}</h1>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 40 }}
        style={{ backgroundColor: "black" }}
      >
        <ambientLight intensity={0.5} />
        <PanZoom2D>
          {mazeGrid.map((row, y) =>
            row.map((cell, x) => {
              if (cell === 0) return null;
              return (
                <mesh
                  key={`tile-${x}-${y}`}
                  position={[x - offsetX, -(y - offsetY), 0]}
                >
                  <planeGeometry args={[1, 1]} />
                  <meshBasicMaterial color="red" />
                </mesh>
              );
            }),
          )}
          {coinsGrid.map((row, y) =>
            row.map((cell, x) => {
              if (cell === 0) return null;
              return (
                <mesh
                  key={`coin-${x}-${y}`}
                  position={[x - offsetX, -(y - offsetY), 0]}
                >
                  <planeGeometry args={[0.1, 0.1]} />
                  <meshBasicMaterial color="yellow" />
                </mesh>
              );
            }),
          )}
          <mesh
            position={[playerPos.x - offsetX, -(playerPos.y - offsetY), 0.1]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial color="blue" />
          </mesh>
          {monsters.map((m, i) => (
            <Monster
              key={i}
              position={{ x: m.x - offsetX, y: -(m.y - offsetY) }}
              textureIndex={i}
            />
          ))}
        </PanZoom2D>
      </Canvas>
    </div>
  );
}

export default App;
