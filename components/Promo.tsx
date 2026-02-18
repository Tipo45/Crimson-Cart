import Image from "next/image";
import Promoimg from "../public/images/hero.jpg";

export default function Promo() {
  return (
    <section className="relative tablet:w-screen tablet:left-1/2 tablet:right-1/2 tablet:-ml-[50vw] tablet:-mr-[50vw]">
      
      {/* Background Image */}
      <div className="relative w-full h-[350px] tablet:h-[450px] xl:h-[550px]">
        <Image
          src={Promoimg}
          alt="Crimson Cart Shopping"
          fill
          priority
          className="object-cover rounded-2xl tablet:rounded-none"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-2xl tablet:rounded-none" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-xl tablet:text-2xl xl:text-3xl font-extrabold text-white leading-tight">
              Shop Smarter with Crimson Cart
            </h2>

            <p className="mt-4 text-xs tablet:text-lg text-white/90">
              Discover unbeatable deals, trending products, and exclusive
              offers tailored just for you. Elevate your shopping experience today.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
