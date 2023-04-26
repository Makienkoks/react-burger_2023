import React from 'react'
import styles from '../modal/modal.module.css'
type TModalOverlay = {
    onClick?: () => void
}
const ModalOverlay = ({onClick}: TModalOverlay) => {
    return (
        <div className={styles.modal_overlay}
             onClick={onClick} ></div>
    )
}
export default ModalOverlay