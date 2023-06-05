import React, {ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom'
import styles from '../modal/modal.module.css';
import ModalOverlay from './modalOverlay';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    title?: string;
    onClose: (arg: boolean) => void;
    children: ReactNode;
}
const Modal = ({ title, onClose, children }: IModalProps) => {
    const modalRoot = document.getElementById('modals') as HTMLElement
    const handleClick = () => onClose(false);
    const downHandler = (event: KeyboardEvent) => {
        (event.key === 'Escape') && handleClick()
    }
    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
        }
    });
    return ReactDOM.createPortal(
        (
            <div data-elem='modal' className={styles.modal_wrap}>
                <div className={styles.modal}>
                    <div className={styles.top}>
                        {title &&
                        <p className={'text text_type_main-large pt-3'} >
                            {title}
                        </p>}
                        <span data-elem='modal-closer'  className={styles.icon}>
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
    )
}
export default Modal