"use client";

import { FaStore, FaMoneyBillWave, FaTruck, FaBell, FaLock } from "react-icons/fa";

export default function SellerSettings() {
  return (
    <div className="bg-muted-section min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">

        {/* ================= STORE PROFILE ================= */}
        <SettingsCard
          icon={<FaStore />}
          title="Store Profile"
          description="Manage your store name, logo, banner and description."
        >
          <div className="grid gap-4 tablet:grid-cols-2">
            <Input label="Store Name" placeholder="Azebi Crafts" />
            <Input label="Store Logo URL" placeholder="https://..." />
            <Input label="Store Banner URL" placeholder="https://..." />
          </div>

          <div className="mt-4">
            <Textarea
              label="Store Description"
              placeholder="Tell customers about your store..."
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
            <Input label="Account Name" placeholder="Steven Azebi" />
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


        {/* ================= SECURITY ================= */}
        <SettingsCard
          icon={<FaLock />}
          title="Security"
          description="Manage your password and two-factor authentication."
        >
          <div className="space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Toggle label="Enable Two-Factor Authentication (2FA)" />
          </div>

          <SaveButton />
        </SettingsCard>

      </div>
    </div>
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