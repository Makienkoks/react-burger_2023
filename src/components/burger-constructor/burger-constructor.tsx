import React, {useEffect} from 'react'
import { useDrop } from "react-dnd";
import {v4 as uuidv4} from "uuid";
import styles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import DraggableItem from "../draggable-item/draggable-item";
import { sendOrder } from "../../services/order/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/hooks';
import {TIngredient} from "../../utils/types";
import {addIngredient, changeIngredient, deleteIngredient} from "../../services/orderList/reducer";
import {orderIngredients, orderBun} from "../../services/orderList/selectors";
const BurgerConstructor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [totalSum, calculateAmount] = React.useState<number>(0)
    const [visible, setVisible] = React.useState<boolean>(false)

    const list = useSelector(orderIngredients)
    const bun = useSelector(orderBun)
    const user = useSelector( (store) => store.user.user)

    useEffect(() => {
        let sum = 0
        if (list && list.length) {
            list.map((item: { price: number }) => sum = sum + item.price)
        }
        if (bun) {
            for (const key in bun) {
                if (key === 'price') {
                    sum = sum + Number(bun[key]) * 2
                }
            }
        }
        calculateAmount(Number(sum))
    }, [bun, list])

    const onClick = () => {
        if (user) {
            toggleModal(true)
            const orderId: Array<string> = []
            if (bun || list) {
                const order = bun ? [bun, ...list, bun] : [...list]
                order.forEach(item => {
                    orderId.push(item._id)
                })
                dispatch(sendOrder({'ingredients': orderId}));
            }
        } else {
            navigate('/login')
        }
    }
    const toggleModal = (isVisible: boolean | ((prevState: boolean) => boolean)) => {
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
        drop(data: TIngredient) {
            const dataWithKey: TIngredient = {...data, key: uuidv4()}
            const arr = {
                bun: data.type === 'bun' ? dataWithKey : bun,
                ingredients: data.type !== 'bun' ? [...list, dataWithKey] : [...list]
            }
            dispatch(addIngredient({...arr}))
        },
        collect: monitor => ({
            outline: monitor.isOver() ? '2px dashed #4C4CFF' : '',
        })
    });

    const removeIngredient = React.useCallback(
        (id: string) => {
            const arr = list.filter((ingredient) => ingredient.key !== id)
            dispatch(deleteIngredient({ 'ingredients': arr }))
        },[dispatch, list]
    )

    const moveItem = React.useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const result = [...list]
            const item = list[dragIndex]
            result.splice(dragIndex, 1)
            result.splice(hoverIndex, 0, item)
            dispatch(changeIngredient({ 'ingredients': result }))
        },[list, dispatch]
    )
    return (
        <div className={`${styles.constructor}`}>
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
                                {list.map((item: TIngredient, index: number) =>
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
                        disabled={!bun}
                        htmlType="button"
                        type="primary"
                        onClick={onClick}>
                    Оформить заказ
                </Button>
            </div>
            {modal}
        </div>
    )
}
export default BurgerConstructor