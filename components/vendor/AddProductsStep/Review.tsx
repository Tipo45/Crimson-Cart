import { LuBoxes, LuExpand, LuPackage, LuShieldCheck } from "react-icons/lu";
import { ProductFormData } from "../types/product";
import { MdDescription, MdHeight, MdPalette } from "react-icons/md";
import { TbCategory, TbCurrencyNaira, TbRulerMeasure, TbViewportWide } from "react-icons/tb";
import { FaWeightScale } from "react-icons/fa6";

type Props = {
    formData: ProductFormData;
};

export default function ReviewStep({ formData }: Props) {
    return (

        <div className="bg-white rounded-2xl border-2 border-slate-200/60 overflow-hidden shadow-sm">

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <TbCategory className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Category</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.category}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <LuPackage className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Name</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.name}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <MdDescription className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Description</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.shortDescription}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <TbCurrencyNaira className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Price</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.price}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <TbCurrencyNaira className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Discount Price</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.discountPrice === "" ? "-" : formData.discountPrice}
                </span>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <LuBoxes className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Quantity</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.quantity}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <FaWeightScale className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Weight</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.weight === "" ? "-" : formData.weight}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <TbRulerMeasure className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Length</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.length === "" ? "-" : formData.length}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <TbViewportWide className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Width</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.width === "" ? "-" : formData.width}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <MdHeight className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Height</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.height === "" ? "-" : formData.height}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <MdPalette className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Colour</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.color === "" ? "-" : formData.color}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <LuExpand className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Size</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.size === "" ? "-" : formData.size}
                </span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                        <LuShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-sm text-slate-500">Warranty</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                    {formData.warranty === "" ? "-" : formData.warranty}
                </span>
            </div>


        </div>
    )
}