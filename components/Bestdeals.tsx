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
import Chickenimg from "../public/images/chicken.jpg";
import Fishimg from "../public/images/fish.jpg";
import Spaghettiimg from "../public/images/spaghetti.jpg";
import Noodlesimg from "../public/images/noodles.jpg";
import Cassavaimg from "../public/images/cassava.jpg";
import Garriimg from "../public/images/garri.jpg";
import Eggimg from "../public/images/eggs.jpg";
import Carrotimg from "../public/images/carrots.jpg";
import Beansimg from "../public/images/beans.jpg";
import Chipsimg from "../public/images/chips.jpg";

const items = [
  { image: Chickenimg, name: "Chicken", price: 100 },
  { image: Fishimg, name: "Fish", price: 200 },
  { image: Spaghettiimg, name: "Spaghetti", price: 400 },
  { image: Noodlesimg, name: "Noodles", price: 500 },
  { image: Cassavaimg, name: "Cassava", price: 600 },
  { image: Garriimg, name: "Garri", price: 700 },
  { image: Eggimg, name: "Eggs", price: 800 },
  { image: Carrotimg, name: "Carrot", price: 900 },
  { image: Beansimg, name: "Beans", price: 1000 },
  { image: Chipsimg, name: "Chips", price: 1100 },
];

export default function Bestdeals() {

  const [quantities, setQuantities] = React.useState<Record<number, number>>({});
  const [ripples, setRipples] = React.useState<Record<number, number>>({});

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

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

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
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.play()}
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

            {items.map((item, index) => (
              <motion.div variants={cardVariants}              >
                <CarouselItem
                  key={index}
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
      flex h-[320px] flex-col
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
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="100vw"
                            className="rounded-lg"
                          />
                        </motion.div>
                        {/* </div> */}

                        {/* Push pricing & footer down */}
                        <div className="flex-1" />

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

                          <span className="text-lg font-bold text-secondary">
                            ₦ {Number(item.price).toLocaleString()}
                          </span></motion.div>
                        {/* </div> */}

                        {/* Footer */}
                        <CardFooter className="flex flex-col px-0 pb-0">
                          {/* Quantity selector */}
                          <div className="flex items-center justify-center gap-4 py-4">
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

                            <span className="min-w-[24px] text-center text-sm font-semibold text-secondary">
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
                            onClick={() => triggerRipple(index)}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="
          w-full rounded-md
          bg-primary-button
          py-3 text-sm font-semibold
          text-primary
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-secondary/40
        "
                          >
                            Add to Cart
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
                        </CardFooter>
                      </CardContent>
                    </Card></motion.div>


                </CarouselItem>
              </motion.div>
            ))}

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
          View best deals
        </motion.button>
        {/* <button className="bg-primary-button text-tertiary font-bold px-4 py-4 rounded-full cursor-pointer hover:bg-primary hover:text-primary-button border hover:border-accent-text">View best deals</button> */}
      </div>
    </section>
  );
}
