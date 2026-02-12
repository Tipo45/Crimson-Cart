import Image from "next/image";
import Promoimg from "../components/images/hero.jpg";

export default function Promo() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      
      {/* Background Image */}
      <div className="relative w-full h-[350px] tablet:h-[450px] xl:h-[550px]">
        <Image
          src={Promoimg}
          alt="Crimson Cart Shopping"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl tablet:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              Shop Smarter with Crimson Cart
            </h2>

            <p className="mt-4 text-sm tablet:text-lg text-white/90">
              Discover unbeatable deals, trending products, and exclusive
              offers tailored just for you. Elevate your shopping experience today.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
