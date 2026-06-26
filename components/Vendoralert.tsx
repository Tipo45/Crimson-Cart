import { useRouter } from "next/navigation"


export default function Vendoralert() {

    const router = useRouter();

    const handleVendor = () => {
    router.push("/vendor/registration")
  }

    return (
        <section>
            <div className="my-10 text-center py-8">
                <h3 className="text-2xl font-bold mb-4">Sell on Our Platform</h3>
                <button onClick={handleVendor} className="bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-cyber-glow cursor-pointer">
                    Become a Vendor Today
                </button>
            </div>
        </section>
    )
}