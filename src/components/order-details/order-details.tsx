import React, {useEffect} from 'react'
import styles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../../services/hooks';
import {getNumOrder, sendOrderIsError, sendOrderIsLoading} from "../../services/order/selectors";
import {addIngredient} from "../../services/orderList/actions";
const OrderDetails = () => {

    const numOrder = useSelector(getNumOrder);
    const isLoading = useSelector(sendOrderIsLoading);
    const success = useSelector(sendOrderIsError);

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoading && success) {
            dispatch(addIngredient({
                bun: null,
                ingredients: []
            }))
        }
    }, [numOrder, isLoading, success])

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