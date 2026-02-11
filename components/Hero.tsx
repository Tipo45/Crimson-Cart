import Link from "next/link";

export default function Hero() {
  return (
    <section>
        <div className="grid gird-cols-1 lg:grid-cols-2 gap-8">
            <div className="py-8">
                <h2 className="text-xs">logo</h2>
                <div className="py-6">
                    <ul className="flex space-x-3 text-lg">
                        <li><Link href="/whats-new">What's new</Link></li>
                        <li><Link href="/new-offers">New Offers</Link></li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-4xl font-extrabold truncate">Shop with Crimson Cart</h1>
                    <p className="text-md py-3">
                        Discover a world of great deals and exclusive offers.
                        Shop now and experience the best shopping experience.
                    </p>
                    <div className="space-x-3 py-2">
                        <button className="bg-primary-button text-tertiary text-lg font-bold rounded-lg px-2 py-3">Shop Now</button>
                        <button className="bg-primary-button text-tertiary text-lg font-bold rounded-lg px-2 py-3">Contact Us</button>
                    </div>
                </div>
            </div>

            <div></div>
        </div>
    </section>
  )
}