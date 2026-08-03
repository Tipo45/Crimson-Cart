"use client"

import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function Registration() {

    const currentUser = useQuery(api.user.getCurrentUser);
    const createVendor = useMutation(api.user.addVendor);
    const vendor = useQuery(api.user.getVendor);
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const [formData, setFormData] = useState({
        businessName: "",
        phoneNumber: "",
        address: "",
        cacNumber: "",

    });

    const [errors, setErrors] = useState({
        businessName: "",
        phoneNumber: "",
        address: "",
        cacNumber: "",

    });

    const [touched, setTouched] = useState({
        businessName: false,
        phoneNumber: false,
        address: false,
        cacNumber: false,

    });

    const resetForm = () => {
        setFormData({
            businessName: "",
            phoneNumber: "",
            address: "",
            cacNumber: "",

        });

        setErrors({
            businessName: "",
            phoneNumber: "",
            address: "",
            cacNumber: "",

        });

        setTouched({
            businessName: false,
            phoneNumber: false,
            address: false,
            cacNumber: false,

        });
    };

    const validateBusinessName = (businessName: string): string | null => {
        if (!businessName.trim()) return "Business Name is required";
        if (businessName.length < 3) return "Business Name must be at least 3 characters";
        return null;
    };

    const validatePhoneNumber = (phoneNumber: string): string | null => {
        if (!phoneNumber.trim()) return "Phone number is required";
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.length < 11) return "Phone number must be at least 11 digits";
        if (cleaned.length > 11) return "Phone number is too long";
        return null;
    };

    const validateAddress = (address: string): string | null => {
        if (!address.trim()) return "Address is required";
        if (address.length < 10) return "Address must be at least 10 characters";
        return null;
    };

    const validateCACNumber = (cacNumber: string): string | null => {
        if (!cacNumber.trim()) return "CAC Number is required";
        if (cacNumber.length < 8) return "CAC Number must be at least 8 characters";
        return null;
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        setTouched({ ...touched, [field]: true });

        let error = "";
        switch (field) {
            case "businessName":
                error = validateBusinessName(value) || "";
                break;
            case "phoneNumber":
                error = validatePhoneNumber(value) || "";
                break;
            case "address":
                error = validateAddress(value) || "";
                break;
            case "cacNumber":
                error = validateCACNumber(value) || "";
                break;
        }
        setErrors({ ...errors, [field]: error });
    };

    const isFormValid = () => {
        return (
            !validateBusinessName(formData.businessName) &&
            !validatePhoneNumber(formData.phoneNumber) &&
            !validateAddress(formData.address) &&
            !validateCACNumber(formData.cacNumber)
        );
    };

    const handleSubmit = async () => {
        const businessNameError = validateBusinessName(formData.businessName);
        const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
        const addressError = validateAddress(formData.address);
        const cacError = validateCACNumber(formData.cacNumber);

        setErrors({
            businessName: businessNameError || "",
            phoneNumber: phoneNumberError || "",
            address: addressError || "",
            cacNumber: cacError || "",

        });

        setTouched({
            businessName: true,
            phoneNumber: true,
            address: true,
            cacNumber: true,
        });

        if (businessNameError || phoneNumberError || addressError || cacError) {
            return;
        }
        try {
            setLoading(true);

            if (vendor) {
                toast("Vendor account exists already")
            }

            await createVendor({
                businessName: formData.businessName,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                cacNumber: formData.cacNumber,
            });
            toast.success("Your vendor application has been submitted for review.")

            resetForm();

            route.push("/vendor/application-status"
            );
        } catch (error) {
            console.error(error);
            {vendor ? ("") : (toast.error("Failed to create vendor"))}
        } finally {
            setLoading(false);
        }
    };




    return (
        <section className="min-h-screen bg-primary py-12 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto mt-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold">
                        Become a Vendor
                    </h1>

                    <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                        Complete your business information to start selling products on
                        Crimson Cart. Your application will be reviewed before approval.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-2">
                    <div>
                        <label className="text-sm text-secondary-text">Business Name:</label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => handleChange("businessName", e.target.value)}
                            placeholder="Enter business name"
                            required
                            maxLength={100}
                            className={`w-full rounded-lg px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-secondary-button transition ${touched.businessName && errors.businessName ? "border-red-500 focus:ring-red-500" : touched.businessName && !errors.businessName && formData.businessName ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}
                        />
                        {touched.businessName && errors.businessName && (<p className="text-red-500 text-sm mt-1">{errors.businessName}</p>)}
                    </div>

                    <div>
                        <label className="text-sm text-secondary-text">Email:</label>
                        <p className={`bg-white disabled:opacity-80 w-full rounded-lg px-4 py-3 outline ${currentUser?.email === "" ? " outline-red-500" : "outline-green-500"}  focus-ring-2 focus:ring-secondary-button text-black`}>
                            {currentUser?.email}
                        </p>
                    </div>

                    <div>
                        <label className="text-sm text-secondary-text">Phone Number:</label>
                        <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            placeholder="Enter phone number"
                            required
                            className={`w-full rounded-lg px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-secondary-button transition ${touched.phoneNumber && errors.phoneNumber ? "border-red-500 focus:ring-red-500" : touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>)}
                    </div>

                    <div>
                        <label className="text-sm text-secondary-text">Address:</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="Enter business address"
                            required
                            minLength={10}
                            className={`w-full rounded-lg px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-secondary-button transition ${touched.address && errors.address ? "border-red-500 focus:ring-red-500" : touched.address && !errors.address && formData.address ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}
                        />
                        {touched.address && errors.address && (<p className="text-red-500 text-sm mt-1">{errors.address}</p>)}
                    </div>

                    <div>
                        <label className="text-sm text-secondary-text">CAC Registration Number:</label>
                        <input
                            type="text"
                            value={formData.cacNumber}
                            onChange={(e) => handleChange("cacNumber", e.target.value)}
                            placeholder="e.g BN 123456"
                            required
                            className={`w-full rounded-lg px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-secondary-button transition ${touched.cacNumber && errors.cacNumber ? "border-red-500 focus:ring-red-500" : touched.cacNumber && !errors.cacNumber && formData.cacNumber ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}
                        />
                        {touched.cacNumber && errors.cacNumber && (<p className="text-red-500 text-sm mt-1">{errors.cacNumber}</p>)}
                    </div>

                    <div>
                        <label className="text-sm text-secondary-text">Logo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="bg-white px-4 py-3"
                        />

                    </div>
                </div>

                <div className="py-6 flex justify-center">
                    {loading ? (<button className="bg-primary-button hover:bg-primary-button/90 cursor-pointer px-4 py-2 text-white rounded-lg">Submitting...</button>) : (<button onClick={handleSubmit} disabled={!isFormValid} className="bg-primary-button hover:bg-primary-button/90 cursor-pointer px-4 py-2 text-white rounded-lg">Submit</button>)}
                </div>
            </div>

        </section>
    )
}