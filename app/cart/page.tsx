"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

export default function Cart() {
  const router = useRouter();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Beans",
      price: 120,
      quantity: 1,
      image: "/public/images/beans.jpg",
    },
    {
      id: 2,
      name: "Carrot",
      price: 80,
      quantity: 2,
      image: "/public/images/carrots.jpg",
    },
  ]);

  const increaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-primary py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-secondary mb-8">
          Your Cart
        </h1>

        {/* EMPTY CART STATE */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl shadow-md border">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/"
              className="bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-lg text-secondary">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.quantity === 1}
                          className={`px-3 py-1 font-bold transition ${
                            item.quantity === 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-secondary hover:bg-primary"
                          }`}
                        >
                          −
                        </button>

                        <span className="px-4">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-3 py-1 text-secondary font-bold hover:bg-primary transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-secondary hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow-md border space-y-4 h-fit">
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

              <div className="border-t pt-4 flex justify-between font-bold text-secondary">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button onClick={() => router.push("/checkout")} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
