import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import SettingSkeleton from "../skeletonui/buyer/SettingsSkeleton";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

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

export default function Address() {

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { user } = useUser();
    const updateAddress = useMutation(api.user.addAddress);
    const currentUser= useQuery(api.user.getCurrentUser);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
    });

    const handleUpdate = async () => {
        await updateAddress({
            address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`,
        });

        toast.success("Address updated successfully!");

        setFormData({
            street: "",
            city: "",
            state: "",
            country: "",
        });

        setShowForm(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const addresses: Address[] = currentUser?.address
    ? [
        {
            id: currentUser._id,
            fullName: user?.fullName || "User",
            street: currentUser.address.split(",")[0]?.trim() || "",
            city: currentUser.address.split(",")[1]?.trim() || "",
            state: currentUser.address.split(",")[2]?.trim() || "",
            country: currentUser.address.split(",")[3]?.trim() || "",
            phone: currentUser.phoneNumber || "",
            isDefault: true,
        },
    ]
    : [];

    return (
        <>
            {loading ? (<SettingSkeleton />) : (
                <div>
                    <motion.h2 initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }} className="text-xl font-semibold mb-6">Saved Addresses</motion.h2>

                    {/* Grid */}
                    <motion.div initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.5
                                },
                            },
                        }} className="grid grid-cols-1 tablet:grid-cols-2 gap-6">

                        {addresses.map((address) => (
                            <motion.div
                                key={address.id}
                                variants={{
                                    hidden: { opacity: 0, y: 25 },
                                    visible: { opacity: 1, y: 0 },
                                }}
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
                            </motion.div>
                        ))}

                        {/* Add New Address Card */}
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-input-border rounded-xl p-6 bg-tertiary hover:bg-secondary-button transition text-secondary-text"
                        >
                            <div className="w-10 h-10 rounded-full bg-secondary-button flex items-center justify-center">
                                <IoAdd size={20} className="text-secondary-button-text" />
                            </div>
                            <span className="text-sm font-medium">Add New Address</span>
                        </button>
                    </motion.div>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 bg-tertiary border border-border rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold mb-6 text-primary-text">
                                Add New Address
                            </h3>

                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">

                                {/* House Address */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">
                                        House Address
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                street: e.target.value,
                                            })
                                        }
                                        placeholder="Enter house address"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* City */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                city: e.target.value,
                                            })
                                        }
                                        placeholder="Enter city"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* State */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                state: e.target.value,
                                            })
                                        }
                                        placeholder="Enter state"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* Country */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                country: e.target.value,
                                            })
                                        }
                                        placeholder="Enter country"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4 mt-6">
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-3 rounded-lg bg-secondary text-tertiary hover:opacity-90 transition"
                                >
                                    Save Address
                                </button>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-3 rounded-lg border border-input-border text-secondary-text hover:bg-muted transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>)}
        </>
    )
}