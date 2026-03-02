"use client";

import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { LuLayoutGrid, LuList } from "react-icons/lu";

type ProductStatus = "Active" | "Draft" | "Out of Stock";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: ProductStatus;
  image: string;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Handcrafted Leather Bag",
    price: 189,
    stock: 12,
    category: "Bags",
    status: "Active",
    image: "/placeholder.png",
  },
  {
    id: 2,
    name: "Ceramic Mug Set",
    price: 42,
    stock: 0,
    category: "Home",
    status: "Out of Stock",
    image: "/placeholder.png",
  },
  {
    id: 3,
    name: "Wool Scarf — Charcoal",
    price: 67,
    stock: 4,
    category: "Fashion",
    status: "Draft",
    image: "/placeholder.png",
  },
];

export default function SellerProducts() {
  const [view, setView] = useState<"grid" | "table">("table");
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Bags", "Home", "Fashion"];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const statusStyles = {
    Active: "bg-success/10 text-success",
    Draft: "bg-warning/10 text-warning",
    "Out of Stock": "bg-error/10 text-error",
  };

  return (
    <div className="bg-muted-section min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== TOP BAR ===== */}
        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-semibold text-primart-text">
            Products
          </h2>

          <div className="flex items-center gap-3">

            {/* Add Product Button */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-button text-tertiary hover:bg-primary-button-hover transition font-medium">
              <FaPlus />
              Add Product
            </button>

            {/* Toggle View */}
            <div className="flex border border-border rounded-lg overflow-hidden">
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
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-divider hover:bg-muted-section transition"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>

                    <td className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted-section rounded-md" />
                      <span className="font-medium">
                        {product.name}
                      </span>
                    </td>

                    <td className="p-4">${product.price}</td>
                    <td className="p-4">
                      {product.stock > 0 ? product.stock : "—"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[product.status]}`}
                      >
                        {product.status}
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-tertiary border border-border rounded-xl p-4"
              >
                <div className="w-full h-40 bg-muted-section rounded-lg mb-4" />

                <h3 className="font-semibold text-primart-text mb-1">
                  {product.name}
                </h3>

                <p className="text-secondary-text text-sm mb-2">
                  ${product.price} • Stock: {product.stock}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[product.status]}`}
                >
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}