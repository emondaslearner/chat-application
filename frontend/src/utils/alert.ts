import { toast, ToastPosition } from "react-toastify";

interface ToastProps {
  message: string;
  position?: ToastPosition;
}

export const success = ({ message, position = "top-right" }: ToastProps): void => {
  toast.success(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  });
};

export const error = ({ message, position = "top-right" }: ToastProps): void => {
  toast.error(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  });
};
