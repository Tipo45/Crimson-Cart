"use client";

import { useLottie } from "lottie-react";
import animationData from "../public/animated-icons/404-Aimation.json";

export default function MyLottieComponent() {
  const { View } = useLottie({
    animationData,
    loop: true,
  });

  return <div className="w-72 mx-auto">{View}</div>;
}