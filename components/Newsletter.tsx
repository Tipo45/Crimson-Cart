import Image from "next/image";
import Newsletterimg from "../components/images/newsletter.jpg";

export default function Newsletter () {
    return (
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      
      {/* Background Image */}
      <div className="relative w-full h-[350px] tablet:h-[450px] xl:h-[550px]">
        <Image
          src={Newsletterimg}
          alt="Crimson Cart Newsletter"
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
            
          </div>
        </div>
      </div>

    </section>
    )
}