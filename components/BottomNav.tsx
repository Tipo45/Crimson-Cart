"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function BottomNav() {

  const currentUser = useQuery(api.user.getCurrentUser);

  const pathname = usePathname();

  const cartItems = useQuery(api.user.getCart);
  const wishlist = useQuery(api.user.getWishlist);

  const cartCount =
    cartItems?.reduce((t, i) => t + (i?.quantity ?? 0), 0) ?? 0;

  const wishlistCount = wishlist?.length ?? 0;

  const vendor = useQuery(api.user.getVendor);
  
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: FaHome,
    },
    {
      name: "Products",
      href: "/products",
      icon: FaSearch,
    },
    ...(vendor
      ? []
      : [
          {
            name: "Cart",
            href: currentUser
              ? `/cart/${currentUser._id}`
              : "/sign-in",
            icon: FaShoppingCart,
          },
        ]),
    {
      name: "Account",
      href: "#account",
      icon: FaUser,
    },
  ];

  if (vendor === undefined) {
    return null;
  }

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 px-3">
      <div
        className="
        mx-auto max-w-md
        rounded-3xl
        border border-white/20
        bg-white/70 dark:bg-black/60
        backdrop-blur-2xl
        backdrop-saturate-150
        shadow-[0_8px_32px_rgba(0,0,0,0.15)]
        supports-backdrop-filter:bg-white/50
        dark:supports-backdrop-filter:bg-black/40
      "
      >
        <div className="flex items-center justify-around px-2 py-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            const isAccount = item.name === "Account";

            const isActive = isAccount
              ? pathname.startsWith("/user") || pathname.startsWith("/vendor")
              : pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            const count =
              item.name === "Cart"
                ? cartCount
                : item.name === "Wishlist"
                  ? wishlistCount
                  : 0;

            if (isAccount) {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    if (!currentUser) {
                      router.push("/sign-in");
                      return;
                    }

                    if (vendor) {
                      router.push(`/vendor/${currentUser._id}`);
                    } else {
                      router.push(`/user/${currentUser._id}`);
                    }
                  }}
                  className={`
          relative flex min-w-15 flex-col items-center gap-1
          rounded-2xl px-3 py-2
          transition-all duration-300 cursor-pointer
          ${isActive
                      ? "text-secondary"
                      : "text-secondary-text hover:text-secondary"
                    }
        `}
                >
                  <div className="relative">
                    <Icon
                      className={`
              text-lg transition-all duration-300
              ${isActive ? "scale-110 drop-shadow-sm" : ""}
            `}
                    />
                  </div>

                  <span
                    className={`
            text-[11px] font-medium
            ${isActive ? "font-semibold" : ""}
          `}
                  >
                    Account
                  </span>

                  {isActive && (
                    <span
                      className="
              absolute bottom-0
              h-0.5 w-5
              rounded-full
              bg-secondary
              shadow-[0_0_8px_rgba(163,22,33,0.6)]
            "
                    />
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
        relative flex min-w-15 flex-col items-center gap-1
        rounded-2xl px-3 py-2
        transition-all duration-300
        ${isActive
                    ? "text-secondary"
                    : "text-secondary-text hover:text-secondary"
                  }
      `}
              >
                <div className="relative">
                  <Icon
                    className={`
            text-lg transition-all duration-300
            ${isActive ? "scale-110 drop-shadow-sm" : ""}
          `}
                  />

                  {count > 0 && (
                    <span
                      className="
              absolute -right-3 -top-2
              flex h-5 min-w-5 items-center justify-center
              rounded-full
              bg-secondary
              px-1
              text-[10px]
              font-bold
              text-white
              shadow-md
            "
                    >
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </div>

                <span
                  className={`
          text-[11px] font-medium
          ${isActive ? "font-semibold" : ""}
        `}
                >
                  {item.name}
                </span>

                {isActive && (
                  <span
                    className="
            absolute bottom-0
            h-0.5 w-5
            rounded-full
            bg-secondary
            shadow-[0_0_8px_rgba(163,22,33,0.6)]
          "
                  />
                )}
              </Link>
            );
          })}

        </div>
      </div>
    </nav>
  );
}