import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { motion, removeItem } from "framer-motion";
import Providers from "@/app/providers";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";

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
            {loading ? (<SettingSkeleton />) : (
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-primary-text">
                        My Wishlist
                    </h2>

                    {!wishListItems || wishListItems.length === 0 ? (
                        <section className="container mx-auto px-6 py-12">
                            <div className="text-center h-64 flex flex-col items-center justify-center">
                                <h3 className="text-xl font-semibold text-primary-text mb-2">
                                    Your wishlist is empty
                                </h3>
                                <p className="text-secondary-text">
                                    Save products you love and they'll appear here.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.5
                                    },
                                },
                            }} 
                            className="grid grid-cols-2 lg:grid-cols-3 tablet:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 lg:gap-6"
                        >
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
                    )}
                </div>
            )}
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
        <div className="w-full 
            bg-tertiary 
            border border-border 
            rounded-xl 
            overflow-hidden 
            transition 
            hover:shadow-md
            h-full flex flex-col
        ">
            <div className="relative w-full aspect-square bg-muted-section">
                {/* <Image
                    src={item.image}
                    alt={item.product?.name}
                    fill
                    className="object-cover"
                /> */}
                <div className="absolute inset-0 flex items-center justify-center text-muted">
                    No Image
                </div>
            </div>

            <div className="flex flex-col flex-1 p-3 lg:p-4 space-y-2 lg:space-y-3">
                <h3 className="text-xs lg:text-sm font-medium text-primary-text line-clamp-2 capitalize">
                    {item.product?.name || "Product"}
                </h3>

                <p className="text-sm lg:text-base text-secondary font-semibold">
                    ₦ {item.product?.price?.toLocaleString() || "0"}
                </p>

                <div className="flex gap-2 pt-1 lg:pt-2 mt-auto">
                    {isInCart && cartItem ? (
                        <div className="flex-1 flex items-center justify-between border rounded-lg overflow-hidden">
                            <button
                                onClick={() => decreaseQty()}
                                disabled={cartItem.quantity === 1}
                                className={`text-xs px-2 py-1.5 lg:px-3 lg:py-2 font-bold transition ${
                                    cartItem.quantity === 1
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-secondary hover:bg-gray-100"
                                }`}
                            >
                                −
                            </button>
                            <span className="px-1.5 lg:px-2 text-xs lg:text-sm font-medium">
                                {cartItem.quantity}
                            </span>
                            <button
                                onClick={() => increaseQty()}
                                className="text-xs px-2 py-1.5 lg:px-3 lg:py-2 text-secondary font-bold hover:bg-gray-100 transition"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            disabled={cartLoading === item.product?._id}
                            onClick={() => {
                                if (item.product) {
                                    onAddToCart(item.product._id, 1);
                                }
                            }}
                            className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm rounded-lg bg-primary-button text-tertiary hover:bg-primary-button-hover transition disabled:opacity-50"
                        >
                            <FaShoppingCart size={12} className="lg:size-14" />
                            {cartLoading === item.product?._id ? "Adding..." : "Add"}
                        </button>
                    )}

                    <button
                        onClick={() => removeItem()}
                        className="flex items-center justify-center px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg border border-secondary-button-border bg-secondary-button text-secondary-button-text hover:bg-secondary-button-hover transition"
                    >
                        <FaTrash size={12} className="lg:size-14" />
                    </button>
                </div>
            </div>
        </div>
    );
}