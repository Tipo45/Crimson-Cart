import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";

type Card = {
    id: number;
    brand: string;
    last4: string;
    expiry: string;
};

export default function Settings() {

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
            <div className="space-y-10">

                {/* ================= PERSONAL INFO ================= */}
                <SectionWrapper title="Personal Information">
                    <div className="flex flex-col tablet:flex-row gap-6">

                        {/* Avatar */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                                SA
                            </div>
                            <button className="text-accent-text text-sm hover:underline">
                                Change Avatar
                            </button>
                        </div>

                        {/* Info Fields */}
                        <div className="flex-1 space-y-4">
                            <EditableField label="Full Name" value="Steven Azebi" />
                            <EditableField label="Email" value="tipo4542@gmail.com" />
                            <EditableField label="Phone" value="+234 813 585 4955" />
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