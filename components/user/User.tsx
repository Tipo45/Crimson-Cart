"use client"

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/user/Orders";
import Wishlist from "@/components/user/Wishlist";
import Address from "@/components/user/Address";
import Settings from "@/components/user/Settings";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FloatingCart from "@/components/Floatingcart";
import { useUser } from "@clerk/nextjs";

type TabItem = {
  id: string;
  label: string;
};

export default function User() {

  const { user } = useUser();
  const currentUser = useQuery(api.user.getCurrentUser);

  const tabs: TabItem[] = [
    { id: "orders", label: "Orders" },
    { id: "wishlist", label: "Wishlist" },
    { id: "address", label: "Address" },
    { id: "settings", label: "Settings" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const cartItems = useQuery(api.user.getCart);
  const hasCartItems = cartItems && cartItems.length > 0;

  const tabContent = {
    orders: (<><Orders />
      {hasCartItems && <div className="pwa:hidden"><FloatingCart /></div>}</>),
    wishlist: (<><Wishlist />
      {hasCartItems && <div className="pwa:hidden"><FloatingCart /></div>}</>),
    address: (<><Address />
      {hasCartItems && <div className="pwa:hidden"><FloatingCart /></div>}</>),
    settings: <Settings />,
  };

  return (
    <div>
      <div className="border-b border-divider">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
              {user?.firstName?.charAt(0) || "a"}

            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</h2>

              <p className="text-secondary-text text-sm">
                {user?.emailAddresses[0]?.emailAddress}
              </p>

              <p className="text-muted text-xs mt-1">
                {currentUser?._creationTime ? `Member since ${new Date(currentUser._creationTime).toLocaleDateString()}` : "New Member"}
              </p>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted-section min-h-[85vh] py-10">
        <div className="max-w-4xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="relative flex w-full overflow-x-auto rounded-xl border border-border bg-tertiary p-1 mb-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="relative flex-1 rounded-lg px-4 py-2 text-xs lg:text-sm font-medium text-black transition-colors cursor-pointer"
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="userActiveTab"
                      className="absolute inset-0 z-0 rounded-lg bg-secondary text-tertiary"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className={`relative z-10 ${activeTab === tab.id ? 'text-tertiary' : 'text-primary-text'}`}>
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>


            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
              </AnimatePresence>
            </div>

          </Tabs>
        </div>
      </div>
    </div>
  )
}