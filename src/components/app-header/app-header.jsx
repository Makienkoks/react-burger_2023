import React from 'react'
import styles from "../app-header/app-header.module.css";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import Button from '../button/button'
function AppHeader() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row}>
                    <div className="p-1">
                        <Button href='/' title='Конструктор' icon='BurgerIcon' />
                    </div>
                    <div className="p-1">
                        <Button href='/profile/order' title='Лента заказов' icon='ListIcon' />
                    </div>
                </div>
                <div className={styles.logo}>
                    <a href="/">
                        <Logo />
                    </a>
                </div>
                <div className={styles.row}>
                    <div className="p-1">
                        <Button href='/profile' title='Личный кабинет' icon='ProfileIcon' />
                    </div>
                </div>
            </div>
        </header>
    );
}
export default AppHeader