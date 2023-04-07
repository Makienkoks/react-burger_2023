import React, {useMemo} from 'react';
import { useParams } from "react-router-dom";
import styles from "../ingredient-page/ingredient-page.module.css";
import {useSelector} from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
const IngredientPage = () => {
    const { id } = useParams()
    const ingredients = useSelector( (store) => store.ingredients.ingredients)
    const ingredient = useMemo(() => {
        return ingredients && 'data' in ingredients ? ingredients.data.filter(item => item._id === id)[0] : null
    }, [ingredients, id])
    return (
        <div className={styles.block}>
            {'isLoading' && ingredients.isLoading && 'Загрузка...'}
            {'error' && ingredients.error && 'Произошла ошибка'}
            {
                !('isLoading' && ingredients.isLoading) &&
                !('error' && ingredients.error) && ingredient &&
                <>
                    <h1>Детали ингредиента</h1>
                    <IngredientDetails showDetails item={ingredient}/>
                </>
            }
        </div>
    );
}
export default IngredientPage;