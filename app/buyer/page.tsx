"use client";

import { FaEdit, FaRegCheckCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { LuPackage } from "react-icons/lu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

export default function BuyerAccountPage() {

    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="min-h-screen bg-primary text-primart-text">

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

                            {/* Buyer / Seller Toggle */}
                            <div className="mt-4 flex bg-secondary-button rounded-lg p-1 w-fit">
                                <button className="px-4 py-2 rounded-md bg-secondary text-tertiary text-sm font-medium">
                                    Buyer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
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
                <div className="max-w-4xl mx-auto px-6">

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList className="flex bg-tertiary border border-border rounded-lg p-1 w-full mb-8">
                            <TabsTrigger value="orders" className="data-[state=active]:bg-accent-background px-4 py-2 rounded-md text-primart-text text-sm cursor-pointer">
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="wishlist" className="px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                            Wishlist
                        </TabsTrigger>
                        <TabsTrigger value="addresses" className="px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                            Addresses
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                            Settings
                        </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Orders List */}
                    <div className="space-y-5">

                        <OrderCard
                            title="Handcrafted Leather Bag"
                            orderId="ORD-2847"
                            date="Feb 18, 2026"
                            price="$189.00"
                            status="Delivered"
                            statusColor="text-success"
                        />

                        <OrderCard
                            title="Ceramic Mug Set"
                            orderId="ORD-2831"
                            date="Feb 15, 2026"
                            price="$42.00"
                            status="In Transit"
                            statusColor="text-info"
                        />

                        <OrderCard
                            title="Wool Scarf — Charcoal"
                            orderId="ORD-2799"
                            date="Feb 10, 2026"
                            price="$67.00"
                            status="Processing"
                            statusColor="text-warning"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}


/* ================= ORDER CARD COMPONENT ================= */

type OrderCardProps = {
    title: string;
    orderId: string;
    date: string;
    price: string;
    status: string;
    statusColor: string;
};

function OrderCard({
    title,
    orderId,
    date,
    price,
    status,
    statusColor,
}: OrderCardProps) {
    return (
        <div className="bg-tertiary border border-border rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-muted-section rounded-lg flex items-center justify-center">
                    <LuPackage size={20} className="text-muted" />
                </div>

                <div>
                    <h3 className="font-semibold text-primart-text">
                        {title}
                    </h3>
                    <p className="text-xs text-muted mt-1">
                        {orderId} • {date}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="font-semibold">{price}</p>
                    <p className={`text-xs mt-1 ${statusColor}`}>
                        {status}
                    </p>
                </div>

                <FaRegCheckCircle size={18} className="text-muted" />
            </div>
        </div>
    );
}

