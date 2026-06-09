"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

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

export default function Cart() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const currentUser = useQuery(api.user.getCurrentUser);
  const goToCheckOutPage = () => {
  if (!currentUser) return;

  router.push(`/checkout/${currentUser._id}`);
};

  // ================= STORE USER =================
  const storeUser = useMutation(api.user.store);
  const cartItems = useQuery(api.user.getCart) as CartItem[] | null | undefined;
  const removeFromCart = useMutation(api.user.removeFromCart);
  const updateCartQuantity = useMutation(api.user.updateCartQuantity);
  

  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);

  if (cartItems === undefined) {
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

  if (!cartItems) return <div>Failed to load cart.</div>;

  const removeItem = async (item: CartItem) => {
    try {
      await removeFromCart({ cartItemId: item._id });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const increaseQty = async (item: CartItem) => {
    console.log("Increasing quantity for item:", item);
    try {
      await updateCartQuantity({
        cartItemId: item._id,
        quantity: item.quantity + 1,
      });

      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

    const decreaseQty = async (item: CartItem) => {
      try {
        await updateCartQuantity({
          cartItemId: item._id,
          quantity: item.quantity - 1,
        });
        toast.success("Quantity updated");
      } catch (error) {
        toast.error("Failed to update quantity");
      }
    };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const shippingPercentage = 0.10; // 10% shipping fee

  const shipping = cartItems.length > 0 ? shippingPercentage * subtotal : 0;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-primary py-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10">

        <h1 className="text-3xl font-bold text-secondary mb-8">
          {user?.firstName || 'Customer'}'s Cart
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
                  key={item._id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.imageUrl || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-lg text-secondary capitalize">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        ₦ {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item)}
                          disabled={item.quantity === 1}
                          className={`px-3 py-1 font-bold transition ${item.quantity === 1
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
                          onClick={() => increaseQty(item)}
                          className="px-3 py-1 text-secondary font-bold hover:bg-primary transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item)}
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
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₦ {shipping.toLocaleString()}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-secondary">
                <span>Total</span>
                <span>₦ {total.toLocaleString()}</span>
              </div>

              <button onClick={goToCheckOutPage} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
