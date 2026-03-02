import { FaRegCheckCircle } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";


export default function Orders() {
    return (
        <>
            <div className="space-y-5">

                <OrderCard
                    title="Handcrafted Leather Bag"
                    orderId="ORD-2847"
                    date="Feb 18, 2026"
                    price="$189.00"
                    status="Delivered"
                    statusColor="text-success"
                />

                <OrderCard
                    title="Ceramic Mug Set"
                    orderId="ORD-2831"
                    date="Feb 15, 2026"
                    price="$42.00"
                    status="In Transit"
                    statusColor="text-info"
                />

                <OrderCard
                    title="Wool Scarf — Charcoal"
                    orderId="ORD-2799"
                    date="Feb 10, 2026"
                    price="$67.00"
                    status="Processing"
                    statusColor="text-warning"
                />

            </div>
        </>
    )
}

/* ================= ORDER CARD COMPONENT ================= */

type OrderCardProps = {
    title: string;
    orderId: string;
    date: string;
    price: string;
    status: string;
    statusColor: string;
};

function OrderCard({
    title,
    orderId,
    date,
    price,
    status,
    statusColor,
}: OrderCardProps) {
    return (
        <>
            {/* Orders List */}
            <div className="bg-tertiary border border-border rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-muted-section rounded-lg flex items-center justify-center">
                        <LuPackage size={20} className="text-muted" />
                    </div>

                    <div>
                        <h3 className="font-semibold text-primart-text">
                            {title}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                            {orderId} • {date}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="font-semibold">{price}</p>
                        <p className={`text-xs mt-1 ${statusColor}`}>
                            {status}
                        </p>
                    </div>

                    <FaRegCheckCircle size={18} className="text-muted" />
                </div>
            </div>
        </>
    );
}