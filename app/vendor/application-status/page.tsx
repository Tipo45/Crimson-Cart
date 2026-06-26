"use client";

import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { LuCircleCheckBig, LuCircleX, LuClock3 } from "react-icons/lu";

type VendorStatus = "pending" | "approved" | "rejected";

export default function ApplicationStatus() {
  const currentUser = useQuery(api.user.getCurrentUser);
  const vendor = useQuery(api.user.getVendor);


  const router = useRouter();

  const handleVendor = () => {
    if (!currentUser) return;

    router.push(`vendor/${currentUser?._id}`)
  }

  const status: Record<VendorStatus, {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeColor: string;
    dot: string;
    message: string;
    footer: string;
  }> = {
    pending: {
      title: "Application Submitted",
      icon: LuClock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      badgeBg: "bg-yellow-50 border-yellow-200",
      badgeColor: "text-yellow-700",
      dot: "bg-yellow-500",
      message:
        "Your application has been received successfully and is currently under review by our team.",
      footer:
        "Estimated review time: 24–48 hours.",
    },

    approved: {
      title: "Application Approved 🎉",
      icon: LuCircleCheckBig,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      badgeBg: "bg-green-50 border-green-200",
      badgeColor: "text-green-700",
      dot: "bg-green-500",
      message:
        "Congratulations! Your application has been approved. You can now access your vendor dashboard and begin selling your products.",
      footer:
        "Welcome to the Crimson Cart Vendor Marketplace.",
    },

    rejected: {
      title: "Application Rejected",
      icon: LuCircleX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      badgeBg: "bg-red-50 border-red-200",
      badgeColor: "text-red-700",
      dot: "bg-red-500",
      message:
        "Unfortunately, your application wasn't approved at this time. Please review your submitted information and apply again if necessary.",
      footer:
        "If you believe this is an error, please contact support.",
    },
  };

const vendorStatus: VendorStatus =
  vendor?.approved ?? "pending";

const currentStatus = status[vendorStatus];

  const Icon = currentStatus.icon;

  if (vendor === undefined) {
    return (
      <section className="min-h-screen bg-primary">
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <div className="h-10 w-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-primary">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border p-10 text-center">

          {/* Icon */}
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${currentStatus.iconBg}`}
          >
            <Icon className={`h-10 w-10 ${currentStatus.iconColor}`} />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-bold text-secondary">
            {currentStatus.title}
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for applying to become a vendor on{" "}
            <span className="font-semibold text-secondary">
              Crimson Cart
            </span>.
          </p>

          {/* Status Box */}
          <div
            className={`mt-8 rounded-xl border p-6 text-left ${currentStatus.badgeBg}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${currentStatus.dot} ${vendor?.approved === "pending"
                  ? "animate-pulse"
                  : ""
                  }`}
              />

              <h2 className={`font-semibold ${currentStatus.badgeColor} capitalize`}>
                Status: {vendor?.approved}
              </h2>
            </div>

            <p className="mt-4 text-gray-700 leading-7">
              {currentStatus.message}
            </p>

            <p className="mt-5 font-medium text-secondary">
              {currentStatus.footer}
            </p>
          </div>

          {/* Notice */}
          <div className="mt-8 rounded-lg bg-gray-50 border p-5">
            <p className="text-sm text-gray-600">
              You'll receive an email notification once your application has
              been reviewed. You can also return to this page anytime to check
              your application status.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col lg:flex-row justify-center gap-4">

            <button
              onClick={() => router.push("/")}
              className="rounded-lg bg-secondary px-6 py-3 font-medium text-white cursor-pointer"
            >
              Return Home
            </button>

            {vendor?.approved === "approved" ? (
              <button
                onClick={handleVendor}
                className="rounded-lg border border-secondary px-6 py-3 font-medium text-secondary hover:bg-secondary hover:text-white capitalize"
              >
                Go to Vendor Dashboard
              </button>
            ) : vendor?.approved === "rejected" ? (
              <button
                className="rounded-lg border border-secondary px-6 py-3 font-medium text-secondary hover:bg-secondary hover:text-white capitalize"
              >
                Contact Support
              </button>
            ) : (
              <button
                disabled
                className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-3 text-gray-500 cursor-not-allowed"
              >
                Awaiting Approval
              </button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}