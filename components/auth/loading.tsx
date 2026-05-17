"use client"

import Image from "next/image";
import logo from "../../public/logo.svg"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-600 shadow-xl shadow-red-200 animate-pulse">
          <span className="font-extrabold text-secondary"><Image src={logo} alt="logo image" /></span>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-900">Loading Crimson Cart...</p>
          <p className="text-sm text-slate-500">Please wait a moment while we prepare your experience.</p>
        </div>
      </div>
    </div>
  );
}
