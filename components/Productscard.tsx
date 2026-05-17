"use client";

import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaEye,
} from "react-icons/fa";

export default function ProductCard({ product }: any) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-tertiary border border-border rounded-xl overflow-hidden group hover:shadow-md transition">

      {/* Image Swap */}
      <div className="relative h-64 bg-muted-section overflow-hidden">
        <img
          src={product.image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="p-6 space-y-3">
        <p className="text-xs text-muted">{product.brand}</p>
        <h3 className="font-semibold text-primart-text">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex text-warning">
            {[...Array(5)].map((_, i) =>
              i < Math.round(product.rating) ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} />
              )
            )}
          </div>
          <span className="text-secondary-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-muted line-through text-sm">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-primary-button text-xs hover:bg-primary-button-hover text-tertiary p-2 rounded-lg flex items-center justify-center gap-2">
            <FaShoppingCart /> Add to Cart
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center"
          >
            {liked ? <FaHeart className="text-error" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}