import React from 'react'
import styles from "./button.module.css";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink} from 'react-router-dom';
type TButton = {
    href: string,
    title: string,
    icon?: string
}
const Button = ({ title, href, icon }: TButton) => {
    const getClass = (isActive: boolean) => {
        return [ styles.button, isActive ? styles.active : styles.inactive ].join(' ')
    }
    const getTypeIcon = (isActive: boolean) => {
        return isActive ? 'primary' : 'secondary'
    }
    const getIcon = (iconName: string, isActive: boolean) => {
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
                    <span className={`${icon ? styles.title : null}`}>
                        {title}
                    </span>
                </>
            ) }
        </NavLink>
    )
}
export default Button