import React from 'react';
import styles from "./orders-info.module.css";
import {TFeedOrders} from "../../utils/types";
type TOrdersInfo = {
    total: number,
    totalToday: number,
    done: Array<TFeedOrders>,
    pending: Array<TFeedOrders>,
}
const OrdersInfo = ({ total, totalToday, done, pending }: TOrdersInfo) => {
    return (
        <div className={styles.info}>
            <div className={`${styles.top} mb-10 pb-2`}>
                <div className={`${styles.item}`}>
                    <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
                    <ul className={`${styles.list} ${styles.done}`}>
                    {done.map((item, index) =>
                        <li key={index} className={`text text_type_digits-default mb-2`}>
                            {item.number}
                        </li>
                    )}
                    </ul>
                </div>
                <div className={`${styles.item}`}>
                    <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                    <ul className={`${styles.list}`}>
                        {pending.map((item, index) =>
                            <li key={index} className={`text text_type_digits-default mb-2`}>
                                {item.number}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className={`${styles.status}`}>
                <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
                <p className={`${styles.status_count} text text_type_digits-large`}>{total}</p>
            </div>
            <div className={`${styles.status}`}>
                <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
                <p className={`${styles.status_count} text text_type_digits-large`}>{totalToday}</p>
            </div>
        </div>
    )
}
export default OrdersInfo;