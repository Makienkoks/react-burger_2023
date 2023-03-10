import React from 'react'
import styles from '../modal/modal.module.css'
import PropTypes from "prop-types";
const ModalOverlay = (props) => {
    return (
        <div className={styles.modal_overlay}
             onClick={props.onClick} ></div>
    );
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func
};
export default ModalOverlay;