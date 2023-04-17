import React from 'react';
import styles from "../not-found/not-found.module.css";
import Button from "../../components/button/button";
const NotFound404 = () => {
    return (
        <div className={`${styles.page} pl-5 pr-5`}>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>
                404 страница не найдена
            </h1>
            <Button href='/' title='Ступайте на главную' />
        </div>
    )
}
export default NotFound404;