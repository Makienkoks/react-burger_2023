import React, {useEffect, useMemo} from 'react'
import Main from "../main/main"
import Login from "../../pages/login"
import Profile from "../../pages/profile"
import ForgotPassword from "../../pages/forgot-password"
import Register from "../../pages/register"
import ResetPassword from "../../pages/reset-password"
import NotFound404 from "../../pages/not-found"
import {Routes, Route, useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import IngredientPage from "../../pages/ingredient-page";
import Protected from "../protected-route/protected-route";
import Modal from "../modal/modal";
import DefaultLayout from "../../layouts/default";
import ProfileLayout from "../../layouts/profile";
import {useDispatch, useSelector} from "react-redux";
import {loadIngredients} from "../../services/ingredients/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUser} from "../../services/user/actions";
import Order from "../../pages/order";
const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    let state = 'state' in location ? location.state : null
    let backgroundLocation = state && 'backgroundLocation' in state ? state.backgroundLocation : null
    let idIngredient = useResolvedPath().pathname.replace('/ingredients/','')

    const ingredients = useSelector( (store) => store.ingredients.ingredients);
    const ingredient = useMemo(() => {
        const arr = ingredients && 'data' in ingredients ? ingredients.data : null
        return arr ? arr.filter(item => item._id === idIngredient)[0] : null
    }, [ingredients, idIngredient])

    useEffect(() => {
        dispatch(loadIngredients())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <div className='App'>
            <Routes location={backgroundLocation || location}>
                <Route path='/' element={<DefaultLayout />}>
                    <Route index element={<Main />} />
                    <Route path='/ingredients/:id' element={<IngredientPage />} />
                    <Route path="/register" element={<Protected onlyAuth={false} children={<Register />} />} />
                    <Route path="/login" element={<Protected onlyAuth={false} children={<Login />} />} />
                    <Route path='/forgot-password' element={<Protected onlyAuth={false} children={<ForgotPassword />} />} />
                    <Route path="/reset-password" element={<Protected onlyAuth={false} children={<ResetPassword />} />} />
                    <Route path="*" element={<NotFound404/>}/>
                </Route>
                <Route path='/profile' element={<Protected children={<ProfileLayout />} />}>
                    <Route index element={<Protected children={<Profile />} />} />
                    <Route path="order" element={<Protected children={<Order />} />} />
                </Route>
            </Routes>
            {backgroundLocation && (
                <Routes>
                    <Route path='/ingredients/:id' element={
                        <Modal title='Детали ингредиента'
                               onClose={() => navigate(backgroundLocation, {state: {}})}>
                            {'isLoading' && ingredients.isLoading && 'Загрузка...'}
                            {'error' && ingredients.error && 'Произошла ошибка'}
                            {
                                !('isLoading' && ingredients.isLoading) &&
                                !('error' && ingredients.error) && ingredient &&
                            <IngredientDetails item={ingredient} showDetails />
                            }
                        </Modal>
                    } />
                </Routes>
            )}
        </div>
    )
}
export default App;