import Image from "next/image";
import Link from "next/link";
import Heroimg from "../public/images/hero2.png";

export default function Hero() {
  return (
    <section className="w-full px-4 tablet:px-8 xl:px-16 py-12">
      <div className="grid grid-cols-1 tablet:grid-cols-2 items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* Top Links */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-primary">
              Crimson Cart
            </h2>

            <ul className="flex gap-4 text-sm lg:text-base">
              <li>
                <Link href="/whats-new" className="hover:underline">
                  What's New
                </Link>
              </li>
              <li>
                <Link href="/new-offers" className="hover:underline">
                  New Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-3xl tablet:text-4xl xl:text-5xl font-extrabold leading-tight text-primary-text">
              Shop Smarter with Crimson Cart
            </h1>

            <p className="text-base tablet:text-lg text-primary-text/80 max-w-lg">
              Discover unbeatable deals, trending products, and exclusive
              offers tailored just for you. Elevate your shopping experience
              today.
            </p>

            <div className="flex gap-4 pt-2">
              <button className="bg-primary-button text-tertiary font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
                Shop Now
              </button>

              <button className="border border-primary-button text-primary-button font-semibold rounded-lg px-6 py-3 hover:bg-primary-button hover:text-tertiary transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[300px] tablet:h-[400px] xl:h-[500px]">
          <Image
            src={Heroimg}
            alt="Crimson Cart Shopping"
            fill
            priority
            className="object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
}
