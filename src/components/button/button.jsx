import React from 'react'
import styles from "./button.module.css";
import PropTypes from "prop-types";
const ButtonIcon = (props) => {
    const { title, className, with_icon, children } = props;
    return (
        <a href="/" className={styles.button}>
            {with_icon &&
                <span className={styles.icon}> {children} </span>
            }
            <span className={`${className} ${with_icon && styles.title}`}>
                {title}
            </span>
        </a>
    );
}
ButtonIcon.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    with_icon: PropTypes.bool
};
export default ButtonIcon