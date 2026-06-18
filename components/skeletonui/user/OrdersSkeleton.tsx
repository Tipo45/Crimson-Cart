export default function OrdersSkeleton() {
    return (
        <div className="bg-tertiary border border-border rounded-xl p-5 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-5">
                <div className="bg-divider w-16 h-16 rounded-lg flex items-center justify-center" />
                <div className="space-y-2">
                    <div className="h-6 bg-divider rounded w-10" />
                    <div className="h-4 bg-divider rounded w-5" />
                </div>
            </div>
            <div className="flex items-center gap-6">
                    <div className="h-4 bg-divider rounded w-10" />
                    {/* <div className="h-4 bg-divider rounded w-5" /> */}

                    <div className="h-4 bg-divider rounded w-10"/>
            </div>
        </div>
    );
}