import { ProductFormData, ProductFormErros, ProductFormTouched } from "../types/product";
import { validatePrice, validateQuantity } from "../types/validation";

type Props = {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;

  formErrors: ProductFormErros;
  setFormErrors: React.Dispatch<React.SetStateAction<ProductFormErros>>;

  formTouched: ProductFormTouched;
  setFormTouched: React.Dispatch<React.SetStateAction<ProductFormTouched>>;
};

export default function PricingStep({ formData, setFormData, formErrors, setFormErrors, formTouched, setFormTouched }: Props) {

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
      case "price":
        error = validatePrice(value) || "";
        break;

      case "quantity":
        error = validateQuantity(value) || "";
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

      <div className="space-y-2">
        <label className="text-sm">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
          placeholder="Enter price"
          className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.price && formErrors.price ? "border-red-500 focus:ring-red-500" : formTouched.price && !formErrors.price && formData.price ? "border-green-500 focus:ring-green-500"
            : "border-input-border"}`}
        />
        {formTouched.price && formErrors.price && (
          <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
        )}
      </div>

      <div className="space-y-2"><label className="text-sm">
        Discount Price
      </label>
        <input
          type="number"
          value={formData.discountPrice}
          onChange={(e) => handleChange("discountPrice", e.target.value)}
          placeholder="Enter discount price"
          className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.discountPrice && formErrors.discountPrice ? "border-red-500 focus:ring-red-500" : formTouched.discountPrice && !formErrors.discountPrice && formData.discountPrice ? "border-green-500 focus:ring-green-500"
            : "border-input-border"}`}
        />
        {formTouched.discountPrice && formErrors.discountPrice && (
          <p className="text-red-500 text-sm mt-1">{formErrors.discountPrice}</p>
        )}</div>
      <div className="space-y-2"><label className="text-sm">
        Quantity <span className="text-red-500">*</span>
      </label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          placeholder="Enter quantity"
          className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.quantity && formErrors.quantity ? "border-red-500 focus:ring-red-500" : formTouched.quantity && !formErrors.quantity && formData.quantity ? "border-green-500 focus:ring-green-500"
            : "border-input-border"}`}
        />
        {formTouched.quantity && formErrors.quantity && (
          <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>
        )}</div>
    </div>

  )
};