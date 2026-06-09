"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaEye,
} from "react-icons/fa";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

type Product = {
  _id: Id<"products">;
  name: string;
  category: string;
  price: number;
  averageRating?: number;
  reviewCount?: number;
};

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [quantities, setQuantities] = React.useState<Record<number, number>>({});
  const [loadingProduct, setLoadingProduct] =
    React.useState<Id<"products"> | null>(null);
  const addToCart = useMutation(api.user.addToCart);
  const addToWishlist = useMutation(api.user.addToWishlist);
  const [ripples, setRipples] = React.useState<Record<number, number>>({});


  const triggerRipple = (index: number) => {
    setRipples((prev) => ({
      ...prev,
      [index]: Date.now(),
    }));
  };

  const toWishList = async (productId: Id<"products">) => {
    if (!isSignedIn) {
      // User is not signed in, show toast and redirect to sign in  
      toast.error("Please sign in to add items to your wishlist");
      RedirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    try {
      setLoadingProduct(productId);

      await addToWishlist({
        productId,
      });

      toast.success(
      liked
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to wishlist");
    } finally {
      setLoadingProduct(null);
    }
  };

  const toCart = async (
    productId: Id<"products">,
    quantity: number
  ) => {
    
    if (!isSignedIn) {
      // User is not signed in, show toast and redirect to sign in
      toast.error("Please sign in to add items to your cart");
      RedirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    try {
      setLoadingProduct(productId);

      await addToCart({
        productId,
        quantity,
      });

      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart");
    } finally {
      setLoadingProduct(null);
    }
  };

  return (
    <div className="bg-tertiary border border-border rounded-xl overflow-hidden group hover:shadow-md transition">
      {/* Image Swap */}
      
        <div key={product._id}>
<div className="relative h-50 w-full bg-muted-section overflow-hidden">
        <img
          // src={product.image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          // src={product.hoverImage}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="p-3 space-y-3">
        <h3 className="font-semibold tablet:text-lg text-primart-text capitalize">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex-row gap-4 text-sm">
          <div className="flex text-warning">
            {[...Array(5)].map((_, i) =>
              i < Math.round(product.averageRating ?? 0) ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} />
              )
            )}
          </div>
          <span className="text-secondary-text">
            ({product.reviewCount ?? 0} review(s))
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">
            ₦{(product.price).toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <motion.button
            disabled={loadingProduct === product._id}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative 
          w-full rounded-md flex-1 bg-primary-button text-xs hover:bg-primary-button-hover text-tertiary p-2 flex items-center justify-center gap-2
          py-3 font-semibold
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-secondary/40
        disabled:opacity-50 cursor-pointer
    disabled:cursor-not-allowed"  onClick={() => {
              triggerRipple(index);

              toCart(
                product._id,
                quantities[index] || 1
              );
            }}
          >
            {loadingProduct === product._id
              ? <><FaShoppingCart /> Adding...</>
              :
              "Add to Cart"
              }
            {ripples[index] && (
              <motion.span
                key={ripples[index]}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 rounded-md bg-white/40"
              />
            )}
          </motion.button>
          
          
           {liked ? (<button
            // onClick={() => toWishList(product._id)}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center cursor-pointer"
          >
            <FaHeart className="text-yellow-400" />  
          </button>)
:
          (<button
            onClick={() => toWishList(product._id)}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center cursor-pointer"
          >
            <FaRegHeart />
          </button>)
          }
        </div>
      </div>
        </div>
    </div>
  );
}