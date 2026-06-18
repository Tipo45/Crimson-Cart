"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";
import { toast } from "sonner";
import { useClerk, useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { FaRegHeart, FaRegStar, FaStar } from "react-icons/fa6";
import FloatingCart from "@/components/Floatingcart";
import Navbar from "@/components/Navbar";


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

export default function ProductDetails() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const params = useParams();
  const { redirectToSignIn } = useClerk();
  const [cartLoading, setCartLoading] =
    useState<Id<"products"> | null>(null);
  const [wishlistLoading, setWishlistLoading] =
    useState<Id<"products"> | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);

  const productID = params.id as Id<"products">;
  const cartItems =
    useQuery(api.user.getCart) as CartItem[] | undefined;

  const cartItem = cartItems?.find(
    (item) => item.productId === productID
  );
  const product = useQuery(
    api.user.getProductById,
    productID ? { productId: productID } : "skip"
  );

  const ratingsData = useQuery(
    api.user.getProductRatings,
    productID ? { productId: productID } : "skip"
  );

  const toggleWishlist = useMutation(api.user.toggleWishlist);
  const wishlist = useQuery(api.user.getWishlist) ?? [];

  const wishlistIds = new Set(
    wishlist.map((item) => item.productId)
  );
  const isWishlisted = wishlistIds.has(productID)
  const addToCart = useMutation(api.user.addToCart);
  const updateCartQuantity = useMutation(api.user.updateCartQuantity);

  const handleWishList = async (productId: Id<"products">) => {

    if (!isSignedIn) {
      // User is not signed in, show toast and redirect to sign in  
      toast.error("Please sign in to add items to your wishlist");
      redirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    try {
      setWishlistLoading(productId);

      const result = await toggleWishlist({
        productId,
      });


      toast.success(
        result.action === "added"
          ? "Added to wishlist"
          : "Removed from wishlist"
      );
    } catch (error) {
      console.error(error);
      toast.error("Wishlist update failed");
    } finally {
      setWishlistLoading(null);
    }
  };

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      // User is not signed in, show toast and redirect to sign in  
      toast.error("Please sign in to add items to your wishlist");
      redirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    try {
      setCartLoading(productID);

      await addToCart({
        productId: productID,
        quantity: 1,
      });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleIncreaseQty = async () => {
    if (!cartItem) return;

    try {
      await updateCartQuantity({
        cartItemId: cartItem._id,
        quantity: cartItem.quantity + 1,
      });

      toast.success("Quantity updated");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleDecreaseQty = async () => {
    if (!cartItem) return;

    if (cartItem.quantity <= 1) {
      return;
    }

    try {
      await updateCartQuantity({
        cartItemId: cartItem._id,
        quantity: cartItem.quantity - 1,
      });

      toast.success("Quantity updated");
    } catch {
      toast.error("Failed to update quantity");
    }
  };




  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-primary dark:bg-dark-background py-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-secondary dark:text-white hover:text-secondary/70 transition"
        >
          <FaArrowLeft size={16} />
          Back to Products
        </button>

        {/* Product Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden bg-white">
              {/* <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              /> */}
            </div>
            {/* Thumbnail Gallery */}
            {/* <div className="flex gap-3">
              {[product.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary-text capitalize">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex text-warning">
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(ratingsData?.averageRating ?? 0) ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </div>
                {/* <span className="text-secondary-text ml-1">
                  {ratingsData?.averageRating ?? 0}
                </span> */}


                <span className="text-secondary-text">
                  {ratingsData?.reviewCount ?? 0} review{(ratingsData?.reviewCount ?? 0) !== 1 && "s"}
                </span>

                <span className="text-secondary-text">
                  Sold by:
                  <span className="font-semibold text-secondary ml-1">
                    Crimson Stores
                  </span>
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-muted-gray leading-relaxed">
              {/* {product.description} */}
            </p>

            <div className="bg-tertiary rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-secondary">
                  ₦{product.price.toLocaleString()}
                </span>

                <span className="text-lg text-secondary-text line-through">
                  ₦{(product.price * 1.5).toLocaleString()}
                </span>

                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Save {Math.round(((product.price * 1.5 - product.price) / (product.price * 1.5)) * 100)}%
                </span>
              </div>
            </div>

            <div className="bg-tertiary border border-border rounded-xl p-4">
              <h3 className="font-semibold text-primary-text mb-3">
                Vendor Information
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Vendor</span>
                  <span className="font-medium">Crimson Stores</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-text">Rating</span>
                  <span className="text-yellow-500">⭐ 4.8/5</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-text">Products Sold</span>
                  <span>1,250+</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}


            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {cartItem ? (<div className="p-4">
                <div className="bg-tertiary flex items-center justify-between ">

                  <div className="flex items-center rounded-lg overflow-hidden border border-border w-50">
                    <button
                      onClick={handleDecreaseQty}
                      disabled={cartItem.quantity === 1}
                      className={`px-8 py-4 hover:bg-muted-section ${cartItem.quantity === 1 ? "text-gray-400 cursor-not-allowed"
                        : "text-secondary hover:bg-primary"}`}
                    >
                      −
                    </button>

                    <span className="px-6 font-semibold">
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={handleIncreaseQty}
                      className="px-8 py-4 text-secondary hover:bg-muted-section"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>) : (<motion.button
                disabled={cartLoading === product._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-secondary/90 transition cursor-pointer"
              >
                <FaShoppingCart />
                Add to Cart
              </motion.button>)}


              <div className="py-5"><motion.button
                onClick={() => handleWishList(product._id)}
                disabled={wishlistLoading === product._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-primary transition disabled:opacity-50 cursor-pointer
          disabled:cursor-not-allowed"
              >
                {isWishlisted ? (
                  <FaHeart size={20} className="text-yellow-400" />
                ) : (
                  <FaHeart size={18} className="text-gray-500 hover:text-yellow-400" />
                )}
              </motion.button></div>
            </div>

            <div className="border-t border-border pt-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Customer Reviews
              </h2>

              <div className="bg-tertiary border border-border rounded-xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-4xl font-bold text-secondary">
                      {ratingsData?.averageRating ?? 0}
                    </h3>
                    <p className="text-sm text-secondary-text">
                      Average Rating
                    </p>
                  </div>

                  <div className="flex text-yellow-500 text-xl">
                    {[...Array(5)].map((_, i) =>
                    i < Math.round(ratingsData?.averageRating ?? 0) ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                  </div>
                </div>

                <p className="text-secondary-text">
                  Based on {ratingsData?.reviewCount ?? 0} verified customer reviews.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {ratingsData?.reviews?.length ? (
                ratingsData.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-tertiary border border-border rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        {review.userName ?? "Anonymous"}
                      </p>

                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) =>
                          i < (review.rating ?? 0) ? (
                            <FaStar key={i} />
                          ) : (
                            <FaRegStar key={i} />
                          )
                        )}
                      </div>
                    </div>

                    <p className="text-secondary-text mt-2 capitalize">
                      {review.review}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-tertiary border border-border rounded-xl p-4 text-center">
                  No reviews yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FloatingCart />
    </section>
  );
}