"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import SettingSkeleton from "../skeletonui/user/SettingsSkeleton";
import ProductForm from "./AddProductForm";


export default function SellerProducts() {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"grid" | "table">("table");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const vendor = useQuery(api.user.getVendor);
  const viewProducts = useQuery(
    api.user.viewVendorProduct,
    vendor ? { vendorId: vendor._id } : "skip"
  );
  const [category, setCategory] = useState("All");

  const categories = ["All", "Bags", "Home", "Fashion"];

  const filteredProducts = viewProducts?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

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

useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
      {loading ? (<>
        <SettingSkeleton /></>) : (<div className="bg-muted-section min-h-screen p-6">
          <div className="max-w-6xl mx-auto">

            {/* ===== TOP BAR ===== */}
            <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 mb-6">

              <h2 className="text-2xl font-semibold text-primart-text">
                Products
              </h2>

              <div className="flex items-center gap-3">

                {/* Add Product Button */}
                <button onClick={toggleShowForm} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-button text-tertiary hover:bg-primary-button-hover transition font-medium">
                  <FaPlus />
                  Add Product
                </button>

                {showForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                      <ProductForm setShowForm={setShowForm} />

                      <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )}

                {/* Toggle View */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setView("table")}
                    className={`p-2 ${view === "table"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-secondary-text"
                      }`}
                  >
                    <LuList size={18} />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 ${view === "grid"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-secondary-text"
                      }`}
                  >
                    <LuLayoutGrid size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== FILTERS ===== */}
            <div className="flex flex-col tablet:flex-row gap-4 mb-6">

              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 rounded-lg border border-input-border bg-tertiary focus:outline-none focus:ring-2 focus:ring-secondary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-4 py-2 rounded-lg border border-input-border bg-tertiary focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* ===== BULK ACTIONS ===== */}
            {selected.length > 0 && (
              <div className="flex items-center justify-between bg-tertiary border border-border p-4 rounded-lg mb-6">
                <p className="text-sm text-secondary-text">
                  {selected.length} selected
                </p>
                <button className="flex items-center gap-2 text-error font-medium">
                  <FaTrash />
                  Delete Selected
                </button>
              </div>
            )}

            {/* ===== TABLE VIEW ===== */}
            {view === "table" && (
              <div className="bg-tertiary border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted-section text-secondary-text">
                    <tr>
                      <th className="p-4 text-left"></th>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Stock</th>
                      <th className="p-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts?.map((product) => (
                      <tr
                        key={product._id}
                        className="border-t border-divider hover:bg-muted-section transition"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selected.includes(product._id)}
                            onChange={() => toggleSelect(product._id)}
                          />
                        </td>

                        <td className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted-section rounded-md" />
                          <span className="font-medium capitalize">
                            {product.name}
                          </span>
                        </td>

                        <td className="p-4">₦{product.price.toLocaleString()}</td>
                        <td className="p-4">
                          {product.quantity > 0 ? product.quantity : "—"}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full font-medium`}
                          >
                            {product.quantity === 0 ? (
                              <span className="text-red-500 text-md">Out of Stock</span>
                            ) : product.quantity <= 5 ? (
                              <span className="text-orange-500 text-md">
                                Only {product.quantity} left
                              </span>
                            ) : (
                              <span className="text-green-500 text-md">In Stock</span>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ===== GRID VIEW ===== */}
            {view === "grid" && (
              <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => (
                  <div
                    key={product?._id}
                    className="bg-tertiary border border-border rounded-xl p-4"
                  >
                    <div className="w-full h-40 bg-muted-section rounded-lg mb-4" />

                    <h3 className="font-semibold text-primart-text mb-1 capitalize">
                      {product.name}
                    </h3>

                    <p className="text-secondary-text text-sm mb-2">
                      ₦{product.price.toLocaleString()} • Stock: {product.quantity}
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full font-medium`}
                    >
                      {product.quantity === 0 ? (
                        <span className="text-red-500 text-md">Out of Stock</span>
                      ) : product.quantity <= 5 ? (
                        <span className="text-orange-500 text-md">
                          Only {product.quantity} left
                        </span>
                      ) : (
                        <span className="text-green-500 text-md">In Stock</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>)}
    </div>
  );
}