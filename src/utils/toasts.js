import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (text) => toast.success(`${text}`, {
    position: 'top-center',
    autoClose: 3000,
});

export const notifyError = (text) => toast.error(`${text}`, {
    position: 'top-center',
    autoClose: 3000,
});
