import React from 'react'
import styles from "../app-header/app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ButtonIcon from '../button/button'
function AppHeader() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row}>
                    <div className="p-1">
                        <ButtonIcon with_icon={true} title={'Конструктор'}>
                            <BurgerIcon type="primary" />
                        </ButtonIcon>
                    </div>
                    <div className="p-1">
                        <ButtonIcon with_icon={true} title={'Лента заказов'} className={'text_color_inactive'}>
                            <ListIcon type="secondary" />
                        </ButtonIcon>
                    </div>
                </div>
                <div className={styles.logo}>
                    <a href="/">
                        <Logo />
                    </a>
                </div>
                <div className={styles.row}>
                    <div className="p-1">
                        <ButtonIcon with_icon={true} title={'Личный кабинет'} className={'text_color_inactive'}>
                            <ProfileIcon type="secondary" />
                        </ButtonIcon>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default AppHeader