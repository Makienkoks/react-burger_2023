import React from 'react'
import styles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
const OrderDetails = () => {
    return (
        <div className={`pb-10 mb-10 ${styles.order}`}>
            <div className={styles.orderNumber}>034536</div>
            <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
            <div className={styles.bgr}>
                <span className={styles.order_icon}>
                    <CheckMarkIcon type="primary"/>
                </span>
            </div>
            <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text_color_inactive text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
};
export default OrderDetails