import { ProductFormData, ProductFormErros, ProductFormTouched } from "../types/product";
import { validateHeight, validatetColor, validateWeight } from "../types/validation";

type Props = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;

    formErrors: ProductFormErros;
    setFormErrors: React.Dispatch<React.SetStateAction<ProductFormErros>>;

    formTouched: ProductFormTouched;
    setFormTouched: React.Dispatch<React.SetStateAction<ProductFormTouched>>;
};

export default function SpecificationStep({ formData, setFormData, formErrors, setFormErrors, formTouched, setFormTouched }: Props) {

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
      case "weight":
        error = validateWeight(value) || "";
        break;

      case "height":
        error = validateHeight(value) || "";
        break;

      case "color":
        error = validatetColor(value) || "";
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm">
                  Weight
                </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder="Enter weight"
                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.weight && formErrors.weight ? "border-red-500 focus:ring-red-500" : formTouched.weight && !formErrors.weight && formData.weight ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"}`}
                  />
                  {formTouched.weight && formErrors.weight && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.weight}</p>
                  )}</div>
                <div className="space-y-2"><label className="text-sm">
                  Length
                </label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleChange("length", e.target.value)}
                    placeholder="Enter length"
                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.length && formErrors.length ? "border-red-500 focus:ring-red-500" : formTouched.length && !formErrors.length && formData.length ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"}`}
                  />
                  {formTouched.length && formErrors.length && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.length}</p>
                  )}</div>

                  <div className="space-y-2">
                  <label className="text-sm">
                    Weight
                  </label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleChange("width", e.target.value)}
                    placeholder="Enter width"
                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.width && formErrors.width ? "border-red-500 focus:ring-red-500" : formTouched.width && !formErrors.width && formData.width ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"}`}
                  />
                  {formTouched.width && formErrors.width && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.width}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm">
                    Height
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="Enter height"
                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.height && formErrors.height ? "border-red-500 focus:ring-red-500" : formTouched.height && !formErrors.height && formData.height ? "border-green-500 focus:ring-green-500"
                      : "border-input-border"}`}
                  />
                  {formTouched.height && formErrors.height && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.height}</p>
                  )}
                </div>

                <div className="space-y-2">
                                  <label className="text-sm">
                                    Size
                                  </label>
                                  <input
                                    type="number"
                                    value={formData.size}
                                    onChange={(e) => handleChange("size", e.target.value)}
                                    placeholder="Enter size"
                                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.size && formErrors.size ? "border-red-500 focus:ring-red-500" : formTouched.size && !formErrors.size && formData.size ? "border-green-500 focus:ring-green-500"
                                      : "border-input-border"}`}
                                  />
                                  {formTouched.size && formErrors.size && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.size}</p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm">
                                    Colour
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => handleChange("color", e.target.value)}
                                    placeholder="Enter product color"
                                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.color && formErrors.color ? "border-red-500 focus:ring-red-500" : formTouched.color && !formErrors.color && formData.color ? "border-green-500 focus:ring-green-500"
                                      : "border-input-border"}`}
                                  />
                                  {formTouched.color && formErrors.color && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.color}</p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                                  <label className="text-sm">
                                                    Warranty
                                                  </label>
                                                  <input
                                                    type="number"
                                                    value={formData.warranty}
                                                    onChange={(e) => handleChange("warranty", e.target.value)}
                                                    placeholder="Enter warranty"
                                                    className={`w-full h-10 bg-tertiary border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.warranty && formErrors.warranty ? "border-red-500 focus:ring-red-500" : formTouched.warranty && !formErrors.warranty && formData.warranty ? "border-green-500 focus:ring-green-500"
                                                      : "border-input-border"}`}
                                                  />
                                                  {formTouched.warranty && formErrors.warranty && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.warranty}</p>
                                                  )}
                                                </div>
        </div>
    )
};