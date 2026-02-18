"use client";

import { useState } from "react";

export default function Checkout() {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const subtotal = 280; // example subtotal
  const shipping = 10;

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

  const total = subtotal + shipping - discount;

  return (
    <section className="min-h-screen bg-primary py-12 px-4">
      <div className="max-w-6xl mx-auto">

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
                placeholder="First Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                placeholder="State"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
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
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shipping}</span>
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
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
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
                  Coupon applied! -${discount.toFixed(2)}
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between font-bold text-secondary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
