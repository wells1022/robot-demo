"use client";

import { useState, useEffect } from "react";

export default function RobotControl() {
  const [robot, setRobot] = useState({ x: 2, y: 2, direction: 90, icon: "↑" });
  const [keyboardEvent, setKeyboardEvent] = useState("");

  const moveForward = () => {
    setRobot((prev) => {
      let { x, y, direction } = prev;
      switch (direction) {
        case 0:
          x = x < 4 ? x + 1 : x;
          break;
        case 90:
          y = y > 0 ? y - 1 : y;
          break;
        case 180:
          x = x > 0 ? x - 1 : x;
          break;
        case 270:
          y = y < 4 ? y + 1 : y;
          break;
        default:
          break;
      }
      return { ...prev, x, y };
    });
  };

  const rotate = (angle: number) => {
    setRobot((prev) => {
      const newDirection = (prev.direction + angle + 360) % 360;
      let icon = "";

      switch (newDirection) {
        case 0:
          icon = "→";
          break;
        case 90:
          icon = "↑";
          break;
        case 180:
          icon = "←";
          break;
        case 270:
          icon = "↓";
          break;
        default:
          break;
      }

      return { ...prev, direction: newDirection, icon };
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        moveForward();
        setKeyboardEvent("up");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        rotate(-90);
        setKeyboardEvent("right");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        rotate(90);
        setKeyboardEvent("left");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Robot Control</h1>
      <p className="text-sm font-semibold mb-4">Use arrow keys or W, A, D to control the robot</p>
      <div className="grid grid-cols-5 gap-1 w-64 h-64">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="relative bg-gray-200 border border-gray-400">
            {robot.x + robot.y * 5 === i && (
              <div
                className={`absolute inset-0 bg-orange-500 flex justify-center items-center text-white transform rotate-${robot.direction}`}
              >
                {robot.icon}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <p>
        Robot is at ({robot.x}, {robot.y}) facing {robot.direction}°
      </p> */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={() => rotate(90)}
          className={`px-4 py-2 text-white rounded hover:bg-orange-700 ${
            keyboardEvent === "left" ? "bg-orange-700" : "bg-orange-500"
          }`}
        >
          Left
        </button>
        <button
          onClick={moveForward}
          className={`px-4 py-2 text-white rounded hover:bg-orange-700 ${
            keyboardEvent === "up" ? "bg-orange-700" : "bg-orange-500"
          }`}
        >
          Move
        </button>
        <button
          onClick={() => rotate(-90)}
          className={`px-4 py-2 text-white rounded hover:bg-orange-700 ${
            keyboardEvent === "right" ? "bg-orange-700" : "bg-orange-500"
          }`}
        >
          Right
        </button>
      </div>
    </div>
  );
}
