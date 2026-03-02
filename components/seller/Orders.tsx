"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type OrderStatus =
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

type Order = {
    id: string;
    customer: string;
    items: string[];
    total: string;
    status: OrderStatus;
    date: string;
};

const ordersData: Order[] = [
    {
        id: "ORD-3011",
        customer: "John Mensah",
        items: ["Leather Bag", "Wallet"],
        total: "$210.00",
        status: "Pending",
        date: "Mar 01, 2026",
    },
    {
        id: "ORD-3012",
        customer: "Sarah K.",
        items: ["Wool Scarf"],
        total: "$67.00",
        status: "Processing",
        date: "Mar 02, 2026",
    },
    {
        id: "ORD-3013",
        customer: "Michael A.",
        items: ["Ceramic Mug Set"],
        total: "$42.00",
        status: "Shipped",
        date: "Mar 03, 2026",
    },
];

export default function SellerOrders() {
    const [filter, setFilter] = useState<OrderStatus | "All">("All");
    const [expanded, setExpanded] = useState<string | null>(null);

    const filteredOrders =
        filter === "All"
            ? ordersData
            : ordersData.filter((order) => order.status === filter);

    return (
        <div className="bg-muted-section p-6 rounded-xl">
            {/* ================= FILTER ================= */}
            <div className="flex flex-wrap gap-3 mb-6">
                {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
                    (status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-4 py-2 rounded-lg text-sm border transition
                ${filter === status
                                    ? "bg-secondary text-tertiary border-secondary"
                                    : "bg-tertiary border-border text-secondary-text hover:bg-secondary-button"
                                }`}
                        >
                            {status}
                        </button>
                    )
                )}
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto bg-tertiary rounded-xl border border-border">
                <table className="min-w-full text-sm">
                    <thead className="border-b border-divider bg-primary">
                        <tr className="text-left text-secondary-text">
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    {filteredOrders.map((order) => (
                        <tbody key={order.id} className="border-b border-divider">
                            {/* Main Row */}
                            <tr className="hover:bg-muted-section transition">
                                <td className="px-6 py-4 font-medium">{order.id}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4">{order.items.length}</td>
                                <td className="px-6 py-4 font-semibold">{order.total}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4">{order.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() =>
                                            setExpanded(expanded === order.id ? null : order.id)
                                        }
                                    >
                                        {expanded === order.id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                </td>
                            </tr>

                            {/* Expandable Row */}
                            {expanded === order.id && (
                                <tr className="bg-primary">
                                    <td colSpan={7} className="px-6 py-6">
                                        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                                            {/* Order Details */}
                                            <div>
                                                <h4 className="font-semibold mb-2">
                                                    Order Details
                                                </h4>
                                                <ul className="text-secondary-text text-sm space-y-1">
                                                    {order.items.map((item, index) => (
                                                        <li key={index}>• {item}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="flex flex-wrap gap-3">
                                                <button className="px-4 py-2 rounded-lg bg-secondary text-tertiary hover:bg-primary-button-hover transition">
                                                    Mark as Shipped
                                                </button>

                                                <button className="px-4 py-2 rounded-lg border border-secondary-button-border bg-secondary-button text-secondary-button-text hover:bg-secondary-button-hover transition">
                                                    Print Label
                                                </button>

                                                <button className="px-4 py-2 rounded-lg border border-secondary-button-border bg-tertiary text-secondary-text hover:bg-muted-section transition">
                                                    Contact Buyer
                                                </button>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }: { status: OrderStatus }) {
    const statusStyles = {
        Pending: "bg-warning/20 text-warning",
        Processing: "bg-info/20 text-info",
        Shipped: "bg-secondary/20 text-secondary",
        Delivered: "bg-success/20 text-success",
        Cancelled: "bg-error/20 text-error",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}