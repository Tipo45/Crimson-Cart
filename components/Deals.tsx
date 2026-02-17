import Image from "next/image";
import Dealimg from "../components/images/deal1.jpg";
import Dealimg2 from "../components/images/deal2.jpg";

export default function Deals() {
    return (
        <section className="mt-10 py-4 px-4">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">

                {/* DEAL 1 */}
                <div className="relative w-full aspect-[16/9]">
                    <Image
                        src={Dealimg}
                        alt="Deal 1"
                        fill
                        className="rounded-xl object-cover"
                    />

                    {/* Overlay Container */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">

                        <span className="text-sm tablet:text-xl animate-pulse text-secondary font-bold max-w-md">
                            Get 60% off on selected items on Cyber Monday Deals
                        </span>

                        <div className="flex justify-end">
                            <button className="bg-secondary text-sm text-tertiary font-bold px-5 py-2 rounded-full">
                                Shop Now
                            </button>
                        </div>

                    </div>
                </div>


                {/* DEAL 2 */}
                <div className="relative w-full aspect-[16/9]">
                    <Image
                        src={Dealimg2}
                        alt="Deal 2"
                        fill
                        className="rounded-xl object-cover"
                    />

                    {/* Overlay Container */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">

                        <div className="space-y-2">
                            <span className="block tablet:text-xl text-primary font-bold">
                                Deal of the Week
                            </span>

                            <span className="block tablet:text-xl text-secondary font-bold">
                                Up to 50% off
                            </span>
                        </div>


                        <div className="flex justify-start">
                            <button className="bg-secondary text-sm text-tertiary font-bold px-5 py-2 rounded-full">
                                Shop Now
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
