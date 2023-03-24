import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useDrop } from "react-dnd";
import {v4 as uuidv4} from "uuid";
import styles from "../burger-constructor/burger-constructor.module.css";
import {ADD_INGREDIENT, CHANGE_ORDER_INGREDIENT, REMOVE_INGREDIENT} from "../../services/orderList/actions";
import { ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import DraggableItem from "../draggable-item/draggable-item";
import { sendOrder } from "../../services/order/actions";

const BurgerConstructor = () => {
    const dispatch = useDispatch()

    const [totalSum, calculateAmount] = React.useState(0)
    const [visible, setVisible] = React.useState(false)

    const list = useSelector(store => store.orderList.ingredients);
    const bun = useSelector(store => store.orderList.bun);

    useEffect(() => {
        let sum = 0
        if (list && list.length) {
            list.map(item => sum = sum + item.price)
        }
        if (bun) {
            sum = bun && sum + bun.price * 2
        }
        calculateAmount(Number(sum))
    }, [bun, list]);

    const onClick = () => {
        toggleModal(true)
        const orderId = []
        if (bun || list) {
            const order = bun ? [bun, ...list, bun] : [...list]
            order.forEach(item => {
                orderId.push(item._id)
            })
            const ingredients = orderId
            dispatch(sendOrder({'ingredients': ingredients}));
        }
    }
    const toggleModal = (isVisible) => {
        setVisible(isVisible)
    }

    const modal = (
        <>
            {visible &&
            <Modal onClose={toggleModal}>
                <OrderDetails/>
            </Modal>
            }
        </>
    )

    const [{ outline }, dropRef] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            dispatch({
                type: ADD_INGREDIENT,
                payload: {...ingredient, key: uuidv4()}
            });
        },
        collect: monitor => ({
            outline: monitor.isOver() ? '2px dashed #4C4CFF' : '',
        }),
    });

    const removeIngredient = React.useCallback(
        (id) => {
            dispatch({
                type: REMOVE_INGREDIENT,
                payload: id
            });
        },[dispatch],
    )

    const moveItem = React.useCallback(
        (dragIndex, hoverIndex) => {
            const result = [...list]
            const item = list[dragIndex]
            result.splice(dragIndex, 1)
            result.splice(hoverIndex, 0, item)
            dispatch({
                type: CHANGE_ORDER_INGREDIENT,
                payload: result
            })
        },[list, dispatch],
    )

    return (
        <>
            <div className={styles.constructor}>
                <div className={styles.drop_block} ref={dropRef} style={{ outline }}>
                    {bun ?
                        <div className={styles.wrapper}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                        :
                        <div className={`${styles.default_element} pr-4`}>
                            <div className={`${styles.default_constructor} 
                            constructor-element 
                            constructor-element_pos_top mb-4 ml-12`}>
                                <span>Выберите булку</span>
                            </div>
                        </div>
                    }
                        <section>
                            {list && list.length > 0 ?
                                <div className={styles.ingredients}>
                                    {list.map((item, index) =>
                                        <DraggableItem ingredient={item}
                                                       key={item.key}
                                                       index={ index }
                                                       moveItem={moveItem}
                                                       removeIngredient={removeIngredient}

                                        />
                                    )}
                                </div>
                                :
                                <div className={`${styles.default_element} pr-4`}>
                                    <div className={`${styles.default_constructor}
                                    constructor-element mb-4`}>
                                        Выберите начинку
                                    </div>
                                </div>
                            }
                        </section>
                    {bun ?
                        <div className={styles.wrapper}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                        :
                        <div className={`${styles.default_element} pr-4`}>
                            <div className={`${styles.default_constructor}
                            constructor-element
                            constructor-element_pos_bottom mb-4`}>
                                <span>Выберите булку</span>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.total}>
                    <div className={styles.price}>
                        <p className="text text_type_digits-medium">
                            {totalSum}
                        </p>
                        <span className="ml-2">
                            <CurrencyIcon type="primary" />
                        </span>
                    </div>
                    <Button size="large"
                            disabled={!(bun || (list && list.length))}
                            htmlType="button"
                            type="primary"
                            onClick={onClick}>
                        Оформить заказ
                    </Button>
                </div>
                {modal}
            </div>
        </>
    );
}
export default BurgerConstructor