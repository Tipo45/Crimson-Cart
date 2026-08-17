import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://crimson-cart-umber-vercel.app";
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/contact", "/api/"]
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/contact", "/api/"]
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`
    };
}