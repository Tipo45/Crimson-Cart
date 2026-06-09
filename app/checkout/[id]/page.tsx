"use client";

import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";

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
  const checkOutItems = useQuery(api.user.getCart)as CartItem[] | null | undefined;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={user?.firstName + " " + user?.lastName || "First Name" }
                disabled
                className="border placeholder:text-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                placeholder={user?.lastName || "Last Name"}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder={currentUser?.address || "City"}
                disabled
                className="placeholder:text-secondary border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
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

            <button className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Complete Order
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
