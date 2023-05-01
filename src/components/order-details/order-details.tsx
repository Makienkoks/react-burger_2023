import React from 'react'
import styles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
const OrderDetails = () => {
    // @ts-ignore
    const numOrder = useSelector((store: RootState) => store.sendOrder.order.number);
    // @ts-ignore
    const isLoading = useSelector((store: RootState) => store.sendOrder.order.isLoading);
    // @ts-ignore
    const success = useSelector((store: RootState) => store.sendOrder.order.success);
    return (
        <>
            {isLoading && !success && 'Загрузка...'}
            {!isLoading && !success && 'Произошла ошибка'}
            {!isLoading && success && numOrder &&
                <div className={`pb-10 mb-10 ${styles.order}`}>
                    <div className={styles.orderNumber}>{numOrder}</div>
                    <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
                    <div className={styles.bgr}>
                    <span className={styles.order_icon}>
                        <CheckMarkIcon type="primary"/>
                    </span>
                    </div>
                    <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
                    <p className="text_color_inactive text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
                </div>
            }
        </>
    )
};
export default OrderDetails