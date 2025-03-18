import { useContext } from "react";
import { ToastContext } from "../Context/ToastContext";

export const useToast = () => {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error("useToast must be used whithin a ToastProvider")
    }

    return context;
}