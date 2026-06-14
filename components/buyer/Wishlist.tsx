import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import WishlistSkeleton from "../skeletonui/buyer/WishlistSkeleton";
import { useEffect, useState } from "react";
import { motion, removeItem } from "framer-motion";
import Providers from "@/app/providers";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

type Product = {
    _id: Id<"products">;
    name: string;
    price: number;
    // image: string;  
}

type WishlistItem = {
    _id: Id<"wishlist">;
    productId: Id<"products">;
    product: Product | null;
};


export default function Wishlist() {
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState<Id<"products"> | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const wishListItems = useQuery(api.user.getWishlist);
    const addToCart = useMutation(api.user.addToCart);
    const cartItems = useQuery(api.user.getCart) ?? [];

    const validCartItems = cartItems.filter(
        (item): item is CartItem => item !== null
    );

    const cartMap = new Map<Id<"products">, CartItem>(
  validCartItems.map(item => [item.productId, item])
);

    const toCart = async (
        productId: Id<"products">,
        quantity: number
    ) => {

        try {
            setCartLoading(productId);

            await addToCart({
                productId,
                quantity,
            });

            toast.success("Item added to cart successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add item to cart");
        } finally {
            setCartLoading(null);
        }
    };

    return (
        <>
            {/* Wishlist */}
            {loading ? [...Array(4)].map((_, i) => <WishlistSkeleton key={i} />) : (
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-primart-text">
                        My Wishlist
                    </h2>

                    {/* GRID */}
                    <motion.div initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.5
                                },
                            },
                        }} className="grid grid-cols-2 tablet:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishListItems?.map((item) => {
                            if (!item.product) return null;

                            return (
                                <WishlistCard
                                    key={item._id}
                                    item={item}
                                    cartItem={cartMap.get(item.productId) ?? null}
                                    onAddToCart={toCart}
                                    cartLoading={cartLoading}
                                    isInCart={cartMap.has(item.productId)}
                                />
                            );
                        })}
                    </motion.div>
                </div>)}
        </>
    )
}

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

type WishlistCardProps = {
    item: WishlistItem;
    cartItem: CartItem | null;
    isInCart: boolean;
    onAddToCart: (
        productId: Id<"products">,
        quantity: number
    ) => Promise<void>;
    cartLoading: Id<"products"> | null;
};

function WishlistCard({ item, cartItem, onAddToCart, cartLoading, isInCart }: WishlistCardProps) {

    const updateCartQuantity = useMutation(api.user.updateCartQuantity);
    const removeFromWishlist = useMutation(api.user.removeFromWishlist);

    const removeItem = async () => {
        try {
            await removeFromWishlist({ wishlistItemId: item._id });
            toast.success("Item removed from wishlist");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };

    const increaseQty = async () => {
        if (!cartItem) return;
        try {
            await updateCartQuantity({
                cartItemId: cartItem._id,
                quantity: cartItem.quantity + 1,
            });

            toast.success("Quantity updated");
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const decreaseQty = async () => {
        if (!cartItem) return;
        try {
            await updateCartQuantity({
                cartItemId: cartItem._id,
                quantity: cartItem.quantity - 1,
            });
            toast.success("Quantity updated");
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };
    return (
        <div className="
      bg-tertiary 
      border border-border 
      rounded-xl 
      overflow-hidden 
      transition 
      hover:shadow-md
    ">
            <div className="relative w-full h-40 bg-muted-section">
                {/* <Image
                    src={item.image}
                    alt={item.product?.name}
                    fill
                    className="object-cover"
                /> */}
            </div>

            <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-primart-text line-clamp-2 capitalize">
                    {item.product?.name}
                </h3>

                <p className="text-secondary font-semibold">
                    ₦ {item.product?.price.toLocaleString()}
                </p>

                <div className="flex gap-2 pt-2">
                    {isInCart && cartItem ? (<div className="flex items-center justify-between mt-4">

                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                                onClick={() => decreaseQty()}
                                disabled={cartItem.quantity === 1}
                                className={`px-3 py-1 font-bold transition ${cartItem.quantity === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-secondary hover:bg-primary"
                                    }`}
                            >
                                −
                            </button>

                            <span className="px-4">
                                {cartItem.quantity}
                            </span>

                            <button
                                onClick={() => increaseQty()}
                                className="px-3 py-1 text-secondary font-bold hover:bg-primary transition"
                            >
                                +
                            </button>
                        </div>
                    </div>) : (<button
                        disabled={cartLoading === item.product?._id}
                        onClick={() => {
                            if (item.product) {
                                onAddToCart(item.product._id, 1);
                            }
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-primary-button text-tertiary cursor-pointer"
                    >
                        <FaShoppingCart size={14} />

                        {cartLoading === item.product?._id
                            ? "Adding..."
                            : "Add"}
                    </button>)}

                    <button
                        onClick={() => removeItem()}
                        className="
            flex items-center justify-center
            px-3 py-2 
            rounded-lg 
            border border-secondary-button-border
            bg-secondary-button
            text-secondary-button-text
            hover:bg-secondary-button-hover
            transition
          ">
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}