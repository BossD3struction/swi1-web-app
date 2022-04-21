import React, {FC, useContext} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {MyToastContext} from "../contexts/MyToastContext";

export const MyToast: FC = () => {

    const {showToast, setShowToast}: any = useContext(MyToastContext);

    return (
        <ToastContainer position="bottom-center" className="p-3">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Body className="text-center">You have successfully logged out</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
