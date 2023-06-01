import React from 'react';
import styles from "./order-list.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router-dom";
import {TFeedOrders} from "../../utils/types";
import {useSelector} from "../../services/hooks";
import {getIngredients} from "../../services/ingredients/selectors";
import Moment from "react-moment";
import 'moment/locale/ru'
type TOrdersList = {
    list: Array<TFeedOrders>,
    showStatus?: boolean,
    revers?: boolean
}
const OrdersList = ({revers = false, showStatus = true, list }: TOrdersList) => {
    const ingredients = useSelector(getIngredients);

    const calendarStrings = {
        lastDay : '[Вчера,] LT',
        sameDay : '[Сегодня,] LT',
        nextDay : '[Завтра,] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    const navigate = useNavigate()
    const location = useLocation()

    const getIngredient = (id: string) => {
        return ingredients.filter(item => item._id === id)
    }
    const getImage = (id: string) => {
        return getIngredient(id)[0] && 'image_mobile' in getIngredient(id)[0] ? getIngredient(id)[0].image_mobile : null
    }
    const getName = (id: string) => {
        return getIngredient(id)[0] && 'name' in getIngredient(id)[0] ? getIngredient(id)[0].name : null
    }
    const getSum = (ingredients: string[]) => {
        let sum = 0
        ingredients.map(items => {
            const price = getIngredient(items)[0] && 'price' in getIngredient(items)[0] ? getIngredient(items)[0].price : 0
            sum = Number(sum) + Number(price)
        })
        return sum
    }

    const handleClick = (id:string) => () => {
        navigate(`${location.pathname}/${id}`, {state: {backgroundLocation: location}})
    }
    return (
        <div className={`${styles.order} pr-2`}>
            <div className={revers ? `${styles.revers} pr-2` : `pr-2`}>
                {list && list.map((item, index) =>
                    <div className={`${styles.link} pr-2`}
                         onClick={handleClick(''+ item.number)}
                         key={index}>
                        <div className={`${styles.item}`}>
                            <div className={`${styles.top} mb-6`}>
                                <div className={`${styles.number} text text_type_digits-default`}>
                                    #{item.number}
                                </div>
                                <div className={`${styles.date} text text_type_main-default text_color_inactive`}>
                                    {item.createdAt &&
                                        <Moment locale="ru" calendar={calendarStrings}>
                                            {item.createdAt}
                                        </Moment>
                                    }
                                </div>
                            </div>
                            <div className={`${styles.content} mb-4`}>
                                <p className={`text text_type_main-medium mb-2`}>{item.name}</p>
                                {showStatus && item.status === 'created' &&
                                    <p className={`text text_type_main-default mb-2`}>Создан</p>
                                }
                                {showStatus && item.status === 'pending' &&
                                    <p className={`text text_type_main-default mb-2`}>Готовится</p>
                                }
                                {showStatus && item.status === 'done' &&
                                    <p className={`text text_type_main-default mb-2`}>Готов</p>
                                }
                            </div>
                            <div className={`${styles.bottom}`}>
                                <div className={`${styles.list}`}>
                                    <ul className={`${styles.order_list}`}>
                                        {item.ingredients.map((items, index) =>
                                            <li className={`${styles.order_ingredient}`}
                                                key={index}
                                                style={{ zIndex: item.ingredients.length - index }}>
                                                <img className={`${styles.order_ingredient_image}`}
                                                     src={getImage(items) ? '' + getImage(items) : ""} alt={'' + getName(items)} />

                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className={`${styles.price}`}>
                                    <span className={`${styles.price_ingredient} text text_type_digits-default mr-2`}>{getSum(item.ingredients)}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default OrdersList;