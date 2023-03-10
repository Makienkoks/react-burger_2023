import React from 'react'
import styles from './ingredient-details.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const IngredientDetails = React.memo((props) => {
    const { item, onCardClick, showDetails } = props;
    const handleClick = () => onCardClick(item);
    return (
        <div key={item._id}
             className={`${styles.block} ${showDetails ? '' : styles.item}`}
             onClick={onCardClick && handleClick}>
            {showDetails ?
            <img src={item.image_large} className={`mb-7`} alt={item.name}></img>
            :
            <>
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
            <p className={`text ${styles.text_center} ${showDetails ? 'mb-8 text_type_main-medium' : 'text_type_main-default'}`}>
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
    item: PropTypes.shape({
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
        image_large: PropTypes.string
    }).isRequired,
    onCardClick: PropTypes.func,
    showDetails: PropTypes.bool
};
export default IngredientDetails