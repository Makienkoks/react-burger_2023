import React from 'react'
import PropTypes from 'prop-types';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientsPropTypes } from "../../utils/prop-types";
const BurgerIngredients = (props) => {
    const { ingredients } = props
    const [current, setCurrent] = React.useState('bun')
    const [visible, setVisible] = React.useState(false)
    const [ingredientData, setData] = React.useState(null)
    const tabClick = tab => () => {
        setCurrent(tab)
    };
    const listItemClick = React.useCallback(
        (ingredient) => {
            toggleModal(true)
            setData({...ingredient})
        },
        []
    );
    const toggleModal = (isVisible) => {
        setVisible(isVisible)
        setData(null)
    }
    const modal = (
        <>
            {visible &&
            <Modal title={'Детали ингредиента'}
                   onClose={toggleModal}>
                <IngredientDetails item={ingredientData}
                                   showDetails
                />
            </Modal>
            }
        </>
    )
    return (
        <div className={styles.ingredients}>
            <h1 className={styles.title}>
                Соберите бургер
            </h1>
            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={tabClick('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={tabClick('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={tabClick('main')}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.tab_content}>
                <p className={`text text_type_main-medium mb-6`}>
                    Булки
                </p>
                <div className={styles.blocks}>
                    {ingredients.map(item =>
                        item.type === 'bun' &&
                        <IngredientDetails key={item._id}
                                           item={item}
                                           onCardClick={listItemClick}
                        />
                    )}
                </div>
                <p className={`text text_type_main-medium mb-6`}>
                    Соусы
                </p>
                <div className={styles.blocks}>
                    {ingredients.map(item =>
                        item.type === 'sauce' &&
                        <IngredientDetails key={item._id}
                                           item={item}
                                           onCardClick={listItemClick}
                        />
                    )}
                </div>
                <p className={`text text_type_main-medium mb-6`}>
                    Начинки
                </p>
                <div className={styles.blocks}>
                    {ingredients.map(item =>
                        item.type === 'main' &&
                        <IngredientDetails key={item._id}
                                           item={item}
                                           onCardClick={listItemClick}
                        />
                    )}
                </div>
            </div>
            {modal}
        </div>
    );
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};
export default BurgerIngredients