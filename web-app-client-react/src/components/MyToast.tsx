import React, {FC, useContext} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {ToastContext} from "../contexts/ToastContext";

export const MyToast: FC = () => {

    const {show, setShow}: any = useContext(ToastContext);

    return (
        <ToastContainer position="bottom-center" className="p-3">
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className="text-center">You have successfully logged out</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
