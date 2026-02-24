"use client";

import {
    FaEdit,
    FaStar,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { LuBadgeCheck, LuPackage } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";

export default function SellerDashboardPage() {

    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen bg-tertiary text-primart-text">

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

                                <span className="text-xs rounded-full">
                                    <LuBadgeCheck className="text-green-500" />
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary-button-border bg-secondary-button text-secondary-button-text hover:bg-secondary-button-hover transition">
                            <FaEdit size={16} />
                            Edit Profile
                        </button>

                        <button className="w-10 h-10 rounded-lg border border-secondary-button-border bg-secondary-button hover:bg-secondary-button-hover flex items-center justify-center transition">
                            <IoIosNotifications size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="bg-muted-section min-h-[70vh] py-10">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="flex bg-tertiary border border-border rounded-lg p-1 w-full mb-8">
                            <TabsTrigger value="dashboard" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs cursor-pointer">Dashboard</TabsTrigger>
                            <TabsTrigger value="products" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs cursor-pointer">Products</TabsTrigger>
                            <TabsTrigger value="orders" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs cursor-pointer">Orders</TabsTrigger>
                            <TabsTrigger value="settings" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-xs cursor-pointer">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="dashboard">

                            {/* ================= STATS CARDS ================= */}
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-8">

                                <StatCard
                                    icon={<TbCurrencyNaira />}
                                    value="₦12,480"
                                    label="Revenue"
                                    growth="+18%"
                                />

                                <StatCard
                                    icon={<LuPackage />}
                                    value="164"
                                    label="Orders"
                                    growth="+12%"
                                />

                                <StatCard
                                    icon={<FiEye />}
                                    value="3.2k"
                                    label="Views"
                                    growth="+7%"
                                />

                                <StatCard
                                    icon={<FaStar />}
                                    value="4.8"
                                    label="Avg Rating"
                                    growth="+0.2"
                                />

                            </div>

                            {/* ================= RECENT ORDERS ================= */}
                            <div className="bg-tertiary border border-border rounded-xl overflow-hidden">
                                <div className="px-6 py-4 font-semibold border-b border-divider">
                                    Recent Orders
                                </div>

                                <RecentOrderRow
                                    title="Leather Bag"
                                    orderId="ORD-3021"
                                    customer="Liam C."
                                    price="₦189.00"
                                    status="Shipped"
                                    statusStyle="bg-info/10 text-info"
                                />

                                <RecentOrderRow
                                    title="Mug Set × 2"
                                    orderId="ORD-3018"
                                    customer="Priya S."
                                    price="₦84.00"
                                    status="Pending"
                                    statusStyle="bg-warning/10 text-warning"
                                />

                                <RecentOrderRow
                                    title="Wool Scarf"
                                    orderId="ORD-3015"
                                    customer="Tomás R."
                                    price="₦67.00"
                                    status="Delivered"
                                    statusStyle="bg-success/10 text-success"
                                    last
                                />

                            </div>
                        </TabsContent>
                        <TabsContent value="products">h</TabsContent>
                        <TabsContent value="orders">e</TabsContent>
                        <TabsContent value="settings">w</TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    );
}

/* ================= STAT CARD ================= */

type StatCardProps = {
    icon: React.ReactNode;
    value: string;
    label: string;
    growth: string;
};

function StatCard({ icon, value, label, growth }: StatCardProps) {
    return (
        <div className="bg-tertiary border border-border rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-lg bg-accent-background text-accent-text flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-success text-sm">{growth}</span>
            </div>

            <div>
                <p className="text-xl font-semibold">{value}</p>
                <p className="text-sm text-muted">{label}</p>
            </div>
        </div>
    );
}

/* ================= RECENT ORDER ROW ================= */

type RecentOrderRowProps = {
    title: string;
    orderId: string;
    customer: string;
    price: string;
    status: string;
    statusStyle: string;
    last?: boolean;
};

function RecentOrderRow({
    title,
    orderId,
    customer,
    price,
    status,
    statusStyle,
    last,
}: RecentOrderRowProps) {
    return (
        <div
            className={`flex justify-between items-center px-6 py-4 ${!last && "border-b border-divider"
                }`}
        >
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-muted">
                    {orderId} • {customer}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <span className="font-medium">{price}</span>
                <span
                    className={`text-xs px-3 py-1 rounded-full ${statusStyle}`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}