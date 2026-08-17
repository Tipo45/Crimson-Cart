import Checkout from "@/components/Checkout";

export default function CheckoutPage() {
  
  return (
    <section className="min-h-screen bg-primary py-12 pwa:py-0 px-4">
      
      <div className="max-w-6xl mx-auto mt-10">

        <h1 className="text-3xl font-bold text-secondary mb-8">
          Checkout
        </h1>

        <Checkout />
        
      </div>
    </section>
  );
}
