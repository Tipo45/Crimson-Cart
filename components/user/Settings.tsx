import { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa, FaPlus, FaTrash } from "react-icons/fa6";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";
import { motion } from "framer-motion";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export default function Settings() {

  const validatePhoneNumber = (phone: string): string | null => {
    if (!phone.trim()) return "Phone number is required";
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 11) return "Phone number must be at least 11 digits";
    if (cleaned.length > 11) return "Phone number is too long";
    return null;
  };

  const validateCardNumber = (number: string): string | null => {
    if (!number.trim()) return "Card number is required";
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length !== 16) return "Card number must be 16 digits";
    // Luhn algorithm check
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i));
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    if (sum % 10 !== 0) return "Invalid card number";
    return null;
  };

  const validateCardName = (name: string): string | null => {
    if (!name.trim()) return "Cardholder name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(name)) return "Name should only contain letters and spaces";
    return null;
  };

  const validateExpiry = (expiry: string): string | null => {
    if (!expiry) return "Expiry date is required";
    const [year, month] = expiry.split('-');
    if (!year || !month) return "Invalid expiry format";
    const currentDate = new Date();
    const expDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    if (expDate < currentDate) return "Card has expired";
    return null;
  };

  const validateCVV = (cvv: string): string | null => {
    if (!cvv.trim()) return "CVV is required";
    const cleaned = cvv.replace(/\D/g, '');
    if (cleaned.length < 3 || cleaned.length > 4) return "CVV must be 3 or 4 digits";
    return null;
  };

  const validateBrand = (brand: string): string | null => {
    if (!brand.trim()) return "Brand is required";
    const validBrands = ['visa', 'mastercard', 'verve'];
    if (!validBrands.includes(brand.toLowerCase())) {
      return "Brand must be: Visa, Mastercard, Verve";
    }
    return null;
  };

  const [loading, setLoading] = useState(true);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  const { user } = useUser();
  const currentUser = useQuery(api.user.getCurrentUser);
  const updatePhoneNumber = useMutation(api.user.addPhoneNumber);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setIsPhoneTouched(true);
    const error = validatePhoneNumber(value);
    setPhoneError(error || "");
    setIsPhoneValid(!error);
  };

  const handlePhoneUpdate = async () => {
    const error = validatePhoneNumber(phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    await updatePhoneNumber({
      phoneNumber: phone,
    });

    toast.success("Phone Number Added successfully!");
    setPhone("");
    setShowPhoneForm(false);
    setIsPhoneTouched(false);
    setIsPhoneValid(false);
  };

  const settings = useQuery(api.user.getSettings);
  const updateSettings = useMutation(api.user.updateSettings);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: false,
  });

  const [showCardForm, setShowCardForm] = useState(false);
  const cards = useQuery(api.user.getCards) ?? [];
  const updateCards = useMutation(api.user.addCard);
  const deleteCard = useMutation(api.user.deleteCard);
  const [deletingId, setDeletingId] = useState<Id<"cards"> | null>(null);

  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  // Card validation states
  const [cardErrors, setCardErrors] = useState({
    brand: "",
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [cardTouched, setCardTouched] = useState({
    brand: false,
    name: false,
    number: false,
    expiry: false,
    cvv: false,
  });

  const handleCardChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setCardTouched({ ...cardTouched, [field]: true });

    let error = "";
    switch (field) {
      case "brand":
        error = validateBrand(value) || "";
        break;
      case "name":
        error = validateCardName(value) || "";
        break;
      case "number":
        error = validateCardNumber(value) || "";
        break;
      case "expiry":
        error = validateExpiry(value) || "";
        break;
      case "cvv":
        error = validateCVV(value) || "";
        break;
    }
    setCardErrors({ ...cardErrors, [field]: error });
  };

  const isCardFormValid = () => {
    return (
      !validateBrand(formData.brand) &&
      !validateCardName(formData.name) &&
      !validateCardNumber(formData.number) &&
      !validateExpiry(formData.expiry) &&
      !validateCVV(formData.cvv)
    );
  };

  const handleCardsUpdate = async () => {
    // Validate all fields
    const brandError = validateBrand(formData.brand);
    const nameError = validateCardName(formData.name);
    const numberError = validateCardNumber(formData.number);
    const expiryError = validateExpiry(formData.expiry);
    const cvvError = validateCVV(formData.cvv);

    setCardErrors({
      brand: brandError || "",
      name: nameError || "",
      number: numberError || "",
      expiry: expiryError || "",
      cvv: cvvError || "",
    });

    setCardTouched({
      brand: true,
      name: true,
      number: true,
      expiry: true,
      cvv: true,
    });

    if (brandError || nameError || numberError || expiryError || cvvError) {
      return;
    }

    await updateCards({
      brand: formData.brand,
      name: formData.name,
      number: formData.number,
      expiry: formData.expiry,
      cvv: formData.cvv,
    });

    toast.success("Card added successfully");

    setFormData({
      brand: "",
      name: "",
      number: "",
      expiry: "",
      cvv: "",
    });

    setCardErrors({
      brand: "",
      name: "",
      number: "",
      expiry: "",
      cvv: "",
    });

    setCardTouched({
      brand: false,
      name: false,
      number: false,
      expiry: false,
      cvv: false,
    });

    setShowCardForm(false);
  };

  const handleDelete = async (cardId: Id<"cards">) => {
    try {
      setDeletingId(cardId);
      await deleteCard({ cardId });
      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete card");
    } finally {
      setDeletingId(null);
    }
  };

  const handleNotificationChange = async (
    type: "email" | "sms" | "push"
  ) => {
    const updated = {
      ...notifications,
      [type]: !notifications[type],
    };

    setNotifications(updated);

    await updateSettings({
      emailNotifications: updated.email,
      smsNotifications: updated.sms,
      pushNotifications: updated.push,
    });

    toast.success("Settings updated");
  };

  const getCardIcon = (brand: string) => {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes("visa")) return <FaCcVisa className="text-blue-600" size={28} />;
    if (brandLower.includes("master")) return <FaCcMastercard className="text-orange-500" size={28} />;
    if (brandLower.includes("verve")) return <FaCcAmex className="text-blue-400" size={28} />;
    if (brandLower.includes("discover")) return <FaCcDiscover className="text-orange-400" size={28} />;
    return <span className="text-xl">💳</span>;
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (settings) {
      setNotifications({
        email: settings.emailNotifications ?? true,
        sms: settings.smsNotifications ?? false,
        push: settings.pushNotifications ?? true,
      });
    }
  }, [settings]);


  return (
    <>
      {loading ? (<SettingSkeleton />) : (<div className="space-y-10">

        {/* ================= PERSONAL INFO ================= */}
        <SectionWrapper title="Personal Information">
          <motion.div initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className="flex flex-col tablet:flex-row gap-6">


            {/* Info Fields */}
            <div className="flex-1 space-y-4">
              <EditableField label="Full Name" value={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : ""} />
              <EditableField label="Email" value={user?.emailAddresses[0]?.emailAddress || ""} />
              <EditableField label="Phone Number" value={currentUser?.phoneNumber || "not provided"} />

              {currentUser?.phoneNumber ? ("") : (<button onClick={() => setShowPhoneForm(!showPhoneForm)} className="px-2 py-4 bg-secondary text-tertiary rounded-2xl flex hover:opacity-80">
                Add Phone Number <FaPlusCircle className="ml-4 mt-0.5" size={20} />
              </button>)}
            </div>
          </motion.div>
        </SectionWrapper>

        {showPhoneForm && (
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
                  Phone Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter phone number (e.g., +2348000000000)"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${isPhoneTouched && phoneError
                      ? "border-red-500 focus:ring-red-500"
                      : isPhoneTouched && isPhoneValid
                        ? "border-green-500 focus:ring-green-500"
                        : "border-input-border"
                    }`}
                />
                {isPhoneTouched && phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
                {isPhoneTouched && isPhoneValid && (
                  <p className="text-green-500 text-sm mt-1">✓ Valid phone number</p>
                )}
                <p className="text-xs text-muted">Enter phone number with country code (e.g., +234...)</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePhoneUpdate}
                disabled={!isPhoneValid}
                className="px-6 py-3 rounded-lg bg-secondary text-tertiary hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowPhoneForm(false);
                  setPhone("");
                  setPhoneError("");
                  setIsPhoneTouched(false);
                  setIsPhoneValid(false);
                }}
                className="px-6 py-3 rounded-lg border border-input-border text-secondary-text hover:bg-muted transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= PAYMENT METHODS ================= */}
        <SectionWrapper title="Payment Methods">
          <motion.div initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className="space-y-4">

            {cards.map((card) => (
              <div
                key={card._id}
                className="flex items-center justify-between bg-muted-section border border-border rounded-lg p-4"
              >
                <div className="">
                  <div className="text-2xl font-bold tracking-wider">
                    {getCardIcon(card.brand)}
                  </div>
                </div>
                <div>
                  <p className="font-medium capitalize">
                    {card.brand} •••• {card.number.slice(-4)}
                  </p>
                  <p className="text-sm text-muted">
                    Expires {card.expiry}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(card._id)}
                  className="text-error hover:opacity-80"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <button onClick={() => setShowCardForm(!showCardForm)} className="flex items-center gap-2 px-4 py-2 border border-secondary-button-border bg-secondary-button text-secondary-button-text rounded-lg hover:bg-secondary-button-hover transition">
              <FaPlus />
              Add New Card
            </button>
          </motion.div>
        </SectionWrapper>
        {showCardForm && (<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-8 bg-tertiary border border-border rounded-xl p-6">

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary-text">
                Brand <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleCardChange("brand", e.target.value)}
                placeholder="Enter brand"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${cardTouched.brand && cardErrors.brand
                    ? "border-red-500 focus:ring-red-500"
                    : cardTouched.brand && !cardErrors.brand && formData.brand
                      ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"
                  }`}
              />
              {cardTouched.brand && cardErrors.brand && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.brand}</p>
              )}
            </div>


            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary-text">
                Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleCardChange("name", e.target.value)}
                onBlur={() => setCardTouched({ ...cardTouched, name: true })}
                placeholder="Enter name on card"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${cardTouched.name && cardErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : cardTouched.name && !cardErrors.name && formData.name
                      ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"
                  }`}
              />
              {cardTouched.name && cardErrors.name && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.name}</p>
              )}
            </div>


            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary-text">
                Card Number <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                  handleCardChange("number", value);
                }}
                onBlur={() => setCardTouched({ ...cardTouched, number: true })}
                placeholder="Enter 16 digit card number"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${cardTouched.number && cardErrors.number
                    ? "border-red-500 focus:ring-red-500"
                    : cardTouched.number && !cardErrors.number && formData.number.length === 16
                      ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"
                  }`}
                maxLength={16}
              />
              {cardTouched.number && cardErrors.number && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.number}</p>
              )}
              {cardTouched.number && !cardErrors.number && formData.number.length === 16 && (
                <p className="text-green-500 text-sm mt-1">✓ Valid card number</p>
              )}
              <p className="text-xs text-muted">Enter 16 digits without spaces</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary-text">
                Expiry Date <span className="text-red-500">*</span>
              </label>

              <input
                type="month"
                value={formData.expiry}
                onChange={(e) => handleCardChange("expiry", e.target.value)}
                onBlur={() => setCardTouched({ ...cardTouched, expiry: true })}
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${cardTouched.expiry && cardErrors.expiry
                    ? "border-red-500 focus:ring-red-500"
                    : cardTouched.expiry && !cardErrors.expiry && formData.expiry
                      ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"
                  }`}
              />
              {cardTouched.expiry && cardErrors.expiry && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.expiry}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary-text">
                CVV <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                  handleCardChange("cvv", value);
                }}
                onBlur={() => setCardTouched({ ...cardTouched, cvv: true })}
                placeholder="Enter CVV"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-secondary-button transition ${cardTouched.cvv && cardErrors.cvv
                    ? "border-red-500 focus:ring-red-500"
                    : cardTouched.cvv && !cardErrors.cvv && formData.cvv.length === 3
                      ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"
                  }`}
                maxLength={3}
              />
              {cardTouched.cvv && cardErrors.cvv && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>
              )}
              <p className="text-xs text-muted">3 digits on back of card</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleCardsUpdate}
              disabled={!isCardFormValid()}
              className="px-6 py-3 rounded-lg bg-secondary text-tertiary hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Card
            </button>
            <button
              onClick={() => {
                setShowCardForm(false);
                setFormData({ brand: "", name: "", number: "", expiry: "", cvv: "" });
                setCardErrors({ brand: "", name: "", number: "", expiry: "", cvv: "" });
                setCardTouched({ brand: false, name: false, number: false, expiry: false, cvv: false });
              }}
              className="px-6 py-3 rounded-lg border border-input-border text-secondary-text hover:bg-muted transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
        )}


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
              onToggle={() => handleNotificationChange("email")}
            />

            <NotificationToggle
              label="SMS Notifications"
              enabled={notifications.sms}
              onToggle={() => handleNotificationChange("sms")}
            />

            <NotificationToggle
              label="Push Notifications"
              enabled={notifications.push}
              onToggle={() => handleNotificationChange("push")}
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
                className="w-14 h-14 bg-error text-white rounded-full shadow-lg flex items-center justify-center hover:bg-error/90 transition cursor-pointer"
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