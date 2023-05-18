import React, {useEffect} from 'react';
import OrderList from "../../components/orders-list/orders-list";
import {useDispatch, useSelector} from "../../services/hooks";
import {connectProfile as connect, disconnectProfile as disconnect} from "../../services/feed-profile/actions";
import styles from "../feed/feed.module.css";
import {ordersFeedProfile, successFeedProfile} from "../../services/feed-profile/selectors";
const ProfileOrders = () => {
    const feed = useSelector(ordersFeedProfile);
    const error = !!useSelector(successFeedProfile);

    const dispatch = useDispatch();

    const accessToken = '' + localStorage.getItem('accessToken')
    const token = accessToken.replace('Bearer ', '')
    const url = 'wss://norma.nomoreparties.space/orders?token=' + token;

    useEffect(() => {
        dispatch(connect(url));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);

    return (
        <>
            {error ?
                (<OrderList revers={true} list={feed} />)
                :
                (<div><div className={styles.loader}></div></div>)
            }
        </>
    )
}
export default ProfileOrders;