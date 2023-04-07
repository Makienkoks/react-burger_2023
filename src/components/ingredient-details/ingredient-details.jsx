import React, {useEffect} from 'react'
import styles from './ingredient-details.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/prop-types";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
const IngredientDetails = React.memo((props) => {
    const { item, onCardClick, showDetails } = props;
    const list = useSelector(store => store.orderList.ingredients);
    const bun = useSelector(store => store.orderList.bun);

    const [count, setCount] = React.useState(null)

    const handleClick = () => onCardClick(item);

    useEffect(() => {
        let cnt = 0
        if (item.type === 'bun') {
            cnt = bun && bun._id === item._id && 2
        } else {
            list.forEach(items => { items._id === item._id && cnt++ })
        }
        cnt !== 0 ? setCount(cnt) : setCount(null)
    }, [list, bun, item]);

    const [, dragRef] = useDrag({
        type: 'ingredients',
        item: item,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div key={item._id}
             ref={ dragRef }
             className={`${styles.block} ${showDetails ? '' : styles.item}`}
             onClick={onCardClick && handleClick}>
            {showDetails ?
            <img src={item.image_large} className={`mb-7`} alt={item.name}></img>
            :
            <>
                {count &&
                    <p className={`${styles.count} text text_type_digits-default`}>{ count }</p>
                }
                <img src={item.image} className="mb-1" alt={item.name}></img>
                <div className={styles.price}>

                    <p className="text text_type_digits-default p-1">
                        {item.price}
                    </p>
                    <span className={'p-1'}>
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
            </>
            }
            <p className={`text ${styles.text_center} ${showDetails ? 'mb-8 text_type_main-medium' : 'text_type_main-profile'}`}>
                {item.name}
            </p>
            {showDetails &&
            <div className={styles.bottom}>
                <div className={styles.cell}>
                    <span className={styles.title}>
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default">
                        {item.calories}
                    </span>
                </div>
                <div className={styles.cell}>
                    <span className={styles.title}>
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default">
                        {item.proteins}
                    </span>
                </div>
                <div className={styles.cell}>
                    <span className={styles.title}>
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default">
                        {item.fat}
                    </span>
                </div>
                <div className={styles.cell}>
                    <span className={styles.title}>
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default">
                        {item.carbohydrates}
                    </span>
                </div>
            </div>}
        </div>
    )
});
IngredientDetails.propTypes = {
    item: ingredientsPropTypes.isRequired,
    onCardClick: PropTypes.func,
    showDetails: PropTypes.bool
};
export default IngredientDetails