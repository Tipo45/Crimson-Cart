import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

type WishlistItem = {
    id: number;
    name: string;
    price: string;
    image: string;
};

export default function Wishlist() {

    const wishlistItems: WishlistItem[] = [
            {
                id: 1,
                name: "Handcrafted Leather Bag",
                price: "₦189.00",
                image: "/products/bag.jpg",
            },
            {
                id: 2,
                name: "Ceramic Mug Set",
                price: "₦42.00",
                image: "/products/mug.jpg",
            },
            {
                id: 3,
                name: "Wool Scarf — Charcoal",
                price: "₦67.00",
                image: "/products/scarf.jpg",
            },
            {
                id: 4,
                name: "Minimalist Wrist Watch",
                price: "₦129.00",
                image: "/products/watch.jpg",
            },
        ];

    return (
        <>
        {/* Wishlist */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-6 text-primart-text">
                                        My Wishlist
                                    </h2>

                                    {/* GRID */}
                                    <div className="grid grid-cols-2 tablet:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {wishlistItems.map((item) => (
                                            <WishlistCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
        </>
    )
}

type WishlistCardProps = {
    item: WishlistItem;
};

function WishlistCard({ item }: WishlistCardProps) {
    return (
        <div className="
      bg-tertiary 
      border border-border 
      rounded-xl 
      overflow-hidden 
      transition 
      hover:shadow-md
    ">
            <div className="relative w-full h-40 bg-muted-section">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-primart-text line-clamp-2">
                    {item.name}
                </h3>

                <p className="text-secondary font-semibold">
                    {item.price}
                </p>

                <div className="flex gap-2 pt-2">
                    <button className="
            flex-1 
            flex items-center justify-center gap-2
            px-3 py-2 
            text-sm 
            rounded-lg 
            bg-primary-button 
            text-tertiary 
            hover:bg-primary-button-hover 
            active:bg-primary-button-active
            transition
          ">
                        <FaShoppingCart size={14} />
                        Add
                    </button>

                    <button className="
            flex items-center justify-center
            px-3 py-2 
            rounded-lg 
            border border-secondary-button-border
            bg-secondary-button
            text-secondary-button-text
            hover:bg-secondary-button-hover
            transition
          ">
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}