import { useEffect, useRef } from "react";
import style from "./OrbitCanvas.module.css";
import Orbit from "../lib/animation/Orbit";

const OrbitCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animateIdRef = useRef<number>(0);
  const orbitRef = useRef<Orbit | null>(null);

  const initCanvas = async () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    canvas.style.background = "black";

    const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    orbitRef.current = new Orbit(ctx, width / 2, height / 2, 100, 20, 20, 0.01);
  };

  const animate = () => {
    orbitRef.current?.draw();
    animateIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initCanvas();

    animate();

    return () => {
      cancelAnimationFrame(animateIdRef.current);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} className={style.container}></canvas>;
};

export default OrbitCanvas;
