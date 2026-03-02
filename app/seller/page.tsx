"use client";


import { LuBadgeCheck } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";;
import Navbar from "@/components/Navbar";
import SellerDashboard from "@/components/seller/Dashboard";
import Settings from "@/components/seller/Settings";
import SellerProducts from "@/components/seller/Products";
import SellerOrders from "@/components/seller/Orders";

export default function SellerDashboardPage() {

    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-tertiary text-primart-text mt-10">

                {/* ================= HEADER ================= */}
                <div className="border-b border-divider">
                    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* Left */}
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                                SA
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold">Steven Azebi</h2>
                                <p className="text-secondary-text text-sm">
                                    tipo4542@gmail.com
                                </p>
                                <p className="text-muted text-xs mt-1">
                                    Member since February 2026
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Vendor</span>

                                    <span className="rounded-full">
                                        <LuBadgeCheck size={25} className="text-green-500" />
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="bg-muted-section min-h-[70vh] py-10">
                    <div className="max-w-6xl mx-auto px-6">

                        {/* Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex bg-tertiary border border-border rounded-lg p-1 w-full mb-8">
                                <TabsTrigger value="dashboard" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">Dashboard</TabsTrigger>
                                <TabsTrigger value="products" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">Products</TabsTrigger>
                                <TabsTrigger value="orders" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">Orders</TabsTrigger>
                                <TabsTrigger value="settings" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs lg:text-sm cursor-pointer">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="dashboard">
                                <SellerDashboard />
                            </TabsContent>

                            <TabsContent value="products">
                                <SellerProducts />
                            </TabsContent>

                            <TabsContent value="orders">
                                <SellerOrders />
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