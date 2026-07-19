import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFormData, ProductFormErros, ProductFormTouched } from "../types/product";
import { validateCategory, validateName, validateShortDescription } from "../types/validation";
import { LuFileText } from "react-icons/lu";
import { RiUploadCloud2Fill } from "react-icons/ri";

type Props = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;

    formErrors: ProductFormErros;
    setFormErrors: React.Dispatch<React.SetStateAction<ProductFormErros>>;

    formTouched: ProductFormTouched;
    setFormTouched: React.Dispatch<React.SetStateAction<ProductFormTouched>>;
};

export default function ProductInfoStep({ formData, setFormData, formErrors, setFormErrors, formTouched, setFormTouched }: Props) {

    const categories = [
        "Phones & Tablets",
        "Electronics",
        "Computing",
        "Fashion",
        "Supermarket",
        "Health & Beauty",
        "Home & Office",
        "Appliances",
        "Baby Products",
        "Gaming",
        "Sporting Goods",
        "Automobile",
        "Books",
        "Musical Instruments",
        "Garden & Outdoor",
        "Pet Supplies",
        "Jewelry",
        "Watches",
        "Industrial Equipment",
        "Food & Drinks",
        "Others",
    ];

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per image

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files ?? []);

        setFormTouched((prev) => ({
            ...prev,
            images: true,
        }));

        if (files.length === 0) {
            setFormData((prev) => ({
                ...prev,
                images: [],
            }));

            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                setFormErrors((prev) => ({
                    ...prev,
                    images: `${file.name} exceeds the 5 MB limit.`,
                }));
                return;
            }

            if (!allowedTypes.includes(file.type)) {
                setFormErrors((prev) => ({
                    ...prev,
                    images: `${file.name} is not a supported image format.`,
                }));
                return;
            }
        }

        setFormErrors((prev) => ({
            ...prev,
            images: "",
        }));

        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
    };

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        setFormTouched(prev => ({
            ...prev,
            [field]: true,
        }));

        let error = "";

        switch (field) {
            case "category":
                error = validateCategory(value) || "";
                break;

            case "name":
                error = validateName(value) || "";
                break;
            case "shortDescription":
                error = validateShortDescription(value) || "";
                break;
        }

        setFormErrors(prev => ({
            ...prev,
            [field]: error,
        }));
    };

    return (
        <section>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <Select
                        value={formData.category}
                        onValueChange={(value) => handleChange("category", value ?? "")}
                    >
                        <SelectTrigger className={`w-full h-12 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.category && formErrors.category ? "border-red-500 focus:ring-red-500" : formTouched.category && !formErrors.category && formData.category ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}>
                            <SelectValue placeholder="Choose Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formTouched.category && formErrors.category && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter product name"
                        className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.name && formErrors.name ? "border-red-500 focus:ring-red-500" : formTouched.name && !formErrors.name && formData.name ? "border-green-500 focus:ring-green-500"
                            : "border-input-border"}`}
                    />
                    {formTouched.name && formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.shortDescription}
                        onChange={(e) => handleChange("shortDescription", e.target.value)}
                        placeholder="Enter short product description"
                        className={`w-full h-30 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.shortDescription && formErrors.shortDescription ? "border-red-500 focus:ring-red-500" : formTouched.shortDescription && !formErrors.shortDescription && formData.shortDescription ? "border-green-500 focus:ring-green-500"
                            : "border-input-border"}`}
                    />
                    {formTouched.shortDescription && formErrors.shortDescription && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.shortDescription}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <p>Images <span className="text-red-500">*</span></p>
                    <label className="">

                        <RiUploadCloud2Fill className="w-14 h-14 text-secondary mb-4" />

                        <h3 className="font-semibold text-lg">
                            Click to upload product images
                        </h3>


                        <p className="text-xs text-slate-400 mt-1">
                            Maximum size for each file: 5 MB
                        </p>

                        <input
                            id="paper-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {formData.images.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {formData.images.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <span className="text-sm truncate">{file.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {formTouched.images && formErrors.images && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.images}</p>
                    )}
                </div>
            </div>
        </section>
    )
};