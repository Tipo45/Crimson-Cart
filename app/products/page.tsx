import Navbar from "@/components/Navbar";
import Products from "@/components/products/AllProducts";

export default function productsPage() {


    return (
        <>
            <div className="min-h-screen bg-primary pt-20 pwa:pt-10 z-20">
                <div className="flex pwa:hidden">
                    <Navbar />
                </div>
                <Products />

            </div>
            
            
        </>
    );
}