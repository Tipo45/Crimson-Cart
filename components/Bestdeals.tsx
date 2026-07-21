import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { motion, type Variants } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useClerk, useUser } from "@clerk/nextjs";

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

export default function Bestdeals() {

  const { isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();
  const [quantities, setQuantities] = React.useState<Record<number, number>>({});
  const [ripples, setRipples] = React.useState<Record<number, number>>({});
  const items = useQuery(api.user.getProducts);
  const addToCart = useMutation(api.user.addToCart);
  const updateCartQuantity = useMutation(api.user.updateCartQuantity);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  const [loadingProduct, setLoadingProduct] =
    React.useState<Id<"products"> | null>(null);

  const cartItems =
    useQuery(api.user.getCart) as CartItem[] | undefined;


  const increaseQty = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 1) + 1,
    }));
  };

  const decreaseQty = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) - 1),
    }));
  };

  const triggerRipple = (index: number) => {
    setRipples((prev) => ({
      ...prev,
      [index]: Date.now(),
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const toCart = async (
    productId: Id<"products">,
    quantity: number
  ) => {

    if (!isSignedIn) {
      // User is not signed in, show toast and redirect to sign in
      toast.error("Please sign in to add items to your cart");
      redirectToSignIn({
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

  const handleIncreaseQty = async (
  cartItem: CartItem
) => {
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
  
    const handleDecreaseQty = async (
  cartItem: CartItem
) => {
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

  if (items === undefined) {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="text-center h-64 flex items-center justify-center">
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12">

      {/* Section title */}
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mb-8 text-xl tablet:text-2xl font-bold text-secondary"
      >
        Best Deals
      </motion.h1>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >

        <motion.div variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <CarouselContent className="-ml-4">

            {items.map((item, index) => {
  const currentCartItem = cartItems?.find(
    (cart) => cart.productId === item._id
  );

  return (
              <motion.div key={item._id} variants={cardVariants}              >
                <CarouselItem
                  className="
                pl-4
                basis-[85%]
                lg:basis-[40%]
                xl:basis-1/3
                2xl:basis-1/4
                3xl:basis-1/5
              "
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  ><Card className="h-full">
                      <CardContent
                        className="
      flex h-80 flex-col
      rounded-lg border border-secondary-button-hover
      bg-tertiary p-6
    "
                      >
                        {/* Image */}
                        {/* <div className="relative h-40 w-full mb-4"> */}
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                          className="relative h-40 w-full mb-4 overflow-hidden rounded-lg"
                        >
                          <Image
                            src={item.imageUrls?.[0] ?? "/placeholder.png"}
                            alt={item.name}
                            fill
                            sizes="100vw"
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                          
                        </motion.div>
                        {/* </div> */}

                        {/* Push pricing & footer down */}
                        <div className="flex-1" />
                        <p className="text-md font-bold text-secondary capitalize">
                          {item.name}
                        </p>

                        {/* Price */}
                        {/* <div className="mb-2 flex items-center gap-3"> */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mb-2 flex items-center gap-3"
                        >
                          <span className="text-sm font-medium text-secondary/60 line-through">
                            ₦ {Number(item.price * 1.5).toLocaleString()}
                          </span>

                          <span className="text-md font-bold text-secondary">
                            ₦ {Number(item.price).toLocaleString()}
                          </span></motion.div>
                        {/* </div> */}

                        {/* Footer */}
                        <CardFooter className="flex flex-col px-0 pb-0">
                          {/* Quantity selector */}
                          {currentCartItem ? (<div className="flex items-center justify-center gap-4 py-4">
                

                  <div className="flex items-center rounded-lg overflow-hidden border border-border">
                    <button
                      onClick={() => handleDecreaseQty(currentCartItem)}
                      disabled={currentCartItem.quantity === 1}
                      className={`px-2 py-3 hover:bg-muted-section ${currentCartItem.quantity === 1 ? "text-gray-400 cursor-not-allowed"
                        : "text-secondary hover:bg-primary"}`}
                    >
                      −
                    </button>

                    <span className="px-6 font-semibold">
                      {currentCartItem.quantity}
                    </span>

                    <button
                      onClick={() => handleIncreaseQty(currentCartItem)}
                      className="px-2 py-3 text-secondary hover:bg-muted-section"
                    >
                      +
                    </button>
                  </div>
              </div>) :(<div><div className="flex items-center justify-center gap-4 py-4">
                            <motion.button
                              whileTap={quantities[index] > 1 ? { scale: 0.9 } : undefined}
                              disabled={(quantities[index] || 1) === 1}
                              onClick={() => decreaseQty(index)}
                              className={`
            flex h-8 w-8 items-center justify-center rounded-full
            border border-secondary-button-hover
            text-secondary transition
            ${(quantities[index] || 1) === 1
                                  ? "opacity-40 cursor-not-allowed"
                                  : "hover:bg-secondary/10"}
          `}
                            >
                              −
                            </motion.button>

                            <span className="min-w-6 text-center text-sm font-semibold text-secondary">
                              {quantities[index] || 1}
                            </span>

                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => increaseQty(index)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary-button-hover text-secondary hover:bg-secondary/10"
                            >
                              +
                            </motion.button>
                          </div>

                          <motion.button
                            disabled={loadingProduct === item._id}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative 
          w-full rounded-md
          bg-primary-button
          py-3 text-sm font-semibold
          text-primary
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-secondary/40
        disabled:opacity-50 cursor-pointer
    disabled:cursor-not-allowed"  onClick={() => {
                              triggerRipple(index);

                              toCart(
                                item._id,
                                quantities[index] || 1
                              );
                            }}
                          >
                            {loadingProduct === item._id
                              ? "Adding..."
                              : "Add to Cart"}
                            {ripples[index] && (
                              <motion.span
                                key={ripples[index]}
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 4, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0 rounded-md bg-white/40"
                              />
                            )}
                          </motion.button></div>)}

                        </CardFooter>
                      </CardContent>
                    </Card></motion.div>


                </CarouselItem>
              </motion.div>
            )
})}

          </CarouselContent>
        </motion.div>

        {/* Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center py-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-button text-tertiary font-bold px-4 py-4 rounded-full cursor-pointer hover:bg-primary hover:text-primary-button border hover:border-accent-text"
        >
          View more
        </motion.button>
      </div>
    </section>
  );
}
