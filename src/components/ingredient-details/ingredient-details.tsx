import React, {useEffect} from 'react'
import styles from './ingredient-details.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import {useDrag} from "react-dnd";
import {TIngredients} from "../../utils/types";
type TIngredientDetails = {
    item: TIngredients,
    onCardClick?: (arg: TIngredients) => void;
    showDetails?: boolean,
}
const IngredientDetails = ({ item, onCardClick, showDetails }: TIngredientDetails):JSX.Element => {
    const list = useSelector((store) => store.orderList.ingredients);
    const bun = useSelector((store) => store.orderList.bun);

    const [count, setCount] = React.useState<number | null>()

    let handleClick
    if (onCardClick) {
        handleClick = () => onCardClick(item);
    }

    useEffect(() => {
        let cnt:number = 0
        if (item.type === 'bun') {
            if (bun && bun._id === item._id) {
                cnt = 2
            }
        } else {
            list.forEach((items: { _id: string; }) => {
                items._id === item._id && cnt++
            })
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
             onClick={handleClick}>
            {showDetails ?
                <img src={item.image_large} className={`mb-7`} alt={item.name}></img>
                :
                <>
                    {count &&
                        <Counter count={count} size="default" extraClass={`${styles.count} m-1`} />
                        // <p className={`${styles.count} text text_type_digits-default`}>{count}</p>
                    }
                    <img src={item.image} className="mb-1" alt={item.name}></img>
                    <div className={styles.price}>

                        <p className="text text_type_digits-default p-1">
                            {item.price}
                        </p>
                        <span className={'p-1'}>
                        <CurrencyIcon type="primary"/>
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
}
export default IngredientDetails