import { Toast as ToastInteface, closeToast } from "@/lib/slicers/ToastSlicer";

import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export const Toast = (props: {toast: ToastInteface}) => {

    const dispatch = useAppDispatch();

    const handleCloseToast = () => {
        dispatch(closeToast());
    }

    useEffect(() => {
        if (props.toast.show) {
            setTimeout(()=>{
                dispatch(closeToast());
            }, 4000)
        }
    }, [props.toast])

    return (
        <button className={`toast ${props.toast.type.toLowerCase()}`} onClick={handleCloseToast}>
            {props.toast.message}
            <span>x</span>
        </button>
    )
}