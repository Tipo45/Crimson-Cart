import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";

type Address = {
    id: string;
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    isDefault?: boolean;
};

export default function Address() {

    const addresses: Address[] = [
            {
                id: "1",
                fullName: "Steven Azebi",
                street: "12 Palm Avenue",
                city: "Yenagoa",
                state: "Bayelsa State",
                country: "Nigeria",
                phone: "+234 813 854 955",
                isDefault: true,
            },
            {
                id: "2",
                fullName: "Steven Azebi",
                street: "45 Market Road",
                city: "Obio/Akpor",
                state: "Rivers State",
                country: "Nigeria",
                phone: "+234 813 854 955",
            },
        ];

    return (
        <>
        <div>
                                            <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
        
                                            {/* Grid */}
                                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
        
                                                {addresses.map((address) => (
                                                    <div
                                                        key={address.id}
                                                        className="relative bg-tertiary border border-border rounded-xl p-6 hover:shadow-sm transition"
                                                    >
                                                        {/* Default Badge */}
                                                        {address.isDefault && (
                                                            <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-badge-background text-badge-text font-medium">
                                                                Default
                                                            </span>
                                                        )}
        
                                                        {/* Address Content */}
                                                        <div className="space-y-1 text-sm text-secondary-text">
                                                            <p className="font-semibold text-primart-text">
                                                                {address.fullName}
                                                            </p>
                                                            <p>{address.street}</p>
                                                            <p>
                                                                {address.city}, {address.state}
                                                            </p>
                                                            <p>{address.country}</p>
                                                            <p className="pt-2 text-muted">{address.phone}</p>
                                                        </div>
        
                                                        {/* Actions */}
                                                        <div className="flex gap-4 mt-6">
                                                            <button className="flex items-center gap-2 text-secondary-button-text hover:text-secondary transition text-sm">
                                                                <FaEdit size={14} />
                                                                Edit
                                                            </button>
        
                                                            <button className="flex items-center gap-2 text-error hover:opacity-80 transition text-sm">
                                                                <FaTrash size={14} />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
        
                                                {/* Add New Address Card */}
                                                <button className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-input-border rounded-xl p-6 bg-tertiary hover:bg-secondary-button transition text-secondary-text">
                                                    <div className="w-10 h-10 rounded-full bg-secondary-button flex items-center justify-center">
                                                        <IoAdd size={20} className="text-secondary-button-text" />
                                                    </div>
                                                    <span className="text-sm font-medium">Add New Address</span>
                                                </button>
        
                                            </div>
                                        </div>
        </>
    )
}