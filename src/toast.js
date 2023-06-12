import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"

export const toast = (content) => {
    Toastify({
        text: content,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: '#0070f3'
        }
    }).showToast();
}
