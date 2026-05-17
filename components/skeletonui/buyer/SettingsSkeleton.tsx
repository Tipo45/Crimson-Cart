import { FaSpinner } from "react-icons/fa";

export default function SettingSkeleton () {
    return (
        <>
        <div className="flex justify-center items-center">
            <FaSpinner size={50} className="text-secondary animate-spin" />
        </div>
        </>
    )
}