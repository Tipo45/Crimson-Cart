"use client";

import { FaEdit, FaRegCheckCircle, FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { LuPackage } from "react-icons/lu";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";

type WishlistItem = {
    id: number;
    name: string;
    price: string;
    image: string;
};

type Address = {
    id: string;
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    isDefault?: boolean;
};

type Card = {
    id: number;
    brand: string;
    last4: string;
    expiry: string;
};

export default function BuyerAccountPage() {

    const [activeTab, setActiveTab] = useState("orders");
    const wishlistItems: WishlistItem[] = [
        {
            id: 1,
            name: "Handcrafted Leather Bag",
            price: "₦189.00",
            image: "/products/bag.jpg",
        },
        {
            id: 2,
            name: "Ceramic Mug Set",
            price: "₦42.00",
            image: "/products/mug.jpg",
        },
        {
            id: 3,
            name: "Wool Scarf — Charcoal",
            price: "₦67.00",
            image: "/products/scarf.jpg",
        },
        {
            id: 4,
            name: "Minimalist Wrist Watch",
            price: "₦129.00",
            image: "/products/watch.jpg",
        },
    ];

    const addresses: Address[] = [
        {
            id: "1",
            fullName: "Steven Azebi",
            street: "12 Palm Avenue",
            city: "Yenagoa",
            state: "Bayelsa State",
            country: "Nigeria",
            phone: "+234 813 854 955",
            isDefault: true,
        },
        {
            id: "2",
            fullName: "Steven Azebi",
            street: "45 Market Road",
            city: "Obio/Akpor",
            state: "Rivers State",
            country: "Nigeria",
            phone: "+234 813 854 955",
        },
    ];

    const [twoFA, setTwoFA] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
    });

    const [cards, setCards] = useState<Card[]>([
        { id: 1, brand: "Visa", last4: "4242", expiry: "12/27" },
        { id: 2, brand: "Mastercard", last4: "8891", expiry: "09/26" },
    ]);

    const removeCard = (id: number) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <div className="h-full bg-tertiary text-primart-text">

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
            <div className="bg-muted-section min-h-[85vh] py-10">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="">
                        <TabsList className="flex bg-tertiary border border-border rounded-lg p-1 w-full mb-8">
                            <TabsTrigger value="orders" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                                Orders
                            </TabsTrigger>
                            <TabsTrigger value="wishlist" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                                Wishlist
                            </TabsTrigger>
                            <TabsTrigger value="addresses" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                                Addresses
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="data-[state=active]:bg-secondary data-[state=active]:text-tertiary px-4 py-2 rounded-md text-secondary-text text-sm cursor-pointer">
                                Settings
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">

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
                        </TabsContent>

                        <TabsContent value="wishlist">
                            {/* Wishlist */}
                            <div>
                                <h2 className="text-xl font-semibold mb-6 text-primart-text">
                                    My Wishlist
                                </h2>

                                {/* GRID */}
                                <div className="grid grid-cols-2 tablet:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {wishlistItems.map((item) => (
                                        <WishlistCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="addresses">
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>

                                {/* Grid */}
                                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">

                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className="relative bg-tertiary border border-border rounded-xl p-6 hover:shadow-sm transition"
                                        >
                                            {/* Default Badge */}
                                            {address.isDefault && (
                                                <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-badge-background text-badge-text font-medium">
                                                    Default
                                                </span>
                                            )}

                                            {/* Address Content */}
                                            <div className="space-y-1 text-sm text-secondary-text">
                                                <p className="font-semibold text-primart-text">
                                                    {address.fullName}
                                                </p>
                                                <p>{address.street}</p>
                                                <p>
                                                    {address.city}, {address.state}
                                                </p>
                                                <p>{address.country}</p>
                                                <p className="pt-2 text-muted">{address.phone}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-4 mt-6">
                                                <button className="flex items-center gap-2 text-secondary-button-text hover:text-secondary transition text-sm">
                                                    <FaEdit size={14} />
                                                    Edit
                                                </button>

                                                <button className="flex items-center gap-2 text-error hover:opacity-80 transition text-sm">
                                                    <FaTrash size={14} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add New Address Card */}
                                    <button className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-input-border rounded-xl p-6 bg-tertiary hover:bg-secondary-button transition text-secondary-text">
                                        <div className="w-10 h-10 rounded-full bg-secondary-button flex items-center justify-center">
                                            <IoAdd size={20} className="text-secondary-button-text" />
                                        </div>
                                        <span className="text-sm font-medium">Add New Address</span>
                                    </button>

                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings">
                            <div className="space-y-10">

                                {/* ================= PERSONAL INFO ================= */}
                                <SectionWrapper title="Personal Information">
                                    <div className="flex flex-col tablet:flex-row gap-6">

                                        {/* Avatar */}
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                                                AO
                                            </div>
                                            <button className="text-accent-text text-sm hover:underline">
                                                Change Avatar
                                            </button>
                                        </div>

                                        {/* Info Fields */}
                                        <div className="flex-1 space-y-4">
                                            <EditableField label="Full Name" value="Amara Osei" />
                                            <EditableField label="Email" value="amara.osei@email.com" />
                                            <EditableField label="Phone" value="+1 234 567 8900" />
                                        </div>
                                    </div>
                                </SectionWrapper>


                                {/* ================= SECURITY ================= */}
                                <SectionWrapper title="Security">
                                    <div className="space-y-6">

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Change Password</p>
                                                <p className="text-sm text-muted">
                                                    Update your account password regularly.
                                                </p>
                                            </div>
                                            <button className="px-4 py-2 bg-primary-button text-tertiary rounded-lg hover:bg-primary-button-hover transition">
                                                Update
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Two-Factor Authentication</p>
                                                <p className="text-sm text-muted">
                                                    Add extra security to your account.
                                                </p>
                                            </div>
                                            <Toggle enabled={twoFA} setEnabled={setTwoFA} />
                                        </div>

                                    </div>
                                </SectionWrapper>


                                {/* ================= PAYMENT METHODS ================= */}
                                <SectionWrapper title="Payment Methods">
                                    <div className="space-y-4">

                                        {cards.map((card) => (
                                            <div
                                                key={card.id}
                                                className="flex items-center justify-between bg-muted-section border border-border rounded-lg p-4"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {card.brand} •••• {card.last4}
                                                    </p>
                                                    <p className="text-sm text-muted">
                                                        Expires {card.expiry}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => removeCard(card.id)}
                                                    className="text-error hover:opacity-80"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}

                                        <button className="flex items-center gap-2 px-4 py-2 border border-secondary-button-border bg-secondary-button text-secondary-button-text rounded-lg hover:bg-secondary-button-hover transition">
                                            <FaPlus />
                                            Add New Card
                                        </button>
                                    </div>
                                </SectionWrapper>


                                {/* ================= NOTIFICATIONS ================= */}
                                <SectionWrapper title="Notifications">
                                    <div className="space-y-5">

                                        <NotificationToggle
                                            label="Email Notifications"
                                            enabled={notifications.email}
                                            onToggle={() =>
                                                setNotifications({ ...notifications, email: !notifications.email })
                                            }
                                        />

                                        <NotificationToggle
                                            label="SMS Notifications"
                                            enabled={notifications.sms}
                                            onToggle={() =>
                                                setNotifications({ ...notifications, sms: !notifications.sms })
                                            }
                                        />

                                        <NotificationToggle
                                            label="Push Notifications"
                                            enabled={notifications.push}
                                            onToggle={() =>
                                                setNotifications({ ...notifications, push: !notifications.push })
                                            }
                                        />

                                    </div>
                                </SectionWrapper>
                            </div>
                        </TabsContent>
                    </Tabs>

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

type WishlistCardProps = {
    item: WishlistItem;
};

function WishlistCard({ item }: WishlistCardProps) {
    return (
        <div className="
      bg-tertiary 
      border border-border 
      rounded-xl 
      overflow-hidden 
      transition 
      hover:shadow-md
    ">
            <div className="relative w-full h-40 bg-muted-section">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-primart-text line-clamp-2">
                    {item.name}
                </h3>

                <p className="text-secondary font-semibold">
                    {item.price}
                </p>

                <div className="flex gap-2 pt-2">
                    <button className="
            flex-1 
            flex items-center justify-center gap-2
            px-3 py-2 
            text-sm 
            rounded-lg 
            bg-primary-button 
            text-tertiary 
            hover:bg-primary-button-hover 
            active:bg-primary-button-active
            transition
          ">
                        <FaShoppingCart size={14} />
                        Add
                    </button>

                    <button className="
            flex items-center justify-center
            px-3 py-2 
            rounded-lg 
            border border-secondary-button-border
            bg-secondary-button
            text-secondary-button-text
            hover:bg-secondary-button-hover
            transition
          ">
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function SectionWrapper({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-tertiary border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">{title}</h3>
            {children}
        </div>
    );
}


function EditableField({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b border-divider pb-3">
            <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
            <button className="text-accent-text hover:opacity-80">
                <FaEdit size={14} />
            </button>
        </div>
    );
}


function Toggle({
    enabled,
    setEnabled,
}: {
    enabled: boolean;
    setEnabled: (val: boolean) => void;
}) {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${enabled ? "bg-success" : "bg-border"
                }`}
        >
            <div
                className={`w-4 h-4 bg-tertiary rounded-full shadow-md transform transition ${enabled ? "translate-x-6" : "translate-x-0"
                    }`}
            />
        </button>
    );
}


function NotificationToggle({
    label,
    enabled,
    onToggle,
}: {
    label: string;
    enabled: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center justify-between">
            <p className="font-medium">{label}</p>
            <Toggle enabled={enabled} setEnabled={() => onToggle()} />
        </div>
    );
}
