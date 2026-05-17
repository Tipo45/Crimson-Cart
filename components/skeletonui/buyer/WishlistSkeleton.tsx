export default function WishlistSkeleton() {
    return (
        <div className="bg-tertiary border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="relative w-full h-40 bg-divider" />
            <div className="p-4 space-y-3">
                <h3 className="bg-divider w-1 h-4" />
                <p className="bg-divider w-8 h-4" />
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 flex items-center justify-center gap-2 px-2 py-3 bg-divider rounded-lg w-1 h-5" />
                    <div className="flex items-center justify-center px-3 py- rounded-lg bg-divider w-5 h-4" />
                </div>
            </div>
        </div>
    );
}