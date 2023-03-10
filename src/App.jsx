import React, {useEffect} from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
const App = () => {
    const [isLoading, setLoading] = React.useState(true)
    const [hasError, setError] = React.useState(false)
    const [data, setData] = React.useState(null)
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(() => {
                setData([])
                setLoading(false)
                setError(true)
            });
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