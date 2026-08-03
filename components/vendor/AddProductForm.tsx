import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react"
import { toast } from "sonner";
import { validateCategory, validateImageUpload, validateLength, validateName, validatePrice, validateQuantity, validateShortDescription, validateSize, validatetColor, validateWeight } from "./types/validation";
import { Id } from "@/convex/_generated/dataModel";
import { MdOutlineEventNote } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import { FaArrowLeftLong, FaArrowRightLong, FaWeightScale } from "react-icons/fa6";
import { RiUploadCloud2Fill } from "react-icons/ri";
import ProductInfoStep from "./AddProductsStep/ProductInfo";
import PricingStep from "./AddProductsStep/Pricing";
import SpecificationStep from "./AddProductsStep/Specifications";
import ReviewStep from "./AddProductsStep/Review";
import { ProductFormData } from "./types/product";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductForm({ setShowForm }: Props) {

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const totalSteps = 4;
  const addProduct = useMutation(api.user.addProduct);
  const generateUploadUrl = useMutation(api.user.generateUploadUrl);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    shortDescription: "",

    price: "",
    discountPrice: "",
    quantity: "",

    weight: "",
    length: "",
    width: "",
    height: "",

    color: "",
    size: "",
    warranty: "",
    images: [],
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    category: "",
    shortDescription: "",

    price: "",
    discountPrice: "",
    quantity: "",

    weight: "",
    length: "",
    width: "",
    height: "",

    color: "",
    size: "",
    warranty: "",
    images: "",
  });

  const [formTouched, setFormTouched] = useState({
    name: false,
    category: false,
    shortDescription: false,

    price: false,
    discountPrice: false,
    quantity: false,

    weight: false,
    length: false,
    width: false,
    height: false,

    color: false,
    size: false,
    warranty: false,
    images: false,
  });

  const isProductInfoFormValid = () => {
    return (
      !validateImageUpload(formData.images) &&
      !validateCategory(formData.category) &&
      !validateName(formData.name) &&
      !validateShortDescription(formData.shortDescription)
    );
  };

  const isPricingFormValid = () => {
    return (
      !validatePrice(formData.price) &&
      !validateQuantity(formData.quantity)
    );
  };

  const isSpecificationsFormValid = () => {
    return (
      !validateWeight(formData.weight) &&
      !validateLength(formData.length) &&
      !validatetColor(formData.color)
    );
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return isProductInfoFormValid();

      case 2:
        return isPricingFormValid();

      case 3:
        return isSpecificationsFormValid();

      case 4:
        return true;

      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!isCurrentStepValid()) return;

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleAddProduct = async () => {
    try {
      setIsSaving(true);

      const storageIds: Id<"_storage">[] = [];

      for (const image of formData.images) {
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": image.type,
          },
          body: image,
        });

        if (!result.ok) {
          throw new Error(`Failed to upload ${image.name}`);
        }

        const { storageId } = await result.json();

        storageIds.push(storageId);
      }

      await addProduct({
        category: formData.category,
        name: formData.name,
        shortDescription: formData.shortDescription,

        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice),
        quantity: Number(formData.quantity),

        weight: formData.weight,
        length: formData.length,
        width: formData.width,
        height: formData.height,

        color: formData.color,
        size: formData.size,
        warranty: formData.warranty,

        imageIds: storageIds,
      });

      toast.success("Product added successfully!");
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong.");
    } finally {
      setIsSaving(false)
    }
  };

  return (
    <section className="bg-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
          <MdOutlineEventNote className="w-4 h-4" />
          Add Product
        </div>
        <div className="transition-shadow duration-300 overflow-hidden">
          <div className="p-2 lg:p-4">

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary rounded-xl">
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Product Information
              </h3>
            </div>
            {step === 1 ? (<p className="text-gray-600 ml-10">
              Complete the form below to begin adding a product.
            </p>) : (<p className="text-gray-600 ml-12">Review Information</p>)}
            <div className="flex flex-col gap-6 mt-8 px-5">
              {step === 1 && (<ProductInfoStep formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                formTouched={formTouched}
                setFormTouched={setFormTouched} />)}
              {step === 2 && (<PricingStep formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                formTouched={formTouched}
                setFormTouched={setFormTouched} />)}
              {step === 3 && (<SpecificationStep formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                formTouched={formTouched}
                setFormTouched={setFormTouched} />)}
              {step === 4 && (<ReviewStep formData={formData} />)}
            </div>
          </div>

          <div className="grid grid-cols-2 mt-4 gap-2">
            {step > 1 && (<button
              type="button"
              onClick={previousStep}
              disabled={isSaving}
              className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl w-full text-base font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeftLong />
              Back
            </button>)}

            {step < totalSteps ? (<button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentStepValid() || isSaving}
              className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-secondary rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed
              <FaArrowRightLong />
            </button>) : (<button
              onClick={handleAddProduct}
              disabled={isSaving}
              className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-secondary rounded-xl w-full text-base text-white font-semibold shadow-lg hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <span>Save Product</span>
                  <CiSaveDown1 className="text-xl" />
                </>
              )}
            </button>)}
          </div>

        </div>

      </div>
    </section>
  )
}