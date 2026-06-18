import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

type Address = {
    _id: Id<"address">,
    street: string,
    city: string,
    state: string,
    country: string,
};

export default function Address() {

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<Id<"address"> | null>(
        null
    );
    const [deletingId, setDeletingId] = useState<Id<"address"> | null>(null);
    const { user } = useUser();
    const addAddress = useMutation(api.user.addAddress);
    const updateAddress = useMutation(api.user.updateAddress);
    const addresses =
        useQuery(api.user.getAddresses) ?? [];
    const deleteAddress = useMutation(api.user.deleteAddress);
    const currentUser = useQuery(api.user.getCurrentUser);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
    });

    const resetForm = () => {
        setFormData({
            street: "",
            city: "",
            state: "",
            country: "",
        });
        setEditingAddressId(null);
        setShowForm(false);
    };

    const handleEditClick = (address: Address) => {
        setEditingAddressId(address._id);

        setFormData({
            street: address.street,
            city: address.city,
            state: address.state,
            country: address.country,
        });

        setShowForm(true);
    };

    const handleSaveAddress = async () => {
        try {
            setSaveLoading(true);
            if (editingAddressId) {
                // Update existing address
                await updateAddress({
                    addressId: editingAddressId,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                });
                toast.success("Address updated successfully!");
            } else {
                // Add new address
                await addAddress({
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                });
                toast.success("Address added successfully!");
            }
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error(
                editingAddressId
                    ? "Failed to update address"
                    : "Failed to add address"
            );
        } finally {
            setSaveLoading(false);
        }
    };


    const handleDelete = async (addressId: Id<"address">) => {
        try {
            setDeletingId(addressId);
            await deleteAddress({ addressId });
            toast.success("Address deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete address");
        } finally {
            setDeletingId(null);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {loading ? (<SettingSkeleton />) : (
                <div>
                    <motion.h2 initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }} className="text-xl font-semibold mb-6">Saved Addresses</motion.h2>

                    {addresses.length === 0 && (
                        <div className="bg-tertiary border border-dashed border-border rounded-xl p-10 text-center">
                            <p className="text-secondary-text mb-4">
                                You don't have any saved addresses yet.
                            </p>

                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 bg-secondary text-tertiary rounded-lg"
                            >
                                Add Address
                            </button>
                        </div>
                    )}
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
                                key={address._id}
                                variants={{
                                    hidden: { opacity: 0, y: 25 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="relative bg-tertiary border border-border rounded-xl p-6"
                            >
                                <div className="space-y-1 text-sm">
                                    <p className="font-semibold">
                                        {user?.fullName}
                                    </p>

                                    <p className="capitalize">{address.street}</p>

                                    <p>{address.city}</p>

                                    <p>{address.country}</p>

                                    <p>{currentUser?.phoneNumber}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => handleEditClick(address)} className="flex items-center gap-2 text-secondary-button-text hover:text-secondary transition text-sm cursor-pointer"> <FaEdit size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(address._id)} className="flex items-center gap-2 text-error hover:opacity-80 transition text-sm cursor-pointer">  {deletingId === address._id ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <FaTrash size={14} /> Delete
                                        </>
                                    )}</button> </div>
                            </motion.div>
                        ))}


                        {/* Add New Address Card */}
                        {addresses.length > 0 && (<button
                            onClick={() => {
                                setShowForm(!showForm);
                                setEditingAddressId(null);
                                setFormData({
                                    street: "",
                                    city: "",
                                    state: "",
                                    country: "",
                                });
                            }}

                            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-input-border rounded-xl p-6 bg-tertiary hover:bg-secondary-button transition text-secondary-text"
                        >
                            <div className="w-10 h-10 rounded-full bg-secondary-button flex items-center justify-center">
                                <IoAdd size={20} className="text-secondary-button-text" />
                            </div>
                            <span className="text-sm font-medium">Add New Address</span>
                        </button>)}
                    </motion.div>
                    {(showForm || editingAddressId) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 bg-tertiary border border-border rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold mb-6 text-primary-text">
                                {editingAddressId ? "Edit Address" : "Add New Address"}
                            </h3>

                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                                {/* Street Address */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">
                                        House Address
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Enter house address"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* City */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* State */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>

                                {/* Country */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-secondary-text">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Enter country"
                                        className="w-full rounded-lg border border-input-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4 mt-6">
                                <button
                                    onClick={handleSaveAddress}
                                    disabled={saveLoading}
                                    className="px-6 py-3 rounded-lg bg-secondary text-tertiary hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saveLoading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {editingAddressId ? "Updating..." : "Saving..."}
                                        </span>
                                    ) : (
                                        editingAddressId ? "Update Address" : "Save Address"
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(false);
                                    }}
                                    disabled={saveLoading}
                                    className="px-6 py-3 rounded-lg border border-input-border text-secondary-text hover:bg-muted transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </>
    )
}