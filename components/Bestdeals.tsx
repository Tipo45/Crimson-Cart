import React from "react";
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
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import Chickenimg from "../components/images/chicken.jpg";
import Fishimg from "../components/images/chicken.jpg";
import Spaghettiimg from "../components/images/chicken.jpg";
import Noodlesimg from "../components/images/chicken.jpg";
import Yamimg from "../components/images/chicken.jpg";
import Garriimg from "../components/images/chicken.jpg";
import Gardeneggimg from "../components/images/chicken.jpg";
import Carrotimg from "../components/images/chicken.jpg";
import Beansimg from "../components/images/chicken.jpg";
import Chipsimg from "../components/images/chicken.jpg";

const items = [
    { image: Chickenimg, name:"Chicken", price: 100 },
    { image: Fishimg, name: "Fish", price: 200 },
    { image: Chickenimg, name: "Chicken", price: 300 },
    { image: Spaghettiimg, name: "Spaghetti", price: 400 },
    { image: Noodlesimg, name: "Noodles", price: 500 },
    { image: Yamimg, name: "Yam", price: 600 },
    { image: Garriimg, name: "Garri", price: 700 },
    { image: Gardeneggimg, name: "Garden Egg", price: 800 },
    { image: Carrotimg, name: "Carrot", price: 900 },
    { image: Beansimg, name: "Beans", price: 1000 },
    { image: Chipsimg, name: "Chips", price: 1100 },
];

export default function Bestdeals() {

    const [quantities, setQuantities] = React.useState<Record<number, number>>({});

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


    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <section className="container mx-auto px-6 py-12">

            {/* Section title */}
            <h1 className="mb-8 text-xl font-bold text-secondary">
                Best Deals
            </h1>

            <Carousel
  plugins={[plugin.current]}
  onMouseEnter={() => plugin.current?.stop()}
  onMouseLeave={() => plugin.current?.play()}
  opts={{
    align: "start",
    loop: true,
  }}
>

                <CarouselContent className="-ml-4">

                    {items.map((item, index) => (
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
                            <Card className="h-full">
                                <CardContent
                                    className="
    flex h-[320px] flex-col
    rounded-lg border border-secondary-button-hover
    bg-tertiary p-6
  "
                                >
                                    {/* Product name */}
                                    {/* <div className="text-lg font-semibold text-secondary">
                                        {item.name}
                                    </div> */}
                                    <img src={item.image} alt={item.name} />

                                    {/* Spacer to push pricing + footer down */}
                                    <div className="flex-1" />

                                    {/* Price */}
                                    <div className="-mb-2 flex items-center gap-3">
                                        <span className="text-sm font-medium text-secondary/60 line-through">
                                            ₦ {Number(item.price * 1.5).toLocaleString()}
                                        </span>

                                        <span className="text-lg font-bold text-secondary">
                                            ₦ {Number(item.price).toLocaleString()}
                                        </span>
                                    </div>

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
                                        </motion.button>
                                    </CardFooter>
                                </CardContent>

                            </Card>
                        </CarouselItem>
                    ))}

                </CarouselContent>

                {/* Controls */}
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="flex justify-center py-8">
                <button className="bg-primary-button text-tertiary font-bold px-4 py-4 rounded-full cursor-pointer hover:bg-primary hover:text-primary-button border hover:border-accent-text">View best deals</button>
            </div>
        </section>
    );
}
