import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Toast {
    show: boolean
    message: string
    type: 'SUCCESS' | 'ERROR'
}

const initialState: Toast = {
    show: false,
    message: '',
    type: 'SUCCESS'
}

const ToastSlicer =  createSlice({
    name: 'toast',
    initialState,
    reducers: {
        openToast: (_state, action: PayloadAction<Toast>) => action.payload,
        closeToast: () => initialState,
    }
});

// Actions
export const { openToast, closeToast } = ToastSlicer.actions

// Reducer
export default ToastSlicer.reducer
