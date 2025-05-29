// src/components/ui/toast.js
import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    type: "default",
    pauseOnHover: true,
    draggable: true,
  }); 
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    type: "error",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};