"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuBadgeCheck } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Orders from "@/components/user/Orders";
import Wishlist from "@/components/user/Wishlist";
import Address from "@/components/user/Address";
import Settings from "@/components/user/Settings";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FloatingCart from "@/components/Floatingcart";


type TabItem = {
  id: string;
  label: string;
};

export default function UserAccountPage() {
  const tabs: TabItem[] = [
    { id: "orders", label: "Orders" },
    { id: "wishlist", label: "Wishlist" },
    { id: "address", label: "Address" },
    { id: "settings", label: "Settings" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const { user, isSignedIn } = useUser();

  // ================= STORE USER =================
  const storeUser = useMutation(api.user.store);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     storeUser();
  //   }
  // }, [isSignedIn, storeUser]);

  const cartItems = useQuery(api.user.getCart);
  const hasCartItems = cartItems && cartItems.length > 0;

  // ================= QUERY USER =================
  // const currentUser = useQuery(api.user.getCurrentUser);

  const tabContent = {
    orders: (<><Orders />
      {hasCartItems && <FloatingCart />}</>),
    wishlist: (<><Wishlist />
      {hasCartItems && <FloatingCart />}</>),
    address: (<><Address />
      {hasCartItems && <FloatingCart />}</>),
    settings: <Settings />,
  };

  return (
    <>
      <Navbar />

      <div className="h-full bg-tertiary text-primary-text mt-20">
        {/* ================= HEADER ================= */}
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
                  {user?.createdAt ? `Member since ${new Date(user.createdAt).toLocaleDateString()}` : "New Member"}
                </p>

                {/* <div className="flex items-center gap-2 mt-2">
                  <span className="rounded-full opacity-50">
                    <LuBadgeCheck size={25} className="text-green-500" />
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
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
    </>
  );
}