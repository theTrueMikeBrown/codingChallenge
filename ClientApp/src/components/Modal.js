import React from 'react';

const Modal = ({ handleClose, showModal, children }) => {
    const currentClassName = showModal ? "modal display-block" : "modal";

    return (
        <div className={currentClassName}>
            <section className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </section>
        </div>
    );
};

export default Modal;