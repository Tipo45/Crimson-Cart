"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/Productscard";
import SkeletonCard from "@/components/SkeletonCard";
import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaFilter,
    FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import Providers from "../providers";

type CategoryListProps = {
    activeCategory: string
    setActiveCategory: (category: string) => void
}

const categories = [
    { name: "All Products", count: 10 },
    { name: "Electronics", count: 3 },
    { name: "Fashion", count: 2 },
    { name: "Home & Living", count: 2 },
    { name: "Sports & Fitness", count: 2 },
    { name: "Beauty & Health", count: 1 },
];

const products = [
    {
        id: 1,
        badge: "Trending",
        brand: "STRIDEFIT",
        title: "Running Shoes — Ultra Boost",
        rating: 4.7,
        reviews: 2100,
        price: 189.99,
        image: "../../public/images/beans.jpg",
        hoverImage: "../../public/images/carrots.jpg",
    },
    {
        id: 2,
        badge: "Best Seller",
        brand: "AUDIOTECH PRO",
        title: "Wireless Noise-Cancelling Headphones",
        rating: 4.8,
        reviews: 1240,
        price: 249.99,
        oldPrice: 349.99,
        image: "/headphone1.png",
        hoverImage: "/headphone2.png",
    },
    {
        id: 3,
        badge: "Best Seller",
        brand: "AUDIOTECH PRO",
        title: "Wireless Noise-Cancelling Headphones",
        rating: 4.8,
        reviews: 1240,
        price: 249.99,
        oldPrice: 349.99,
        image: "/headphone1.png",
        hoverImage: "/headphone2.png",
    },
    {
        id: 4,
        badge: "Best Seller",
        brand: "AUDIOTECH PRO",
        title: "Wireless Noise-Cancelling Headphones",
        rating: 4.8,
        reviews: 1240,
        price: 249.99,
        oldPrice: 349.99,
        image: "/headphone1.png",
        hoverImage: "/headphone2.png",
    },
    {
        id: 5,
        badge: "Best Seller",
        brand: "AUDIOTECH PRO",
        title: "Wireless Noise-Cancelling Headphones",
        rating: 4.8,
        reviews: 1240,
        price: 249.99,
        oldPrice: 349.99,
        image: "/headphone1.png",
        hoverImage: "/headphone2.png",
    },
];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Providers>
            <Navbar />
            <div className="min-h-screen bg-primary pt-20">

                {/* ===== Top Bar ===== */}
                <div className="border-b border-divider px-6 py-4 flex items-center gap-4">
                    <button className="flex items-center gap-2 text-secondary-text">
                        <FaArrowLeft /> Back
                    </button>

                    <input
                        placeholder="Search products..."
                        className="flex-1 border border-input-border rounded-lg px-4 py-2 bg-tertiary focus:outline-none focus:ring-2 focus:ring-secondary w-30"
                    />

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="tablet:hidden bg-secondary-button border border-border p-2 rounded-lg"
                    >
                        <FaFilter />
                    </button>
                </div>

                <div className="flex flex-col tablet:flex-row">

                    {/* ===== Desktop Sidebar ===== */}
                    <aside className="hidden tablet:block w-56 lg:w-64 border-r border-divider bg-tertiary p-6">
                        <CategoryList
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </aside>

                    {/* ===== Mobile Drawer ===== */}
                    {drawerOpen && (
                        <div className="fixed inset-0 z-50 flex">
                            <div className="w-64 bg-tertiary p-6 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold">Filters</h3>
                                    <button onClick={() => setDrawerOpen(false)}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <CategoryList
                                    activeCategory={activeCategory}
                                    setActiveCategory={(cat) => {
                                        setActiveCategory(cat);
                                        setDrawerOpen(false);
                                    }}
                                />
                            </div>

                            <div
                                className="flex-1 bg-black/40"
                                onClick={() => setDrawerOpen(false)}
                            />
                        </div>
                    )}

                    {/* ===== Products Section ===== */}
                    <main className="flex-1 p-4 tablet:p-6 bg-muted-section">
                        <div className="
  grid 
  grid-cols-2 
  sm:grid-cols-3 
  tablet:grid-cols-4 
  lg:grid-cols-5 
  xl:grid-cols-6 
  gap-4
">
                            {loading
                                ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                                : products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </Providers>
    );
}


function CategoryList({
    activeCategory,
    setActiveCategory,
}: CategoryListProps) {
    return (
        <div className="space-y-2">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex justify-between px-4 py-2 rounded-lg text-sm transition
            ${activeCategory === cat.name
                            ? "bg-accent-background text-accent-text"
                            : "text-secondary-text hover:bg-secondary-button"
                        }
          `}
                >
                    <span>{cat.name}</span>
                    <span className="text-xs">{cat.count}</span>
                </button>
            ))}
        </div>
    );
}