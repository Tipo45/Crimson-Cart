"use client";

import { useState } from "react";
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



export default function ProductDetails() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const params = useParams();
  const { redirectToSignIn } = useClerk();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productID = params.id as Id<"products">;
  // Fetch product details
  const product = useQuery(
  api.user.getProductById,
  productID ? { productId: productID } : "skip"
);

  const addToCart = useMutation(api.user.addToCart);

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
      await addToCart({
        productId: productID,
        quantity,
      });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => Math.max(1, prev - 1));

  

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
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-secondary dark:text-white hover:text-primary transition"
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
            <h1 className="text-3xl lg:text-4xl font-bold text-secondary-dark dark:text-white capitalize">
              {product.name}
            </h1>

            <p className="text-gray-600 dark:text-muted-gray leading-relaxed">
              {/* {product.description} */}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-secondary">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₦{(product.price * 1.5).toLocaleString()}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-secondary-dark dark:text-white">Quantity:</span>
              <div className="flex bg-tertiary items-center border rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  −
                </button>
                <span className="px-4 min-w-10 text-center">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-secondary/90 transition cursor-pointer"
              >
                <FaShoppingCart />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-primary transition"
              >
                <FaHeart className="text-gray-500 hover:text-red-500 transition" />
              </motion.button>

            </div>

            {/* Product Details Tabs */}
            <div className="border-t pt-6 mt-6">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold text-secondary-dark dark:text-white mb-2">Category</h3>
                  <p className="text-gray-600 dark:text-muted-gray capitalize">{product.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-dark dark:text-white mb-2">Stock Status</h3>
                  {/* <p className="text-green-600">In Stock ({product.stock} available)</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}