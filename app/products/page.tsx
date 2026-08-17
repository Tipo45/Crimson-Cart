import FloatingCart from "@/components/Floatingcart";
import Products from "@/components/products/AllProducts";

export default function productsPage() {


    return (
        <>
            <div className="min-h-screen bg-primary pt-20 pwa:pt-10 z-20">
                
                <Products />

            </div>
            <div className="pwa:hidden">
                <FloatingCart />
            </div>
            
        </>
    );
}