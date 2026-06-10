export default function WishlistSkeleton() {
    return (
        <div className="bg-tertiary border border-border rounded-xl overflow-hidden animate-pulse">
            {/* Image placeholder */}
            <div className="relative w-full h-40 bg-muted-section" />
            
            {/* Content placeholder */}
            <div className="p-4 space-y-3">
                {/* Product name */}
                <div className="h-4 bg-divider rounded w-3/4" />
                
                {/* Price */}
                <div className="h-5 bg-divider rounded w-1/3" />
                
                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                    {/* Add to cart button */}
                    <div className="flex-1 h-9 bg-divider rounded-lg" />
                    
                    {/* Remove button */}
                    <div className="w-9 h-9 bg-divider rounded-lg" />
                </div>
            </div>
        </div>
    );
}