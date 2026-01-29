import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <aside className="relative h-screen w-full left-0 bg-sidebar-background text-sidebar-text">
      {/* Header */}
      <div className="border-b border-divider px-4 py-3">
        <h1 className="text-lg lg:text-2xl font-bold tracking-tight">
          <Link href="/">E-Commerce</Link>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-8">
        <ul className="space-y-2 text-lg">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "Categories", href: "/categories" },
            { name: "Brands", href: "/brands" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-sidebar-hover active:bg-sidebar-active focus:outline-none focus:ring-2 focus:ring-[rgba(163, 22, 33, 0.5)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom / Footer */}
      <div className="absolute bottom-0 w-full border-t border-divider bg-sidebar-background px-4 py-3">
        <p className="text-center text-sm text-sidebar-muted">
          © {new Date().getFullYear()} E-Commerce. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
