import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast configuration
toast.configure({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    draggable: true,
    pauseOnHover: true
});

export default function Toast(message, type) {
    return toast[type](message);
}