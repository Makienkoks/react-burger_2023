import React, {useMemo} from 'react';
import { useParams } from "react-router-dom";
import styles from "../ingredient-page/ingredient-page.module.css";
import { useSelector } from '../../services/hooks';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {getIngredients, ingredientsIsError, ingredientsIsLoading} from "../../services/ingredients/selectors";
const IngredientPage = () => {
    const { id } = useParams()

    const ingredients = useSelector(getIngredients);
    const isLoading = useSelector(ingredientsIsLoading);
    const error = useSelector(ingredientsIsError);

    const ingredient = useMemo(() => {
        return ingredients ? ingredients.filter(item => item._id === id)[0] : null
    }, [ingredients, id])
    return (
        <div className={styles.block}>
            {'isLoading' && isLoading && 'Загрузка...'}
            {'error' && error && 'Произошла ошибка'}
            {
                !('isLoading' && isLoading) &&
                !('error' && error) && ingredient &&
                <>
                    <h1>Детали ингредиента</h1>
                    <IngredientDetails showDetails item={ingredient}/>
                </>
            }
        </div>
    );
}
export default IngredientPage;