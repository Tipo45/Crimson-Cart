"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStore, FaMoneyBillWave, FaTruck, FaBell, FaLock, FaSignOutAlt } from "react-icons/fa";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";
import Providers from "@/components/providers";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SignOutButton } from "@clerk/nextjs";

export default function SellerSettings() {

  const [loading, setLoading] = useState(true);
  const vendor = useQuery(api.user.getVendor);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>{loading ? (<SettingSkeleton />) : (<Providers>
      <div className="bg-muted-section min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-6 space-y-8">

          {/* ================= STORE PROFILE ================= */}
          <SettingsCard
            icon={<FaStore />}
            title="Store Profile"
            description="Manage your store name, logo, banner and description."
          >
            <div className="grid gap-4 tablet:grid-cols-2">
              <Input label="Store Name" placeholder={vendor?.businessName} />
              <Input label="Store Logo URL" placeholder="https://..." />
              <Input label="Store Banner URL" placeholder="https://..." />
            </div>

            <div className="mt-4">
              <Textarea
                label="Store Description"
                placeholder={vendor?.description}
              />
            </div>

            <SaveButton />
          </SettingsCard>


          {/* ================= PAYMENT & PAYOUT ================= */}
          <SettingsCard
            icon={<FaMoneyBillWave />}
            title="Payment & Payout Settings"
            description="Manage your bank account and payout schedule."
          >
            <div className="grid gap-4 tablet:grid-cols-2">
              <Input label="Bank Name" placeholder="Access Bank" />
              <Input label="Account Number" placeholder="0123456789" />
              <Input label="Account Name" placeholder="John Doe" />
              <Select
                label="Payout Schedule"
                options={["Daily", "Weekly", "Monthly"]}
              />
            </div>

            <SaveButton />
          </SettingsCard>


          {/* ================= SHIPPING ================= */}
          <SettingsCard
            icon={<FaTruck />}
            title="Shipping Settings"
            description="Configure your delivery regions and rates."
          >
            <div className="grid gap-4 tablet:grid-cols-2">
              <Input label="Flat Shipping Rate" placeholder="$10" />
              <Input label="Free Shipping Threshold" placeholder="$100" />
              <Select
                label="Shipping Region"
                options={["Nigeria", "West Africa", "International"]}
              />
              <Select
                label="Shipping Method"
                options={["Standard", "Express", "Pickup"]}
              />
            </div>

            <SaveButton />
          </SettingsCard>


          {/* ================= NOTIFICATIONS ================= */}
          <SettingsCard
            icon={<FaBell />}
            title="Notification Preferences"
            description="Choose how you receive updates."
          >
            <Toggle label="Email notifications for new orders" />
            <Toggle label="Marketing & announcements" />

            <SaveButton />
          </SettingsCard>

        </div>
        {!loading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="fixed bottom-6 right-6"
                  >
                    <SignOutButton redirectUrl="/?logout=success">
                      <button
                        className="w-14 h-14 bg-error text-white rounded-full shadow-lg flex items-center justify-center hover:bg-error/90 transition cursor-pointer"
                      >
                        <FaSignOutAlt size={20} />
                      </button>
                    </SignOutButton>
        
                  </motion.div>
                )}
      </div></Providers>)}</>

  );
}


/* ================= REUSABLE COMPONENTS ================= */

function SettingsCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-tertiary border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent-background text-accent-text flex items-center justify-center text-lg">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-lg text-primart-text">
            {title}
          </h2>
          <p className="text-sm text-muted mt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}


function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-secondary-text mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-input-border rounded-lg px-4 py-2 bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
      />
    </div>
  );
}


function Textarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-secondary-text mb-1">
        {label}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full border border-input-border rounded-lg px-4 py-2 bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
      />
    </div>
  );
}


function Select({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm text-secondary-text mb-1">
        {label}
      </label>
      <select className="w-full border border-input-border rounded-lg px-4 py-2 bg-primary focus:outline-none focus:ring-2 focus:ring-secondary">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}


function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
      <span className="text-sm text-secondary-text">{label}</span>
      <input type="checkbox" className="accent-secondary w-5 h-5" />
    </div>
  );
}


function SaveButton() {
  return (
    <div className="pt-2">
      <button className="bg-primary-button hover:bg-primary-button-hover active:bg-primary-button-active text-tertiary px-6 py-2 rounded-lg transition">
        Save Changes
      </button>
    </div>
  );
}