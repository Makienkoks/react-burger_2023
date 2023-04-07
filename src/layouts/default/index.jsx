import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header';
import styles from "../default/default-layout.module.css";

const DefaultLayout = () => {
    return (
        <>
            <AppHeader/>
            <main className={`pt-5 pb-5`}>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </main>
        </>
    )
}
export default DefaultLayout