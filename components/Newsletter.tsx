import Image from "next/image";
import Newsletterimg from "../public/images/newsletter.jpg";

export default function Newsletter() {
  return (
    <section className="relative tablet:w-screen tablet:left-1/2 tablet:right-1/2 tablet:-ml-[50vw] tablet:-mr-[50vw] tablet:rounded-none">

      {/* Background Image */}
      <div className="relative w-full h-[350px] tablet:h-[450px] xl:h-[550px]">
        <Image
          src={Newsletterimg}
          alt="Crimson Cart Newsletter"
          fill
          priority
          className="object-cover rounded-2xl tablet:rounded-none"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 rounded-2xl tablet:rounded-none" />
      </div>

      {/* Text Content */}
      {/* Text Content */}
<div className="absolute inset-0 flex items-center">
  <div className="w-full px-6 lg:px-10">
    <div className="max-w-2xl mx-auto">

      {/* Heading */}
      <h2 className="text-xl tablet:text-2xl xl:text-3xl font-bold text-tertiary mb-4 text-center">
        Subscribe to our Newsletter
      </h2>

      <p className="text-tertiary/80 text-xs tablet:text-lg xl:text-xl mb-8 text-center">
        Get updates on new products, discounts, and special offers.
      </p>

      {/* Input Wrapper */}
      <div className="relative w-full">

        <input
          type="email"
          placeholder="Your email"
          className="
            w-full
            bg-tertiary
            rounded-full
            py-4
            pl-6
            pr-36
            text-sm tablet:text-base
            focus:outline-none
          "
        />

        <button
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            bg-secondary
            text-white
            rounded-full
            px-6
            py-2
            text-xs tablet:text-sm
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Subscribe
        </button>

      </div>

    </div>
  </div>
</div>



    </section>
  )
}