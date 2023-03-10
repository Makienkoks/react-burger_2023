import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import styles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
const BurgerConstructor = (props) => {
    const { ingredients } = props
    const [totalSum, calculateAmount] = React.useState(0)
    const [visible, setVisible] = React.useState(false)
    const bun = ingredients.filter(item => item.type === 'bun')[0]
    const list = ingredients.filter((item, index) => item.type !== 'bun' && index < 8)
    useEffect(() => {
        let sum = 0
        list.map(item => sum = sum + item.price)
        sum = sum + bun.price * 2
        calculateAmount(sum)
    }, [bun.price, list]);
    const onClick = () => {
        toggleModal(true)
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
    return (
        <div className={styles.constructor}>
            <div className={styles.wrapper}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={styles.ingredients}>
                {list.map(item =>
                    <div className={styles.item}
                         key={item._id}>
                        <span className={styles.icon}>
                            <DragIcon type="primary" />
                        </span>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                    </div>
                )}
            </div>
            <div className={styles.wrapper}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
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
                <Button size="large" htmlType="button" type="primary" onClick={onClick}>
                    Оформить заказ
                </Button>
            </div>
            {modal}
        </div>

    );
}
BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
        })
    ).isRequired
};
export default BurgerConstructor