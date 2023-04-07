import React, { useMemo, useRef} from 'react'
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useLocation, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
const BurgerIngredients = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const getIngredients = (store) => store.ingredients.ingredients.data

    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const containerRef = useRef();

    const [current, setCurrent] = React.useState('bun')

    const itemsRequest = useSelector(store => store.ingredients.ingredients.isLoading);
    const itemsFailed = useSelector(store => store.ingredients.ingredients.error);
    const ingredients = useSelector(getIngredients);

    const buns = useMemo(() => ingredients ? ingredients.filter(item => item.type === 'bun') : [], [ingredients])
    const sauces = useMemo(() => ingredients ? ingredients.filter(item => item.type === 'sauce') : [], [ingredients])
    const mains = useMemo(() => ingredients ? ingredients.filter(item => item.type === 'main') : [], [ingredients])

    const tabClick = tab => () => setCurrent(tab)

    const listItemClick = React.useCallback(
        (ingredient) => {
            navigate(`/ingredients/${ingredient._id}`, {state: {backgroundLocation: location}})
        },[location, navigate]
    )
    const getBoundingClientRectTop = (value) => value.current ? Math.floor(value.current.getBoundingClientRect().top) : 0

    const handleScroll = () => {
        const containerPosition = getBoundingClientRectTop(containerRef)
        const saucePosition = getBoundingClientRectTop(sauceRef)
        const mainPosition = getBoundingClientRectTop(mainRef)

        const sauceDiff = containerPosition - saucePosition;
        const mainDiff = containerPosition - mainPosition;

        if (sauceDiff < 0 && mainDiff < 0) {
            setCurrent('bun')
        } else if (sauceDiff >= 0 && mainDiff < 0) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    };
    return (
        <>
            {itemsRequest && 'Загрузка...'}
            {itemsFailed && 'Произошла ошибка'}
            {!itemsRequest && !itemsFailed && ingredients &&
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
                    <div className={styles.tab_content} ref={containerRef} onScroll={handleScroll}>
                        <p className={`text text_type_main-medium mb-6`} ref={bunRef}>
                            Булки
                        </p>
                        <div className={styles.blocks}>
                            {buns.map(item =>
                                <IngredientDetails key={item._id}
                                                   item={item}
                                                   onCardClick={listItemClick}
                                />
                            )}
                        </div>
                        <p className={`text text_type_main-medium mb-6`} ref={sauceRef}>
                            Соусы
                        </p>
                        <div className={styles.blocks}>
                            {sauces.map(item =>
                                <IngredientDetails key={item._id}
                                                   item={item}
                                                   onCardClick={listItemClick}
                                />
                            )}
                        </div>
                        <p className={`text text_type_main-medium mb-6`} ref={mainRef}>
                            Начинки
                        </p>
                        <div className={styles.blocks}>
                            {mains.map(item =>
                                <IngredientDetails key={item._id}
                                                   type={'main'}
                                                   item={item}
                                                   onCardClick={listItemClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default BurgerIngredients