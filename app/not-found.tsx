"use client";

import MyLottieComponent from "@/components/Lottieanimation";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Providers from "./providers";

export default function NotFound() {
  return (
    <Providers>
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <div className="text-center max-w-xl">

          {/* Icon */}
          <div className="w-full h-full mx-auto flex items-center justify-cente mb-6">
            <MyLottieComponent />
          </div>

          <h2 className="text-2xl font-semibold text-primart-text mb-3">
            Page Not Found
          </h2>

          <p className="text-secondary-text mb-8">
            The page you're looking for doesn’t exist or may have been moved.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="bg-primary-button hover:bg-primary-button-hover active:bg-primary-button-active text-tertiary px-6 py-3 rounded-lg transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border border-secondary-button-border bg-secondary-button hover:bg-secondary-button-hover text-secondary-button-text px-6 py-3 rounded-lg transition"
            >
              Go Back
            </button>
          </div>

        </div>
      </div>
    </Providers>
  );
}