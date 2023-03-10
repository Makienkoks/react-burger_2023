import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = React.useState('bun')
    const [title, setTitle] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [ingredientData, setData] = React.useState(null)
    const list = ingredients.filter(item => item.type === current)
    const getTitle = current => () => {
        switch (current) {
            case 'main':
                return 'Начинки'
            case 'sauce':
                return 'Соусы'
            default:
                return 'Булки'
        }
    };
     useEffect(() => {
         setTitle(getTitle(current))
     }, [current]);
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
            <Modal title={'Детали ингредиента'}
                   onClose={toggleModal}>
                <IngredientDetails item={ingredientData}
                                   showDetails
                />
            </Modal>
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
                    {title}
                </p>
                <div className={styles.blocks}>
                    {list.map(item =>
                        <IngredientDetails key={item._id}
                                           item={item}
                                           onCardClick={listItemClick}
                        />
                    )}
                </div>
            </div>
            {visible && modal}
        </div>
    );
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.array
};
export default BurgerIngredients