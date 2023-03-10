import React from 'react'
import styles from "./button.module.css";
import PropTypes from "prop-types";
const ButtonIcon = (props) => {
    return (
        <button className={styles.button}>
            {props.with_icon &&
                <span className={styles.icon}> {props.children} </span>
            }
            <span className={`${props.className} ${props.with_icon && styles.title}`}>
                {props.title}
            </span>
        </button>
    );
}
ButtonIcon.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    with_icon: PropTypes.bool
};
export default ButtonIcon