import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function showErrorToast(message) {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });
}