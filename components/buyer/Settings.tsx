import { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import SettingSkeleton from "../skeletonui/buyer/SettingsSkeleton";
import { motion } from "framer-motion";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type Card = {
    id: number;
    brand: string;
    last4: string;
    expiry: string;
};

export default function Settings() {

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [phone, setPhone] = useState("");
    const { user } = useUser();
    const currentUser = useQuery(api.user.getCurrentUser);
    const updatePhoneNumber = useMutation(api.user.addPhoneNumber);
    



    const handleUpdate = async () => {
        await updatePhoneNumber({
            phoneNumber: phone,
        });

        toast.success("Phone Number Added successfully!");

        setPhone("");


        setShowForm(false);
    };



    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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
        <>
            {loading ? (<SettingSkeleton />) : (<div className="space-y-10">

                {/* ================= PERSONAL INFO ================= */}
                <SectionWrapper title="Personal Information">
                    <motion.div initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="flex flex-col tablet:flex-row gap-6">

                        {/* Avatar */}
                        {/* <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                                {user?.firstName?.charAt(0) || "?"}{user?.lastName?.charAt(0) || "?"}
                            </div>
                            <button className="text-accent-text text-sm hover:underline">
                                Change Avatar
                            </button>
                        </div> */}

                        {/* Info Fields */}
                        <div className="flex-1 space-y-4">
                            <EditableField label="Full Name" value={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : ""} />
                            <EditableField label="Email" value={user?.emailAddresses[0]?.emailAddress || ""} />
                            <EditableField label="Phone Number" value={currentUser?.phoneNumber || "not provided"} />

                            {currentUser?.phoneNumber ? (<button onClick={() => setShowForm(!showForm)} className="px-2 py-4 bg-secondary text-tertiary rounded-2xl flex hover:opacity-80">
                                Change Phone Number <FaPlusCircle className="ml-4 mt-0.5" size={20} />
                            </button>):(<button onClick={() => setShowForm(!showForm)} className="px-2 py-4 bg-secondary text-tertiary rounded-2xl flex hover:opacity-80">
                                Add Phone Number <FaPlusCircle className="ml-4 mt-0.5" size={20} />
                            </button>)}
                        </div>
                    </motion.div>
                </SectionWrapper>

                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 bg-tertiary border border-border rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-6 text-primary-text">
                        New Phone Number
                        </h3>

                        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">

                            {/* Phone Number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-secondary-text">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter phone number"
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
                                Save
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


                {/* ================= SECURITY ================= */}
                <SectionWrapper title="Security">
                    <motion.div initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="space-y-6">

                        {/* <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Change Password</p>
                                <p className="text-sm text-muted">
                                    Update your account password regularly.
                                </p>
                            </div>
                            <button className="px-4 py-2 bg-primary-button text-tertiary rounded-lg hover:bg-primary-button-hover transition">
                                Update
                            </button>
                        </div> */}

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-muted">
                                    Add extra security to your account.
                                </p>
                            </div>
                            <Toggle enabled={twoFA} setEnabled={setTwoFA} />
                        </div>

                    </motion.div>
                </SectionWrapper>


                {/* ================= PAYMENT METHODS ================= */}
                <SectionWrapper title="Payment Methods">
                    <motion.div initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="space-y-4">

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
                    </motion.div>
                </SectionWrapper>


                {/* ================= NOTIFICATIONS ================= */}
                <SectionWrapper title="Notifications">
                    <motion.div initial={{ opacity: 0, y: -20 }}
                        whileInView="visible"
                        viewport={{ once: true }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }} className="space-y-5">

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

                    </motion.div>
                </SectionWrapper>


                {!loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="fixed bottom-6 right-6"
                    >
                        <SignOutButton redirectUrl="/?logout=success">
                            <button
                                className="w-14 h-14 bg-error text-white rounded-full shadow-lg flex items-center justify-center hover:bg-error/90 transition"
                            >
                                <FaSignOutAlt size={20} />
                            </button>
                        </SignOutButton>

                    </motion.div>
                )}
            </div>)}
        </>
    )
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
    value: any;
}) {
    return (
        <div className="flex items-center justify-between border-b border-divider pb-3">
            <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
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