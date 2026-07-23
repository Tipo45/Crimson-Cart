// components/InstallPWABanner.tsx

"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallPWABanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-dismissed");

    if (dismissed === "true") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowBanner(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] w-[95%] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-tertiary p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white">
          <FaDownload />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-primary-text">
            Install Crimson Cart
          </h3>

          <p className="mt-1 text-sm text-secondary-text">
            Install the app for faster shopping, offline access,
            and a better mobile experience.
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstall}
              className="rounded-lg bg-primary-button px-4 py-2 text-sm font-medium text-white hover:bg-primary-button-hover"
            >
              Install
            </button>

            <button
              onClick={handleDismiss}
              className="rounded-lg border border-border px-4 py-2 text-sm"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-secondary-text hover:text-primary-text"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}