import React from 'react'
import styles from "./button.module.css";
import PropTypes from "prop-types";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink} from 'react-router-dom';
const Button = (props) => {
    const { title, href, icon } = props
    const getClass = (isActive) => {
        return [ styles.button, isActive ? styles.active : styles.inactive ].join(' ')
    }
    const getTypeIcon = (isActive) => {
        return isActive ? 'primary' : 'secondary'
    }
    const getIcon = (iconName, isActive) => {
        switch (iconName) {
            case 'BurgerIcon':
                return <BurgerIcon type={getTypeIcon(isActive)} />
            case 'ListIcon':
                return <ListIcon type={getTypeIcon(isActive)} />
            case 'ProfileIcon':
                return <ProfileIcon type={getTypeIcon(isActive)} />
            default:
                return null
        }
    }

    return (
        <NavLink to={href} className={({ isActive }) => getClass(isActive)}>
            {({ isActive }) => (
                <>
                    {icon &&
                    <span className={styles.icon}>
                        {getIcon(icon, isActive)}
                    </span>
                    }
                    <span className={icon ? styles.title : null}>
                        {title}
                    </span>
                </>
            ) }
        </NavLink>
    );
}
// Button.defaultProps  = {
//     title: 'Нажми на меня! :))))'
// }
Button.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
export default Button