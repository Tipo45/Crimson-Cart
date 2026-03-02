"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";

export default function Products () {
    return (
        <section>
            <Navbar />
            <div className="my-20">
                Products
            </div>
            <div className="my-10">
                <Newsletter />
            </div>
            <Footer />
        </section>
    )
}