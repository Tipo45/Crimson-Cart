"use client";

import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";


type CartItem = {
  _id: Id<"cart">;
  productId: Id<"products">;
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageId?: string;
  imageUrl?: string;
};

export default function Checkout() {
  const { user, isSignedIn } = useUser();
  const storeUser = useMutation(api.user.store);
  const currentUser = useQuery(api.user.getCurrentUser);
  const checkOutItems = useQuery(api.user.getCart) as CartItem[] | null | undefined;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [selectAddress, setSelectedAddress] = useState("");

  const addresses = useQuery(api.user.getAddresses) ?? [];
  const [showForm, setShowForm] = useState(false);
  const updateAddress = useMutation(api.user.addAddress);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const handleUpdate = async () => {
    await updateAddress({
      street: formData.street,
      city: `${formData.city}, ${formData.state}`,
      country: formData.country,
    });

    toast.success("Address added successfully!");

    setFormData({
      street: "",
      city: "",
      state: "",
      country: "",
    });

    setShowForm(false);
  };

  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);
  

  if (checkOutItems === undefined) {
    return (
      <section className="min-h-screen bg-primary py-12 px-4">
        <Navbar />
        <div className="max-w-6xl mx-auto mt-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!checkOutItems) return <div>Failed to load checkout.</div>;

  const subtotal = checkOutItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const shippingPercentage = 0.10; // 10% shipping fee

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1);
      setCouponError("");
    } else if (coupon.toLowerCase() === "save20") {
      setDiscount(subtotal * 0.2);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
    }
  };

  const shipping = checkOutItems.length > 0 ? shippingPercentage * subtotal : 0;
  const total = subtotal + shipping - discount;



  return (
    <section className="min-h-screen bg-primary py-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10">

        <h1 className="text-3xl font-bold text-secondary mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Billing Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md border space-y-6">

            <h2 className="text-xl font-bold text-secondary">
              Billing Details
            </h2>

            <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={user?.firstName + " " + user?.lastName || "Full Name"}
                disabled
                className="border placeholder:text-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <input
              type="email"
              placeholder={currentUser?.email || "email"}
              disabled
              className="w-full placeholder:text-secondary border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <input
              type="text"
              placeholder={currentUser?.phoneNumber || "Phone Number"}
              disabled
              className="w-full placeholder:text-secondary border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <div className="grid grid-cols-1 gap-4">
              {addresses.length === 0 ? (<div>
                No address provided to choose from
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-input-border rounded-xl p-6 bg-tertiary hover:bg-secondary-button transition text-secondary-text"
                >
                  {/* <div className="w-10 h-10 rounded-full bg-secondary-button flex items-center justify-center">
                                                <IoAdd size={20} className="text-secondary-button-text" />
                                            </div> */}
                  <span className="text-sm font-medium">Add New Address</span>
                </button>
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
              </div>) : (<FieldGroup className="w-full max-w-xs placeholder:text-secondary border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary">
                <Field>
                  <Select value={selectAddress}
  onValueChange={(value) => setSelectedAddress(value ?? "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an address" />
                    </SelectTrigger> 
                    <SelectContent>
                      <SelectGroup>
                        {addresses.map((address) => (
                          <SelectItem key={address._id} value={`${address.street}, ${address.city}, ${address.country}`}>
                            {address.street}, {address.city}, {address.country}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>)}
            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md border space-y-4 h-fit">

            <h2 className="text-xl font-bold text-secondary">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₦ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₦ {shipping.toLocaleString()}</span>
            </div>

            {/* Coupon Field */}
            <div className="space-y-2 pt-4 border-t">
              <label className="text-sm font-medium text-secondary">
                Coupon Code
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon"
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary w-30"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-sm text-red-500">
                  {couponError}
                </p>
              )}

              {discount > 0 && (
                <p className="text-sm text-green-600">
                  Coupon applied! -₦ {discount.toLocaleString()}
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between font-bold text-secondary">
              <span>Total</span>
              <span>₦ {total.toLocaleString()}</span>
            </div>

            <button disabled={!selectAddress} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              Complete Order
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
