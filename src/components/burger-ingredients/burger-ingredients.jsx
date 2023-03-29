import React, {useEffect, useMemo, useRef} from 'react'
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import { loadIngredients } from "../../services/ingredients/actions";
import { DELETE_SELECTED, SET_SELECTED } from "../../services/selectedIngredient/actions";
const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const getIngredients = (store) => store.ingredients.ingredients.data

    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const containerRef = useRef();

    const [current, setCurrent] = React.useState('bun')

    const itemsRequest = useSelector(store => store.ingredients.ingredients.isLoading);
    const itemsFailed = useSelector(store => store.ingredients.ingredients.error);
    const ingredients = useSelector(getIngredients);

    const ingredient = useSelector(store => store.selectedIngredient.selected);

    const buns = useMemo(() => {
        return ingredients ? ingredients.filter(item => item.type === 'bun') : []
        }, [ingredients])
    const sauces = useMemo(() => {
        return ingredients ? ingredients.filter(item => item.type === 'sauce') : []
    }, [ingredients])
    const mains = useMemo(() => {
        return ingredients ? ingredients.filter(item => item.type === 'main') : []
    }, [ingredients])

    useEffect(
        () => {
            dispatch(loadIngredients());
        },
        [dispatch]
    );

    const tabClick = tab => () => {
        setCurrent(tab)
    };
    const listItemClick = React.useCallback(
        (ingredient) => {
            dispatch({
                type: SET_SELECTED,
                payload: {...ingredient}
            });
        },[dispatch]
    );
    const toggleModal = () => {
        dispatch({type: DELETE_SELECTED});
    }

    const getBoundingClientRectTop = (value) => {
        return value.current ? Math.floor(value.current.getBoundingClientRect().top) : 0;
    }

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

    const modal = (
        <>
            {ingredient &&
            <Modal title={'Детали ингредиента'}
                   onClose={toggleModal}>
                <IngredientDetails item={ingredient}
                                   showDetails
                />
            </Modal>
            }
        </>
    )
    return (
        <>
            {itemsRequest && 'Загрузка...'}
            {itemsFailed && 'Произошла ошибка'}
            {!itemsRequest && !itemsFailed && ingredients.length &&
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
                    {modal}
                </div>
            }
        </>
    );
}
export default BurgerIngredients