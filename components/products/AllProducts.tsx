"use client"

import ProductCard from "@/components/products/Productscard";
import SkeletonCard from "@/components/skeletonui/ProductsSkeletonCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaFilter,
    FaTimes,
} from "react-icons/fa";
import FloatingCart from "../Floatingcart";

type CategoryListProps = {
    categories: {
        name: string;
    }[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
};

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const categories = useQuery(api.user.getCategories);
    const allproducts = useQuery(api.user.getProducts);
    const categoryProducts = useQuery(api.user.getProductsByCategory, activeCategory === "All Products"
        ? "skip"
        : { category: activeCategory });

    const products = activeCategory === "All Products"
        ? allproducts
        : categoryProducts;
    const filteredProducts = (products ?? []).filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const wishlist = useQuery(api.user.getWishlist) ?? [];

    const wishlistIds = new Set(
        wishlist.map((item) => item.productId)
    );
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    const vendor = useQuery(api.user.getVendor);

    useEffect(() => {
        if (categoryFromUrl) {
            setActiveCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (products == undefined) {
        return (
            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </section>
        );
    }

    return (
        <div>
            <div>
                <div className="border-b border-divider px-6 py-4 flex items-center gap-4">
                    <div className="border-b border-divider px-6 py-4 flex items-center gap-4">
                        <button onClick={handleBack} className="flex items-center gap-2 text-secondary-text cursor-pointer">
                            <FaArrowLeft /> Back
                        </button>
                    </div>


                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 border border-input-border rounded-lg px-4 py-2 bg-tertiary focus:outline-none focus:ring-2 focus:ring-secondary w-30"
                    />

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="xl:hidden bg-secondary-button border border-border p-2 rounded-lg"
                    >
                        <FaFilter />
                    </button>
                </div>

                <div className="flex flex-col tablet:flex-row">

                    {/* ===== Desktop Sidebar ===== */}
                    <aside className="hidden xl:block w-56 lg:w-64 border-r border-divider bg-tertiary p-6">
                        <CategoryList
                            categories={(categories ?? []).map(cat => ({ name: cat }))}
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
                                    categories={(categories ?? []).map(cat => ({ name: cat }))}
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
              tablet:grid-cols-4 
              lg:grid-cols-5 
              xl:grid-cols-6 
              gap-4
            ">
                            {loading ? (
                                [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        isWishlisted={wishlistIds.has(product._id)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-secondary-text">
                                    No products found.
                                </div>
                            )}
                        </div>
                    </main>
                </div>

            </div>
            {!vendor ? (
                <div className="pwa:hidden">
                <FloatingCart />
            </div>
            ) : (null)}
        </div>
    )
}

function CategoryList({
    categories,
    activeCategory,
    setActiveCategory
}: CategoryListProps) {
    return (
        <div className="space-y-2">

            <button

                onClick={() => setActiveCategory("All Products")}
                className={`w-full flex justify-between px-4 py-2 rounded-lg text-sm transition
            ${activeCategory === "All Products"
                        ? "bg-accent-background text-accent-text"
                        : "text-secondary-text hover:bg-secondary-button"
                    }
          `}
            >
                <span>All Products</span>
            </button>

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
                    <span className="capitalize">{cat.name}</span>
                </button>
            ))}

        </div>
    );
}