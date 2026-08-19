"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";
import ProductForm from "./AddProductForm";
import Image from "next/image";

export default function SellerProducts() {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"grid" | "table">("table");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");

  // Get the logged-in user's vendor account
  const vendor = useQuery(api.user.getVendor);

  // Get only products belonging to this vendor
  const viewProducts = useQuery(
    api.user.viewVendorProduct,
    vendor ? { vendorId: vendor._id } : "skip"
  );

  // Categories
  const categories = useQuery(api.user.getCategories);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!viewProducts) return [];

    return viewProducts.filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Category filter
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [viewProducts, search, activeCategory]);

  // Select / deselect product
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleShowForm = () => {
    setShowForm(true);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  // Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  // Loading vendor/products
  if (loading || vendor === undefined || viewProducts === undefined) {
    return <SettingSkeleton />;
  }

  // User is not a vendor
  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted-section p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-text">
            Vendor account not found
          </h2>

          <p className="mt-2 text-secondary-text">
            You need a vendor account to manage products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted-section p-4 tablet:p-6">
      <div className="mx-auto max-w-6xl">

        {/* ================= TOP BAR ================= */}
        <div className="mb-6 flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-primary-text">
              Products
            </h2>

            <p className="mt-1 text-sm text-secondary-text">
              Manage your products and inventory
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Add Product */}
            <button
              onClick={toggleShowForm}
              className="
                flex items-center gap-2
                rounded-lg
                bg-primary-button
                px-5 py-2.5
                font-medium
                text-tertiary
                transition
                hover:bg-primary-button-hover
              "
            >
              <FaPlus />
              Add Product
            </button>

            {/* ================= ADD PRODUCT MODAL ================= */}
            {showForm && (
              <div
                className="
                  fixed inset-0 z-50
                  flex items-center justify-center
                  bg-black/60
                  p-4
                  backdrop-blur-sm
                "
              >
                <div
                  className="
                    relative
                    h-[90vh]
                    w-full
                    max-w-6xl
                    overflow-y-auto
                    rounded-2xl
                    bg-white
                    shadow-2xl
                  "
                >
                  <ProductForm setShowForm={setShowForm} />

                  <button
                    onClick={() => setShowForm(false)}
                    className="
                      absolute right-4 top-4
                      rounded-full
                      bg-gray-100
                      p-2
                      transition
                      hover:bg-gray-200
                    "
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {/* ================= VIEW TOGGLE ================= */}
            <div className="pwa:hidden overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setView("table")}
                className={`p-2 ${
                  view === "table"
                    ? "bg-secondary text-tertiary"
                    : "bg-tertiary text-secondary-text"
                }`}
              >
                <LuList size={18} />
              </button>

              <button
                onClick={() => setView("grid")}
                className={`p-2 ${
                  view === "grid"
                    ? "bg-secondary text-tertiary"
                    : "bg-tertiary text-secondary-text"
                }`}
              >
                <LuLayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="mb-6 flex flex-col gap-4 tablet:flex-row">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            className="
              flex-1
              rounded-lg
              border border-input-border
              bg-tertiary
              px-4 py-2
              text-primary-text
              focus:outline-none
              focus:ring-2
              focus:ring-secondary
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category */}
          <select
            className="
              rounded-lg
              border border-input-border
              bg-tertiary
              px-4 py-2
              text-primary-text
              focus:outline-none
            "
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="All Products">
              All Products
            </option>

            {(categories ?? []).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* ================= RESULT COUNT ================= */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-secondary-text">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* ================= BULK ACTIONS ================= */}
        {selected.length > 0 && (
          <div
            className="
              mb-6
              flex items-center justify-between
              rounded-lg
              border border-border
              bg-tertiary
              p-4
            "
          >
            <p className="text-sm text-secondary-text">
              {selected.length} selected
            </p>

            <button
              className="
                flex items-center gap-2
                font-medium
                text-error
              "
            >
              <FaTrash />
              Delete Selected
            </button>
          </div>
        )}

        {/* ================= NO PRODUCTS ================= */}
        {filteredProducts.length === 0 ? (
          <div
            className="
              rounded-xl
              border border-border
              bg-tertiary
              p-12
              text-center
            "
          >
            <p className="text-lg font-semibold text-primary-text">
              No products found
            </p>

            <p className="mt-2 text-sm text-secondary-text">
              {search || activeCategory !== "All Products"
                ? "Try changing your search or category filter."
                : "You have not added any products yet."}
            </p>
          </div>
        ) : (
          <>
            {/* ================= TABLE VIEW ================= */}
            <div className="block pwa:hidden">
              {view === "table" && (
                <div className="overflow-hidden rounded-xl border border-border bg-tertiary">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                      <thead className="bg-muted-section text-secondary-text">
                        <tr>
                          <th className="p-4 text-left">
                            <input
                              type="checkbox"
                              checked={
                                filteredProducts.length > 0 &&
                                selected.length === filteredProducts.length
                              }
                              onChange={() => {
                                if (
                                  selected.length === filteredProducts.length
                                ) {
                                  setSelected([]);
                                } else {
                                  setSelected(
                                    filteredProducts.map(
                                      (product) => product._id
                                    )
                                  );
                                }
                              }}
                            />
                          </th>

                          <th className="p-4 text-left">
                            Product
                          </th>

                          <th className="p-4 text-left">
                            Price
                          </th>

                          <th className="p-4 text-left">
                            Stock
                          </th>

                          <th className="p-4 text-left">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr
                            key={product._id}
                            className="
                              border-t border-divider
                              transition
                              hover:bg-muted-section
                            "
                          >
                            {/* Checkbox */}
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={selected.includes(product._id)}
                                onChange={() =>
                                  toggleSelect(product._id)
                                }
                              />
                            </td>

                            {/* Product */}
                            <td className="p-4">
                              <div className="flex items-center gap-3">

                                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                                  <Image
                                    src={
                                      product.imageUrls?.[0] ||
                                      "/placeholder.png"
                                    }
                                    alt={product.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </div>

                                <div>
                                  <p className="font-medium capitalize">
                                    {product.name}
                                  </p>

                                  <p className="text-xs text-secondary-text">
                                    {product.category}
                                  </p>
                                </div>

                              </div>
                            </td>

                            {/* Price */}
                            <td className="p-4">
                              ₦{product.price.toLocaleString()}
                            </td>

                            {/* Stock */}
                            <td className="p-4">
                              {product.quantity > 0
                                ? product.quantity
                                : "—"}
                            </td>

                            {/* Status */}
                            <td className="p-4">
                              {product.quantity === 0 ? (
                                <span className="font-medium text-red-500">
                                  Out of Stock
                                </span>
                              ) : product.quantity <= 5 ? (
                                <span className="font-medium text-orange-500">
                                  Only {product.quantity} left
                                </span>
                              ) : (
                                <span className="font-medium text-green-500">
                                  In Stock
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ================= GRID VIEW ================= */}
            {(view === "grid" || window.innerWidth < 768) && (
              <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="
                      overflow-hidden
                      rounded-xl
                      border border-border
                      bg-tertiary
                    "
                  >

                    {/* Image */}
                    <div className="relative h-56 w-full bg-muted-section">
                      <Image
                        src={
                          product.imageUrls?.[0] ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">

                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-primary-text capitalize">
                          {product.name}
                        </h3>

                        <input
                          type="checkbox"
                          checked={selected.includes(product._id)}
                          onChange={() =>
                            toggleSelect(product._id)
                          }
                        />
                      </div>

                      <p className="mb-1 text-sm text-secondary-text">
                        {product.category}
                      </p>

                      <p className="mb-3 font-semibold text-secondary">
                        ₦{product.price.toLocaleString()}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-text">
                          Stock: {product.quantity}
                        </span>

                        {product.quantity === 0 ? (
                          <span className="text-sm font-medium text-red-500">
                            Out of Stock
                          </span>
                        ) : product.quantity <= 5 ? (
                          <span className="text-sm font-medium text-orange-500">
                            Low Stock
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-green-500">
                            In Stock
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}