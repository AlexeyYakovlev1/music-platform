import React from 'react';
import classes from "./Modal.module.sass";
import ModalContext from "src/context/modal.context";
import cn from "classnames";

interface IModalProps {
    children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
    const { visible, setVisible } = React.useContext(ModalContext);
    
    return (
        <div
            onClick={() => setVisible(false)}
            className={cn(classes.modal, {
                [classes.hidden]: !visible
            })}
        >
            <div
                onClick={event => event.stopPropagation()}
                className={classes.body}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal