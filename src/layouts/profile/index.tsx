import React from 'react';
import {NavLink, Outlet, useMatch} from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header';
import styles from "../../layouts/profile/profile-layout.module.css";
import {logOutUser} from "../../services/user/actions";
import { useDispatch } from '../../services/hooks';

const ProfileLayout = () => {
    const profilePath = useMatch('/profile')
    const profileOrderPath = useMatch('/profile/order')
    const dispatch = useDispatch()

    const refreshToken = {token: localStorage.getItem('refreshToken')}

    const handleClick = () => {
        dispatch(logOutUser(refreshToken))
    }

    return (
        <>
            <AppHeader/>
            <main className={styles.container}>
                <div className={`${styles.page} pl-5 pr-5`}>
                <div className={`${styles.page} pl-5 pr-5`}>
                    <div className={`${styles.side_bar} mr-7 mb-10`}>
                        <ul className={`${styles.menu} mr-12 mb-10`}>
                            <li className="pt-4 pb-4">
                                <NavLink className={profilePath ? styles.active_link : styles.link} to={'/profile'}>Профиль</NavLink>
                            </li>
                            <li className="pt-4 pb-4">
                                <NavLink className={profileOrderPath ? styles.active_link : styles.link} to={'/profile/order'}>История заказов</NavLink>
                            </li>
                            <li className="pt-4 pb-4">
                                <NavLink onClick={ handleClick } className={styles.link} to={'#'}>
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                        <p className={`${styles.message} text text_type_main-default text_color_inactive mt-9`}>В этом разделе вы можете изменить свои персональные данные</p>
                    </div>
                    <Outlet />
                </div>
                </div>
            </main>
        </>
    )
}
export default ProfileLayout