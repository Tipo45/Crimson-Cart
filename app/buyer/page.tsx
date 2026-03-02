"use client";

import { LuBadgeCheck } from "react-icons/lu";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Orders from "@/components/buyer/Orders";
import Wishlist from "@/components/buyer/Wishlist";
import Address from "@/components/buyer/Address";
import Settings from "@/components/buyer/Settings";

export default function BuyerAccountPage() {

    const [activeTab, setActiveTab] = useState("orders");

    return (
        <>
            <Navbar />
            <div className="h-full bg-tertiary text-primart-text mt-10">

                {/* ================= HEADER ================= */}
                <div className="border-b border-divider">
                    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* Left Section */}
                        <div className="flex items-center gap-5">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                                SA
                            </div>

                            {/* User Info */}
                            <div>
                                <h2 className="text-2xl font-semibold">Steven Azebi</h2>
                                <p className="text-secondary-text text-sm">
                                    tipo4542@gmail.com
                                </p>
                                <p className="text-muted text-xs mt-1">
                                    Member since February 2026
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="rounded-full">
                                        <LuBadgeCheck size={25} className="text-green-500" />
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Right Section */}

                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="bg-muted-section min-h-[85vh] py-10">
                    <div className="max-w-4xl mx-auto px-6">

                        {/* Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
                            <TabsList className="flex bg-tertiary border border-border rounded-lg p-1 w-full mb-8">
                                <TabsTrigger value="orders" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">
                                    Orders
                                </TabsTrigger>
                                <TabsTrigger value="wishlist" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">
                                    Wishlist
                                </TabsTrigger>
                                <TabsTrigger value="addresses" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">
                                    Addresses
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="orders">
                                <Orders />
                            </TabsContent>

                            <TabsContent value="wishlist">
                                <Wishlist />
                            </TabsContent>

                            <TabsContent value="addresses">
                                <Address />
                            </TabsContent>

                            <TabsContent value="settings">
                                <Settings />
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </div>
        </>
    );
}