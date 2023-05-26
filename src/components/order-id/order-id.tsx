import React, {useEffect} from 'react';
import styles from "../order-id/order-id.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import * as H from "history";
import {useDispatch, useSelector} from "../../services/hooks";
import {ordersFeed, successFeed} from "../../services/feed/selectors";
import { TFeedOrders } from "../../utils/types";
import {getIngredients} from "../../services/ingredients/selectors";
import Moment from "react-moment";
import 'moment/locale/ru'
import {connect as connectFeed, disconnect as disconnectFeed} from "../../services/feed/actions";
const OrderId = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const navigationType = useNavigationType()
    const [idOrder, setIdOrder] = React.useState<string>()
    const [feedId, setFeedId] = React.useState<Array<TFeedOrders>>()

    let state = location.state as {backgroundLocation: H.Location}
    let backgroundLocation = state && state.backgroundLocation

    const ingredients = useSelector(getIngredients);
    const feed = useSelector(ordersFeed);
    const error = !!useSelector(successFeed);

    const dispatch = useDispatch();
    let path = location.pathname

    const calendarStrings = {
        lastDay : '[Вчера,] LT',
        sameDay : '[Сегодня,] LT',
        nextDay : '[Завтра,] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    useEffect(() => {
        let id:number
        if (path.indexOf("/profile/orders/") > -1) {
            id = Number(location.pathname.replace('/profile/orders/',''))
            if (id) {
                id && setFeedId(feed.filter(item => item.number === Number(id)))
                id && setIdOrder(String(id))
            }
        } else {
            id = Number(location.pathname.replace('/feed/',''))
            if (id) {
                id && setFeedId(feed.filter(item => item.number === Number(id)))
                id && setIdOrder(String(id))
            }
        }
    }, [path, feed])

    useEffect(() => {
        dispatch(connectFeed('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(disconnectFeed());
        }
    }, [dispatch]);

    const getIngredient = (id: string) => {
        return ingredients.filter(item => item._id === id)
    }

    const getImage = (id: string) => {
        return getIngredient(id)[0].image_mobile
    }
    const getName = (id: string) => {
        return getIngredient(id)[0].name
    }
    const getPrice = (id: string) => {
        let price = 0
        if (feedId && feedId.length) {
            feedId.map(items => {
                items.ingredients.map(item => {
                    if (item === id) {
                        price = price + 1
                    }
                })
            })
        }
        return price + ' x ' + getIngredient(id)[0].price
    }
    const getSum = (ingredients: string[]) => {
        let sum = 0
        ingredients.map(items => {
            sum = Number(sum) + getIngredient(items)[0].price
        })
        return sum
    }
    const content = (
        <>
            {feedId && feedId.length &&
                feedId.map((item, index) =>
                    <div key={item._id}>
                        <p className={`text text_type_main-medium mb-2`}>{item.name}</p>
                        {item.status === 'done' && <p className={`${styles.done} text text_type_main-default mb-15`}>Готов</p>}
                        {item.status === 'pending' && <p className={`text text_type_main-default mb-15`}>Готовится</p>}
                        {item.status === 'created' && <p className={`text text_type_main-default mb-15`}>Создан</p>}
                        <p className={`text text_type_main-medium mb-6`}>Состав:</p>

                        <div className={`${styles.list} mb-10`}>
                            {item.ingredients.filter((ingredient, index) => {
                                return item.ingredients.indexOf(ingredient) === index
                            }).map((items, index) =>
                                <div className={`${styles.item} mb-4`} key={index}>
                                    <div className={`${styles.item_block}`}>
                                        <div className={`${styles.item}`}>
                                            <div className={`${styles.item_block}`}>
                                                <div className={`${styles.order_ingredient}`} style={{ zIndex: feed.length - index }}>
                                                    <img className={`${styles.order_ingredient_image}`}
                                                         src={'' + getImage(items)} alt={getName(items)} />
                                                </div>
                                            </div>
                                            <div className={`${styles.item_block}`}>
                                                <p className={`${styles.name} text text_type_main-default`}>{getName(items)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.item_block}`}>
                                        <div className={`${styles.price}`}>
                                            <span className={`${styles.price_ingredient} text text_type_digits-default mr-2`}>{getPrice(items)}</span>
                                            <CurrencyIcon type="primary"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={`${styles.bottom}`}>
                            <p className={`${styles.date} text text_type_main-default text_color_inactive`}>
                                {item.createdAt &&
                                    <Moment locale="ru" calendar={calendarStrings}>
                                        {item.createdAt}
                                    </Moment>
                                }
                            </p>
                            <div className={`${styles.price}`}>
                                <span className={`${styles.price_ingredient} text text_type_digits-default mr-2`}>{getSum(item.ingredients)}</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
    return (
        <>
            {feedId && feedId.length ?
                <>
                    {(navigationType === 'PUSH' || navigationType === 'POP') && !!backgroundLocation ? (
                        <>
                            {idOrder &&
                                <Modal title={'#'+idOrder} onClose={() => navigate(backgroundLocation, {state: {}})}>
                                    {content}
                                </Modal>
                            }
                        </>
                    ) : (
                        <div className={styles.order}>
                            <p className={`${styles.num} text text_type_digits-default mb-10`}>{'#' + idOrder}</p>
                            {content}
                        </div>
                    )}
                </>
                :
                <div className={styles.order}>
                    {error &&
                        <>
                            <p className={`${styles.num} text text_type_digits-default mb-10`}>
                                А вот нет такого заказа :(
                            </p>
                        </>
                    }
                </div>
            }
        </>
    )
}
export default OrderId;