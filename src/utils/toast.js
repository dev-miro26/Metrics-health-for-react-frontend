import { toast } from "react-toastify";

const options = {
  autoClose: 5000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
};

const myToast = {
  success: (message) => {
    toast.success(message, options);
  },
  info: (message) => {
    toast.info(message, options);
  },
  error: (message) => {
    toast.error(message, options);
  },
  warning: (message) => {
    toast.warn(message, options);
  },
};

export default myToast;
