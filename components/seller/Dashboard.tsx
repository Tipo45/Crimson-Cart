import { TbCurrencyNaira } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { LuPackage } from "react-icons/lu";
import { BsCartCheck } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";

export default function SellerDashboard() {
  return (
    <>
      {/* ================= STATS CARDS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard icon={<TbCurrencyNaira />} value="₦12,480" label="Revenue" growth="+18%" />
        <StatCard icon={<LuPackage />} value="164" label="Orders" growth="+12%" />
        <StatCard icon={<FiEye />} value="3.2k" label="Views" growth="+7%" />
        <StatCard icon={<FaStar />} value="4.8" label="Avg Rating" growth="+0.2" />
      </div>

      {/* ================= MAIN DASHBOARD GRID ================= */}
      <div className="grid xl:grid-cols-3 gap-8">

        {/* ================= LEFT COLUMN ================= */}
        <div className="xl:col-span-2 space-y-8">

          {/* Recent Orders */}
          <div className="bg-tertiary border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 font-semibold border-b border-divider">
              Recent Orders
            </div>

            <RecentOrderRow
              title="Leather Bag"
              orderId="ORD-3021"
              customer="Liam C."
              price="₦189.00"
              status="Shipped"
              statusStyle="bg-info/10 text-info"
            />

            <RecentOrderRow
              title="Mug Set × 2"
              orderId="ORD-3018"
              customer="Priya S."
              price="₦84.00"
              status="Pending"
              statusStyle="bg-warning/10 text-warning"
            />

            <RecentOrderRow
              title="Wool Scarf"
              orderId="ORD-3015"
              customer="Tomás R."
              price="₦67.00"
              status="Delivered"
              statusStyle="bg-success/10 text-success"
              last
            />
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-tertiary border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-6">Recent Activity</h3>

            <ActivityItem
              icon={<BsCartCheck />}
              text="New order received for Ceramic Mug"
              time="2 hours ago"
              color="text-info"
            />

            <ActivityItem
              icon={<IoAlertCircle />}
              text="Low stock alert: Wool Scarf"
              time="5 hours ago"
              color="text-warning"
            />

            <ActivityItem
              icon={<MdRateReview />}
              text="New 5★ review on Leather Bag"
              time="1 day ago"
              color="text-success"
            />
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="bg-tertiary border border-border rounded-xl p-6 h-fit">
          <h3 className="font-semibold mb-6">Top-Selling Products</h3>

          <TopProduct
            name="Leather Bag"
            sold="48 sold"
            revenue="₦4,320"
          />

          <TopProduct
            name="Ceramic Mug Set"
            sold="35 sold"
            revenue="₦2,940"
          />

          <TopProduct
            name="Wool Scarf"
            sold="27 sold"
            revenue="₦1,809"
          />
        </div>

      </div>
    </>
  );
}

/* ================= STAT CARD ================= */


type StatCardProps = {
    icon: React.ReactNode;
    value: string;
    label: string;
    growth: string;
};

function StatCard({ icon, value, label, growth }: StatCardProps) {
    return (
        <div className="bg-tertiary border border-border rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-lg bg-accent-background text-accent-text flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-success text-sm">{growth}</span>
            </div>

            <div>
                <p className="text-xl font-semibold">{value}</p>
                <p className="text-sm text-muted">{label}</p>
            </div>
        </div>
    );
}

/* ================= RECENT ORDER ROW ================= */

type RecentOrderRowProps = {
    title: string;
    orderId: string;
    customer: string;
    price: string;
    status: string;
    statusStyle: string;
    last?: boolean;
};

function RecentOrderRow({
    title,
    orderId,
    customer,
    price,
    status,
    statusStyle,
    last,
}: RecentOrderRowProps) {
    return (
        <div
            className={`flex justify-between items-center px-6 py-4 ${!last && "border-b border-divider"
                }`}
        >
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-muted">
                    {orderId} • {customer}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <span className="font-medium">{price}</span>
                <span
                    className={`text-xs px-3 py-1 rounded-full ${statusStyle}`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

function ActivityItem({
  icon,
  text,
  time,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-5 last:mb-0">
      <div className={`p-2 rounded-lg bg-muted-section ${color}`}>
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-muted mt-1">{time}</p>
      </div>
    </div>
  );
}

function TopProduct({
  name,
  sold,
  revenue,
}: {
  name: string;
  sold: string;
  revenue: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5 last:mb-0">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted">{sold}</p>
      </div>

      <p className="font-semibold text-secondary">{revenue}</p>
    </div>
  );
}