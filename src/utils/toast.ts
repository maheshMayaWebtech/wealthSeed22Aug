import { Bounce, toast } from "react-toastify";

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: "top-right",
    theme: "colored",
    transition: Bounce,
  });
};

export const toastError = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    theme: "colored",
    transition: Bounce,
  });
};

export const toastWarning = (message: string) => {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Bounce,
    });
}
