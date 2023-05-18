import React, {useEffect} from 'react';
import styles from "../feed/feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersInfo from "../../components/orders-info/orders-info";
import {useDispatch, useSelector} from "../../services/hooks";
import {ordersFeed, totalFeed, totalTodayFeed, successFeed } from "../../services/feed/selectors";
import {connect as connectFeed, disconnect as disconnectFeed} from "../../services/feed/actions";
const Feed = () => {
    const feed = useSelector(ordersFeed);
    const error = !!useSelector(successFeed);
    const total = useSelector(totalFeed);
    const totalToday = useSelector(totalTodayFeed);
    const done = feed.filter((item: { status: string; }) => item.status === 'done')
    const pending = feed.filter((item: { status: string; }) => item.status === 'pending')

    const dispatch = useDispatch();

    const url = 'wss://norma.nomoreparties.space/orders/all';

    useEffect(() => {
        dispatch(connectFeed(url));
        return () => {
            dispatch(disconnectFeed());
        }
    }, [dispatch]);

    return (
        <>
            <div className={styles.order_list}>
                <h1>Лента заказов</h1>
                {error ?
                    (<OrdersList list={feed} showStatus={false}  />)
                    :
                    (<div><div className={styles.loader}></div></div>)
                }
            </div>
            <div className={styles.order_info}>
                {error ?
                    (<OrdersInfo totalToday={totalToday} total={total} done={done} pending={pending} />)
                    :
                    (<div><div className={styles.loader}></div></div>)
                }
            </div>
        </>
    )
}
export default Feed;