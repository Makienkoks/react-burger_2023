import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
const App = () => {
    const [isLoading, setLoading] = React.useState(true)
    const [hasError, setError] = React.useState(false)
    const [data, setData] = React.useState(null)
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    }
    useEffect(() => {
        fetch(url)
            .then(checkResponse)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(error => {
                setData(null)
                setLoading(false)
                setError(true)
                // console.error('Error: ', error)
            })
    }, []);
    return (
        <div className='App'>
            <AppHeader/>
            <main className={`pt-5 pb-5`}>
                <div className={`container`}>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading && !hasError && data.length &&
                        <BurgerIngredients ingredients={data} />
                    }
                    {!isLoading && !hasError && data.length &&
                        <BurgerConstructor ingredients={data} />
                    }
                </div>
            </main>
        </div>
    )
}
export default App;