import React, {useCallback, useMemo, useRef, useState} from 'react'
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useLocation, useNavigate} from "react-router-dom";
import { useSelector } from '../../services/hooks';
import {getIngredients, ingredientsIsError, ingredientsIsLoading} from "../../services/ingredients/selectors";
const BurgerIngredients = ():JSX.Element => {
    const navigate = useNavigate()
    const location = useLocation()

    const bunRef = useRef<HTMLParagraphElement>(null)
    const sauceRef = useRef<HTMLParagraphElement>(null)
    const mainRef = useRef<HTMLParagraphElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [current, setCurrent] = useState<string>('bun')

    const ingredients = useSelector(getIngredients);
    const isLoading = useSelector(ingredientsIsLoading);
    const error = useSelector(ingredientsIsError);

    const buns = useMemo(() => ingredients ? ingredients.filter((item: { type: string }) => item.type === 'bun') : [], [ingredients])
    const sauces = useMemo(() => ingredients ? ingredients.filter((item: { type: string }) => item.type === 'sauce') : [], [ingredients])
    const mains = useMemo(() => ingredients ? ingredients.filter((item: { type: string }) => item.type === 'main') : [], [ingredients])

    const tabClick = (tab: React.SetStateAction<string>) => () => setCurrent(tab)

    const listItemClick = useCallback(
        (ingredient: { _id: string }) => {
            navigate(`/ingredients/${ingredient._id}`, {state: {backgroundLocation: location}})
        },[location, navigate]
    )
    const getBoundingClientRectTop = (value: React.RefObject<HTMLParagraphElement>) => value.current ? Math.floor(value.current.getBoundingClientRect().top) : 0

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
            {isLoading && 'Загрузка...'}
            {error && 'Произошла ошибка'}
            {!isLoading && !error && ingredients &&
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