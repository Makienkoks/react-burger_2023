import React, {useEffect} from 'react';
import ReactDOM from 'react-dom'
import styles from '../modal/modal.module.css';
import ModalOverlay from '../modal/modalOverlay';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const Modal = (props) => {
    const { onClose, title, children } = props;
    const modalRoot = document.getElementById('modals')
    const handleClick = () => onClose(false);
    const downHandler = (key) => {
        key.code === 'Escape' && handleClick()
    }
    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
        }
    });
    return ReactDOM.createPortal(
        (
            <div className={styles.modal_wrap}>
                <div className={styles.modal}>
                    <div className={styles.top}>
                        {title &&
                        <p className={'text text_type_main-large pt-3'} >
                            {title}
                        </p>}
                        <span className={styles.icon}>
                            <CloseIcon type="primary" onClick={ handleClick } />
                        </span>
                    </div>
                    <div className={'modal-body'}>
                        {children}
                    </div>
                </div>
                <ModalOverlay onClick={ handleClick }></ModalOverlay>
            </div>
        ),
        modalRoot
    );
}
Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
};
export default Modal;